import { Amenities } from "@/components/amenities";
import { ChatWidget } from "@/components/chat-widget";
import { Condos } from "@/components/condos";
import { Events } from "@/components/events";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Inquiry } from "@/components/inquiry";
import { Island } from "@/components/island";
import { Oasis } from "@/components/oasis";
import { Reviews } from "@/components/reviews";
import { VoiceAgent } from "@/components/voice-agent";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Oasis />
        <Condos />
        <Gallery />
        <Island />
        <Amenities />
        <Events />
        <Reviews />
        <VoiceAgent />
        <Inquiry />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
