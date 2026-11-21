"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Scissors,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Film,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const heroSlides = [
  {
    tagline: "Sharp Style. Sharp You.",
    headline: "MORE THAN A CUT,\nIT'S AN EXPERIENCE.",
    subtext: "Modern cuts. Classic shaves. Premium experience for the modern man.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=85",
    alt: "Barber styling client in leather chair with striped cape",
  },
  {
    tagline: "Heritage & Craft.",
    headline: "THE TIMELESS ART\nOF TRADITIONAL SHAVING.",
    subtext: "Hot steamed eucalyptus towels, straight razor precision, soothing sandalwood finish.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=85",
    alt: "Hot towel traditional shave treatment",
  },
  {
    tagline: "Precision & Confidence.",
    headline: "DISTINCTIVE BEARD SCULPTING\n& MODERN FADES.",
    subtext: "Tailored to your facial structure by master craftsmen with over a decade of mastery.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1800&q=85",
    alt: "Master barber precision scissors detailing",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-advance slides in photo mode
  useEffect(() => {
    if (isVideoMode) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isVideoMode]);

  // Robust Play/Pause Handler
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log(e));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Robust Sound Mute/Unmute Handler
  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.8; // Pleasant room level
      videoRef.current.play().catch(() => {});
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] lg:min-h-[880px] bg-[#112119] flex items-center overflow-hidden">
      {/* BACKGROUND MEDIA: AUTHENTIC 1080P BARBERSHOP CINEMATIC FILM OR PHOTO CAROUSEL */}
      <div className="absolute inset-0 z-0">
        {isVideoMode ? (
          <div className="relative w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/urbanedge-hero.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] transition-opacity duration-1000"
            />
            {/* Fallback image poster behind video */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={slide.image}
                alt="Barbershop backdrop"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center filter brightness-[0.6]"
              />
            </div>
          </div>
        ) : (
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-all duration-1000 transform scale-105 filter brightness-[0.7] contrast-[1.05]"
          />
        )}

        {/* Deep Green Cinematic Vignette Mask matching reference design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#112119] via-[#112119]/80 to-[#112119]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112119] via-transparent to-[#112119]/60" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Top Pill: Video Mode Status Indicator & Sound Toggle */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#d4b26f]/40 rounded-full backdrop-blur-md text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#e63946] animate-pulse" />
              <span className="text-[#edd8aa] uppercase tracking-wider font-semibold text-[11px]">
                Studio Film In Session
              </span>
              <div className="w-[1px] h-3 bg-white/20 mx-1" />
              <button
                onClick={() => setIsVideoMode(!isVideoMode)}
                className="text-[#d4b26f] hover:text-white underline text-[10px] uppercase font-bold"
              >
                {isVideoMode ? "Photos" : "Live Video"}
              </button>
            </div>

            {/* Quick Prominent Sound Pill when Video is Active */}
            {isVideoMode && (
              <button
                onClick={toggleMute}
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all backdrop-blur-md shadow-lg ${
                  !isMuted
                    ? "bg-[#25D366]/20 border border-[#25D366] text-[#25D366] ring-2 ring-[#25D366]/20"
                    : "bg-black/60 border border-white/20 text-[#c8d4ce] hover:border-[#d4b26f] hover:text-[#d4b26f]"
                }`}
                title={isMuted ? "Click to enable sound" : "Click to mute"}
              >
                {!isMuted ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Audio: ON</span>
                    {/* Equalizer animation bars */}
                    <div className="flex items-end gap-0.5 h-3 ml-1">
                      <span className="w-0.5 bg-[#25D366] sound-bar-1" />
                      <span className="w-0.5 bg-[#25D366] sound-bar-2" />
                      <span className="w-0.5 bg-[#25D366] sound-bar-3" />
                      <span className="w-0.5 bg-[#25D366] sound-bar-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white/60" />
                    <span>Audio: MUTED (Click to Listen)</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Cursive Tagline */}
          <div className="mb-2 sm:mb-3">
            <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#d4b26f] drop-shadow-md">
              {slide.tagline}
            </span>
          </div>

          {/* Huge Condensed Headline */}
          <h1 className="font-condensed text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase leading-[0.92] mb-6 drop-shadow-xl whitespace-pre-line">
            {slide.headline}
          </h1>

          {/* Subtext Paragraph */}
          <p className="text-[#c7cfc9] text-base sm:text-lg max-w-lg mb-8 font-sans leading-relaxed">
            {slide.subtext}
          </p>

          {/* Action Buttons Group */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] font-condensed font-bold text-lg tracking-wider uppercase transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book Your Seat</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Watch Film Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center gap-3 px-6 py-4 bg-black/40 hover:bg-black/60 border border-[#d4b26f]/60 hover:border-[#d4b26f] text-[#edd8aa] hover:text-white font-condensed font-bold text-base tracking-wider uppercase backdrop-blur-md transition-all shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-6 h-6 rounded-full bg-[#d4b26f] text-[#112119] flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch Film (4K)</span>
            </button>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-4 border border-white/20 hover:border-[#d4b26f] text-white hover:text-[#d4b26f] font-condensed font-medium text-base tracking-wider uppercase transition-colors"
            >
              Services
            </a>
          </div>

          {/* Bottom Slider & Video Controls Rail */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/10">
            {/* Slide Index Progress (01 --------- 03) */}
            <div className="flex items-center gap-4 text-xs font-mono font-semibold tracking-widest text-[#a8b3ac]">
              <span className="text-[#d4b26f]">
                {(currentSlide + 1).toString().padStart(2, "0")}
              </span>
              <div className="w-24 sm:w-36 h-[2px] bg-white/20 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#d4b26f] transition-all duration-500"
                  style={{
                    width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
                  }}
                />
              </div>
              <span>{heroSlides.length.toString().padStart(2, "0")}</span>

              {/* Prev / Next circle buttons */}
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                  }
                  className="w-8 h-8 rounded-full border border-white/30 hover:border-[#d4b26f] flex items-center justify-center text-white hover:text-[#d4b26f] transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
                  }
                  className="w-8 h-8 rounded-full border border-white/30 hover:border-[#d4b26f] flex items-center justify-center text-white hover:text-[#d4b26f] transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Playback Controls (Play/Pause & Sound) */}
            {isVideoMode && (
              <div className="flex items-center gap-3 bg-black/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm text-xs text-white/90 font-mono">
                <button
                  onClick={togglePlayPause}
                  className="hover:text-[#d4b26f] flex items-center gap-1.5 transition-colors"
                  title={isPlaying ? "Pause background reel" : "Play background reel"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>

                <div className="w-[1px] h-3 bg-white/20" />

                <button
                  onClick={toggleMute}
                  className="hover:text-[#d4b26f] flex items-center gap-1.5 transition-colors"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-white/60" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#25D366]" />
                  )}
                  <span className={!isMuted ? "text-[#25D366] font-bold" : ""}>
                    {isMuted ? "Unmute" : "Sound On"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Circular Vintage Barber Stamp on Bottom-Right */}
      <div className="hidden lg:flex absolute bottom-12 right-28 z-20 items-center justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Rotating dashed circular border */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#d4b26f]/70 animate-[spin_25s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-[#d4b26f]/30" />

          <div className="flex flex-col items-center justify-center text-center p-4">
            <Scissors className="w-6 h-6 text-[#d4b26f] mb-1 -rotate-45" />
            <span className="font-condensed text-[11px] font-bold tracking-[0.2em] text-[#edd8aa] uppercase">
              Hand Crafted
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-[#d4b26f] uppercase font-semibold">
              Est. {siteConfig.establishedYear}
            </span>
          </div>
        </div>
      </div>

      {/* Right Vertical Social Rail */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6 py-6 border-l border-white/10 pl-4">
        <div className="flex flex-col gap-5 text-white/60">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4b26f] hover:scale-110 transition-all"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4b26f] hover:scale-110 transition-all"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4b26f] hover:scale-110 transition-all"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#25D366] hover:scale-110 transition-all"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
        <div className="w-[1px] h-12 bg-white/20" />
        <span className="writing-vertical-rl text-[10px] tracking-[0.3em] font-mono font-medium text-white/40 uppercase rotate-180">
          Est. {siteConfig.establishedYear}
        </span>
      </div>

      {/* CINEMATIC 4K VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-[#112119] border border-[#d4b26f]/40 rounded-sm shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#172a21] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#d4b26f] text-[#112119] flex items-center justify-center font-bold">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-condensed text-xl font-bold uppercase text-white tracking-wide">
                    The URBANEDGE Craft Film
                  </h3>
                  <p className="text-[11px] text-[#9bb1a4] font-mono">
                    4K Cinematic Session • Scissor Work, Hot Towel & Straight Razor
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowVideoModal(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d4b26f] hover:text-[#112119] flex items-center justify-center transition-colors text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame: Cinematic 16:9 */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/videos/urbanedge-hero.mp4"
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>

            {/* Modal Footer with Quick Booking Action */}
            <div className="p-4 bg-[#14261e] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#a4b8ad] font-sans">
                Experience the atmosphere in person. Reserve your seat with ₹50 token.
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/book"
                  onClick={() => setShowVideoModal(false)}
                  className="px-6 py-2.5 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] font-condensed font-bold text-xs tracking-wider uppercase transition-colors"
                >
                  Book This Experience
                </Link>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2.5 border border-white/20 text-white hover:border-white text-xs font-condensed uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
