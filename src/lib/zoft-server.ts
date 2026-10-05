const API_URL = `${(process.env.ZOFT_API_URL ?? "http://localhost:3001").replace(/\/$/, "")}/api`;

type Envelope<T> = {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
};

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
