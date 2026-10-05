const API_URL = `${(process.env.ZOFT_API_URL ?? "http://localhost:3001").replace(/\/$/, "")}/api`;

type Envelope<T> = {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
};

function runIdOf(run: unknown): string | null {
  if (!run || typeof run !== "object") return null;
  const record = run as { id?: unknown; run?: { id?: unknown } };
  if (typeof record.id === "string") return record.id;
  if (typeof record.run?.id === "string") return record.run.id;
  return null;
}

async function zoft<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  const body = (await response.json().catch(() => null)) as Envelope<T> | null;
  if (!response.ok || !body?.success) {
    const message = body?.message || body?.error || "The assistant is unavailable right now.";
    throw new Error(message);
  }
  return body.data as T;
}

async function readAssistantReply(token: string, runId: string, conversationId: string) {
  const response = await fetch(
    `${API_URL}/v1/deployments/${token}/runs/${runId}/stream?start=1`,
    { cache: "no-store", signal: AbortSignal.timeout(50_000) },
  );
  if (!response.ok || !response.body) {
    const body = (await response.json().catch(() => null)) as Envelope<unknown> | null;
    throw new Error(body?.message || "The assistant could not reply.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let failed = false;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      let event = "message";
      const dataLines: string[] = [];
      for (const line of part.split("\n")) {
        if (line.startsWith("event:")) event = line.slice(6).trim();
        if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
      }
      if (dataLines.length === 0) continue;
      let data: { text?: string; message?: string; status?: string } = {};
      try {
        data = JSON.parse(dataLines.join("\n"));
      } catch {
        continue;
      }
      if (event === "llm.delta" && data.text) text += data.text;
      if (event === "error") {
        failed = true;
        text = data.message || text;
      }
      if (event === "done" && data.status === "FAILED") failed = true;
    }
  }

  const reply = text.trim();
  if (reply && !failed) return reply;

  const detail = await zoft<{
    messages?: Array<{ role?: string; text?: string }>;
  }>(`/v1/deployments/${token}/conversations/${conversationId}`);
  const last = [...(detail.messages ?? [])]
    .reverse()
    .find((message) => message.role === "assistant" && message.text?.trim());
  if (last?.text) return last.text;
  if (failed) throw new Error(reply || "The assistant could not finish that reply.");
  return "I could not finish that reply. Call 956-761-1660 and the desk can help.";
}

export async function sendSunchaseChat(message: string, conversationId?: string) {
  const token = process.env.ZOFT_CHAT_PUBLIC_TOKEN;
  if (!token) throw new Error("Chat is not connected yet.");

  let nextConversationId = conversationId;
  let runId: string | null = null;

  if (!nextConversationId) {
    const created = await zoft<{
      conversation: { id: string };
      firstRun: unknown;
    }>(`/v1/deployments/${token}/conversations`, {
      method: "POST",
      body: JSON.stringify({ initialMessage: message, title: "Sunchase website" }),
    });
    nextConversationId = created.conversation.id;
    runId = runIdOf(created.firstRun);
  } else {
    const sent = await zoft<{ run: unknown }>(
      `/v1/deployments/${token}/conversations/${nextConversationId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({ message }),
      },
    );
    runId = runIdOf(sent.run);
  }

  if (!runId) {
    throw new Error("The assistant did not start a reply.");
  }

  const reply = await readAssistantReply(token, runId, nextConversationId);
  return { conversationId: nextConversationId, reply };
}

export async function requestSunchaseCall(input: {
  name: string;
  phone: string;
  countryCode: string;
  notes?: string;
}) {
  const token = process.env.ZOFT_VOICE_PUBLIC_TOKEN;
  if (!token) throw new Error("Voice is not connected yet.");
  return zoft<{ callSid: string | null; status: string }>(
    `/v1/deployments/${token}/call-request`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}
