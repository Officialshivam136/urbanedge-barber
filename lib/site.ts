export const siteConfig = {
  name: "URBANEDGE",
  legalName: "UrbanEdge Grooming & Barber Co.",
  tagline: "More than a cut, it's an experience.",
  subTagline: "Sharp Style. Sharp You.",
  description: "Modern cuts. Classic shaves. Premium experience for the modern gentleman in an upscale ambiance.",
  establishedYear: 2015,
  bookingAmountInr: 50, // ₹50 booking token
  gstin: process.env.NEXT_PUBLIC_GSTIN || "27AAAAA0000A1Z5",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919568423360",
  phone: "+91 95684 23360",
  email: "concierge@urbanedgebarber.com",
  address: {
    street: "842, 100 Feet Road, HAL 2nd Stage, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    country: "India",
    full: "842, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.986348624898!2d77.6408226759897!3d12.972740914849202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a7b7444747%3A0x6a2c2bfdb293d6d6!2s100%20Feet%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  hours: [
    { days: "Monday – Thursday", time: "09:00 AM – 09:00 PM", note: "Student 20% discount active" },
    { days: "Friday", time: "09:00 AM – 09:30 PM", note: "Evening rush – advance booking advised" },
    { days: "Saturday – Sunday", time: "08:30 AM – 09:30 PM", note: "Weekend prime slots" },
  ],
  socials: {
    instagram: "https://instagram.com/urbanedge_barbers",
    facebook: "https://facebook.com/urbanedgebarber",
    twitter: "https://twitter.com/urbanedgebarber",
  },
  studentDiscount: {
    percentage: 20,
    validDays: "Monday – Thursday",
    note: "Valid student photo ID card required during checkout at shop",
  },
};
