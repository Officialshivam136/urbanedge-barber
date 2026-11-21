import { Barber, Service } from "./types";

export const services: Service[] = [
  {
    id: "signature-haircut",
    name: "Signature Haircut & Style",
    category: "hair",
    price: 450,
    durationMinutes: 45,
    description: "Detailed consultation, precision scissor & clipper cut, invigorating hair wash, neck shave and bespoke styling.",
    isPopular: true,
    studentDiscountEligible: true,
  },
  {
    id: "classic-hot-towel-shave",
    name: "Classic Hot Towel Shave",
    category: "shave",
    price: 350,
    durationMinutes: 30,
    description: "Traditional straight-razor shave with pre-shave essential oils, warm steamed eucalyptus towels, lather and soothing sandalwood balm.",
    isPopular: true,
    studentDiscountEligible: false,
  },
  {
    id: "beard-sculpt-detailing",
    name: "Beard Sculpt & Razor Detailing",
    category: "beard",
    price: 300,
    durationMinutes: 30,
    description: "Sculpting to flatter your jawline, cheek & neckline straight-razor detailing, hot towel compress and organic beard oil treatment.",
    studentDiscountEligible: true,
  },
  {
    id: "urbanedge-executive",
    name: "The UrbanEdge Executive Ritual",
    category: "package",
    price: 900,
    durationMinutes: 75,
    description: "Signature haircut, hot towel royal shave or beard sculpt, revitalizing scalp massage, black charcoal face mask, and premium finish.",
    isPopular: true,
    studentDiscountEligible: false,
  },
  {
    id: "student-cut",
    name: "Student Cut (Mon – Thu 20% Off)",
    category: "hair",
    price: 360,
    durationMinutes: 40,
    description: "Full signature haircut crafted for students at exclusive rate. Requires showing your valid student ID card.",
    isPopular: false,
    studentDiscountEligible: true,
  },
  {
    id: "charcoal-detox-facial",
    name: "Charcoal Detox Facial & Steamer",
    category: "treatment",
    price: 550,
    durationMinutes: 40,
    description: "Facial steam therapy, deep pore clay detox, exfoliating scrub, and nourishing hydration to remove city fatigue.",
    studentDiscountEligible: false,
  },
  {
    id: "gray-blending-color",
    name: "Subtle Gray Blending & Hair Color",
    category: "treatment",
    price: 650,
    durationMinutes: 45,
    description: "Discreet, natural tone restoration for hair or beard to soften grays without an artificial or blocky look.",
    studentDiscountEligible: false,
  },
  {
    id: "scalp-massage-oil",
    name: "Herbal Scalp Therapy & Acupressure",
    category: "treatment",
    price: 400,
    durationMinutes: 30,
    description: "Warm Ayurvedic botanical infused oils, neck and shoulder tension release, stimulating blood circulation.",
    studentDiscountEligible: false,
  },
];

export const barbers: Barber[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    title: "Master Barber & Lead Craftsman",
    experience: "12+ Years",
    specialty: "Classic Fades, Low Tapers & Straight Razor",
    bio: "Trained in London and Milan, Marcus blends timeless British wet shaving heritage with sharp modern fades.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    badge: "Master Barber",
    rating: 4.95,
    reviewsCount: 382,
  },
  {
    id: "liam-thorne",
    name: "Liam Thorne",
    title: "Senior Stylist & Texture Specialist",
    experience: "8 Years",
    specialty: "Textured Crops, Modern Mullets & Scissor Flow",
    bio: "Renowned for effortless textured styling, scissor over comb expertise, and runway-inspired edge.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    badge: "Senior Stylist",
    rating: 4.9,
    reviewsCount: 295,
  },
  {
    id: "julian-cruz",
    name: "Julian Cruz",
    title: "Beard Architect & Grooming Artisan",
    experience: "7 Years",
    specialty: "Beard Sculpting, Line-up Detailing & Hot Towel",
    bio: "Julian is a master of symmetry and facial architecture. Your beard will never look sharper or healthier.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    badge: "Beard Specialist",
    rating: 4.98,
    reviewsCount: 410,
  },
];

export const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    title: "Vintage Leather Barber Chairs",
    category: "Ambiance",
  },
  {
    url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
    title: "Precision Scissor Detailing",
    category: "Craft",
  },
  {
    url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
    title: "Traditional Hot Towel Ritual",
    category: "Shave",
  },
  {
    url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
    title: "Clean Mid Skin Fade",
    category: "Haircut",
  },
  {
    url: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=800&q=80",
    title: "Artisanal Pomades & Beard Oils",
    category: "Products",
  },
  {
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    title: "Master at Work",
    category: "Team",
  },
];

export const testimonials = [
  {
    name: "Arjun Nambiar",
    role: "Product Director",
    review: "Best grooming lounge in Bangalore without question. The hot towel shave is hypnotic and Marcus cuts hair with surgical accuracy.",
    rating: 5,
  },
  {
    name: "Vikram Malhotra",
    role: "Architect",
    review: "The ambiance transports you to a classic Mayfair gentleman's club. Booking online with ₹50 token was seamless, zero waiting time.",
    rating: 5,
  },
  {
    name: "Devansh Rao",
    role: "Tech Entrepreneur",
    review: "Julian took my unruly beard and sculpted it perfectly to suit my jaw. Found my permanent barbershop.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "Why is there a ₹50 booking amount?",
    answer: "The ₹50 reservation token guarantees your dedicated chair and barber at the exact booked time, eliminating waiting in line and protecting our barbers' schedules. The full ₹50 is deducted from your final bill at the shop.",
  },
  {
    question: "Can I also book or confirm via WhatsApp?",
    answer: "Absolutely! After selecting your slot, you can choose to confirm via WhatsApp directly. Our concierge will receive your prefilled appointment summary instantly.",
  },
  {
    question: "How does the Student Discount work?",
    answer: "Students enjoy 20% off all haircuts from Monday to Thursday. Simply choose the Student Cut service and present your valid college/school ID card upon arrival.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer: "Yes, you can reschedule up to 2 hours before your appointment by clicking the link on your booking page or contacting us on WhatsApp.",
  },
];
