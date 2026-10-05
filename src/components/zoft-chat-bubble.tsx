"use client";

import { useState } from "react";

const ICON = 16;

const BUBBLE = (
  <svg
    width={ICON}
    height={ICON}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CHEVRON = (
  <svg
    width={ICON}
    height={ICON}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export function ZoftChatBubble({ src }: { src: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        #zoft-chat-btn{position:fixed;bottom:16px;right:16px;z-index:10000;box-sizing:border-box;display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:50%;background:linear-gradient(145deg,#0e5c68 0%,#065460 55%,#004652 100%);color:#fff;box-shadow:0 12px 40px rgba(0,0,0,.28),0 2px 8px rgba(0,0,0,.18);cursor:pointer;line-height:0;}
        #zoft-chat-btn [data-zoft-icon]{display:grid;place-items:center;width:16px;height:16px;line-height:0;}
        #zoft-chat-btn svg{display:block;margin:0;}
        #zoft-chat-frame{position:fixed;bottom:64px;right:20px;z-index:9999;width:min(400px,calc(100vw - 32px));height:min(720px,70vh);border:0;border-radius:18px;box-shadow:0 16px 48px rgba(0,0,0,.18);background:#fff;visibility:hidden;pointer-events:none;transform:translateY(24px);transition:transform 140ms linear,visibility 0s linear 140ms;}
        #zoft-chat-frame.zoft-open{visibility:visible;pointer-events:auto;transform:translateY(0);transition:transform 140ms linear,visibility 0s linear 0s;}
        @media (max-width:640px){
          #zoft-chat-frame{top:0;left:0;right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;box-shadow:none;transform:translateY(100%);}
          #zoft-chat-frame.zoft-open{transform:translateY(0);}
        }
        @media (prefers-reduced-motion:reduce){
          #zoft-chat-frame,#zoft-chat-frame.zoft-open{transition:none!important;transform:none;}
        }
      `}</style>
      <button
        id="zoft-chat-btn"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close chat with Sunchase" : "Open chat with Sunchase"}
        title={open ? "Close Sunchase chat" : "Chat with Sunchase"}
        onClick={() => setOpen((current) => !current)}
      >
        <span data-zoft-icon>{open ? CHEVRON : BUBBLE}</span>
      </button>
      <iframe
        id="zoft-chat-frame"
        className={open ? "zoft-open" : undefined}
        title="Sunchase chat"
        src={src}
        allow="clipboard-write"
      />
    </>
  );
}
