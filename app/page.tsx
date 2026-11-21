import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BarbersSection from "@/components/BarbersSection";
import ClassicShaveSection from "@/components/ClassicShaveSection";
import StudentDiscountBanner from "@/components/StudentDiscountBanner";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactAndHours from "@/components/ContactAndHours";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#112119] text-[#f3f4f1] selection:bg-[#d4b26f] selection:text-[#0e1a14]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Barbers Section */}
      <BarbersSection />

      {/* 4. Classic Shave Feature Section */}
      <ClassicShaveSection />

      {/* 5. Student Cut Discount Section */}
      <StudentDiscountBanner />

      {/* 6. About Us ("Crafted for Confidence") Section */}
      <AboutSection />

      {/* 7. Services & Pricing Section */}
      <ServicesSection />

      {/* 8. Gallery Grid */}
      <GallerySection />

      {/* 9. Client Testimonials */}
      <TestimonialsSection />

      {/* 10. Contact, Hours & Map */}
      <ContactAndHours />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
