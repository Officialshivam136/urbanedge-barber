# URBANEDGE Barbershop & Lounge

A luxury, high-performance web application for **URBANEDGE Barbershop & Lounge**, built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Lucide Icons.

![URBANEDGE Barbershop](public/favicon.ico)

---

## ✂️ Highlights & Features

- **Cinematic Hero Experience**:
  - Full HD barbershop video reel with interactive Audio Toggle (Sound Waves animation + volume control).
  - Editorial typography matching the brand design with vintage handcrafted stamp and vertical social rail.
  - Interactive "Watch Film (4K)" theater modal.
- **Dynamic Operating Status Tag**:
  - Floating badge directly beside the header brand logo (`● OPEN • till 9 PM` / `○ CLOSED • opens 9 AM`).
  - Evaluates local store hours (9:00 AM – 9:00 PM IST) in real time without screen clutter.
- **Interactive 4-Step Booking Engine (`/book`)**:
  - **Step 1 — Service Selection**: Haircuts, Beard sculpting, Royal Shaves, Student packages with ₹ INR pricing.
  - **Step 2 — Master Barber**: Barber selection with specialties and experience rating.
  - **Step 3 — 7-Day Live Slots**: Morning, Afternoon, and Evening slots.
  - **Step 4 — Client Info & Student Discount**: Optional 20% student discount toggle with real-time price ledger.
  - **Transparent Payment Ledger**: ₹50 advance seat reservation token with remaining balance payable at front desk.
  - **Dual Confirmation Options**: Instant Online Payment (Razorpay) or direct WhatsApp Concierge reservation.
- **Digital Booking Pass (`/booking/[ref]`)**:
  - Live confirmation receipt with booking reference, barcode, financial breakdown, and GSTIN compliance details.
- **Front Desk Concierge Dashboard (`/admin`)**:
  - Front desk operations manager to search appointments, filter by status, and update booking lifecycles in real-time.
- **Omnichannel WhatsApp Concierge**:
  - Persistent floating WhatsApp contact button (`+91 9568423360`) with pre-composed appointment inquiries.
- **Master Barbers & Services Showcase**:
  - Curated service catalog with category filter pills.
  - Traditional Hot Towel ritual showcase & "Crafted for Confidence" editorial section.
  - 6-card curated gallery with zoom hover effects.
  - Customer testimonials & Google Maps integration.

---

## 🛡️ Security Hardening & Protocols

The application is hardened following modern OWASP and web application security best practices:

1. **Edge Web Application Firewall (WAF) (`middleware.ts`)**:
   - Inspects URL query strings, request paths, and form inputs.
   - Detects and mitigates XSS (`<script>`, `javascript:`), SQL Injection (`union select`, `--`, `/*`), and Local File Inclusion (`../`).
2. **Per-IP Token-Bucket Rate Limiter**:
   - Web Routes: 120 requests / minute per client IP.
   - API Endpoints: 25 requests / minute per client IP to safeguard against DoS and credential stuffing.
   - Returns standard `429 Too Many Requests` with `Retry-After` headers.
3. **HTTP Security Headers (`next.config.ts`)**:
   - `Strict-Transport-Security` (HSTS): `max-age=63072000; includeSubDomains; preload` (2 years).
   - `Content-Security-Policy` (CSP): Whitelists Razorpay checkout scripts, frames, Google Fonts, and Unsplash CDNs.
   - `X-Frame-Options`: `SAMEORIGIN` (prevents clickjacking).
   - `X-Content-Type-Options`: `nosniff` (prevents MIME sniffing).
   - `Referrer-Policy`: `strict-origin-when-cross-origin`.
   - `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`.
4. **Authoritative Server-Side Pricing (`app/api/bookings/route.ts`)**:
   - Client-submitted totals are ignored; prices and ₹50 token deposits are calculated authoritatively on the server.
5. **HMAC-SHA256 Cryptographic Verification**:
   - Webhook & verification endpoints (`app/api/payments/verify/route.ts` & `app/api/webhooks/razorpay/route.ts`) verify Razorpay signatures using `crypto.timingSafeEqual` to eliminate timing attacks.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Officialshivam136/urbanedge-barber.git
cd urbanedge-barber

# Install dependencies
npm install
```

### Environment Configuration

Copy the example environment file and configure your credentials:

```bash
cp .env.example .env.local
```

Configure the following keys in `.env.local`:

```env
# Razorpay Credentials (Optional for local demo mode)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id

# Public URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

*Note: In development and test mode, fallback mock payments are automatically supported if Razorpay keys are omitted.*

### Running the Application

```bash
# Start development server
npm run dev

# Or build and run production server
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Project Structure

```
urbanedge-barber/
├── app/
│   ├── admin/                  # Concierge front desk dashboard
│   ├── api/
│   │   ├── bookings/           # Booking creation & validation API
│   │   ├── payments/verify/    # Razorpay HMAC-SHA256 signature verification
│   │   └── webhooks/razorpay/  # Webhook processor
│   ├── book/                   # 4-Step interactive booking wizard
│   ├── booking/[ref]/          # Digital confirmation pass & receipt
│   ├── privacy/                # Privacy policy (compliance)
│   ├── refund-policy/          # Refund & cancellation policy (compliance)
│   ├── terms/                  # Terms & conditions (compliance)
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── page.tsx                # Homepage aggregator
│   └── globals.css             # Tailwind & typography styling
├── components/
│   ├── Navbar.tsx              # Navigation with dynamic floating Open/Closed tag
│   ├── Hero.tsx                # Cinematic video reel hero with audio toggle
│   ├── BarbersSection.tsx      # Master barbers showcase
│   ├── ClassicShaveSection.tsx # Hot towel ritual feature
│   ├── StudentDiscountBanner.tsx # 20% Student cut promotional banner
│   ├── AboutSection.tsx        # Brand story & vintage est. stamp
│   ├── ServicesSection.tsx     # Filterable services menu
│   ├── GallerySection.tsx      # High-res client transformation gallery
│   ├── TestimonialsSection.tsx # Verified customer reviews
│   ├── ContactAndHours.tsx     # Map, business hours, and store location
│   ├── FloatingWhatsApp.tsx    # Persistent WhatsApp floating action button
│   └── Footer.tsx              # Global footer with hours and legal links
├── lib/
│   └── data.ts                 # Service catalog, barbers, time slots & reviews
├── public/
│   └── videos/
│       └── urbanedge-hero.mp4  # 1080p authentic barbershop reel (H.264/AAC)
├── middleware.ts               # Token-bucket rate limiter & WAF security layer
├── next.config.ts              # OWASP security headers & image domain whitelist
└── README.md
```

---

## 📞 Contact & Inquiries

- **Store Address**: 14/2 Park Street, Connaught Place, New Delhi 110001
- **Phone / WhatsApp**: [+91 95684 23360](tel:+919568423360)
- **Hours**: Tuesday – Sunday: 9:00 AM – 9:00 PM (Closed Mondays)

---

## 📄 License

Proprietary © 2026 URBANEDGE Barbershop & Lounge. All rights reserved.
