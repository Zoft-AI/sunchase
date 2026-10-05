import { ZoftChatBubble } from "@/components/zoft-chat-bubble";

const DEFAULT_APP_URL = "https://app.flow.zoft.ai";

export function ChatWidget() {
  const token = process.env.ZOFT_CHAT_PUBLIC_TOKEN?.trim();
  if (!token) return null;

  const appUrl = (process.env.ZOFT_APP_URL ?? DEFAULT_APP_URL).replace(/\/$/, "");
  const src = `${appUrl}/chat/${encodeURIComponent(token)}?embed=1`;

  return <ZoftChatBubble src={src} />;
}
