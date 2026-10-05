import { NextResponse } from "next/server";
import { sendSunchaseChat } from "@/lib/zoft-server";

export const maxDuration = 60;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    message?: string;
    conversationId?: string;
  } | null;
  const message = body?.message?.trim() ?? "";
  if (!message || message.length > 4000) {
    return NextResponse.json({ error: "Enter a message." }, { status: 400 });
  }

  try {
    const result = await sendSunchaseChat(message, body?.conversationId);
    return NextResponse.json(result);
  } catch (error) {
    const text =
      error instanceof Error ? error.message : "The assistant is unavailable right now.";
    return NextResponse.json({ error: text }, { status: 502 });
  }
}
