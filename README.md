# TikTok Ads Manager - Creative Flow

A high-fidelity, industrial-grade web application designed for elite TikTok advertisers. This platform simulates the entire lifecycle of a TikTok ad campaign, from creative generation and AI policy validation to secure payment processing and real-time performance monitoring.


#Installation & Setup

1. **Clone the repository**
   
   git clone https://github.com/rudikadam/tiktokadsmanagerteam.git
   cd tiktokadsmanagerteam

2. **Install dependencies**

   npm install
   
3. **Start the development server**

   npm run dev

 Core Features

# Next-Gen Authentication
https://oauth.net/2/
- Secure Gatekeeping**: Multi-layer validation for Login and Registration.
- OAuth 2.0 Simulation**: Full callback handling for external partner integrations.
- Session Intelligence**: Automated token monitoring with secure 401 interceptors and forced logout protocols.

# Payment & Security Protocol
- *Gateway Simulation: Multi-stage payment processing (Credit Card, Crypto/QR).
- *QR Verification: Interactive "Scan & Verify" simulation for secure ad funding.
- *Transaction Vault: Detailed billing history and real-time balance tracking.

# Monitoring & Analytics (The "Ad History")
- *Live Stats Engine*: Real-time simulation of impressions, clicks, and CTR (Click-Through Rate).
- *account Isolation*: Strictly segregated ad history per user account using unique storage keys.
- *Performance Summary*: Global analytics dashboard for campaign-wide reach.

# Technical Support Hub
- *Support Protocol*: Category-based ticket submission system (Technical, Billing, Account).
- *Priority Routing*: High-impact tickets are flagged for immediate engineering attention.
- *Knowledge Core*: Self-service library for platform mastery and technical specs.

#Admin Control Console
- *Triage Center*: Centralized dashboard for managing inbound support tickets.
- *Ticket Lifecycle*: Ability to resolve, delete, or escalate platform issues.

---

#Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Glassmorphism |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Navigation** | [React Router 6](https://reactrouter.com/) |
| **Data Persistence** | Browser LocalStorage (Isolated per User) |

---

#Key Dependencies

The following packages are essential for the application to run:

- `react` & `react-dom`: Core UI logic.
- `react-router-dom`: SPA routing and navigation.
- `framer-motion`: Premium transitions and modal animations.
- `lucide-react`: High-fidelity vector iconography.
- `clsx` & `tailwind-merge`: Dynamic utility class management.
- `bootstrap` & `react-bootstrap`: Partial grid components and utility layouts.

---

#Testing & Validation Logic

#Multi-Account Testing
The app uses *User-Specific Storage*. To test this:
1. Create Account A -> Create an Ad.
2. Logout -> Create Account B.
3. Ad History for Account B will be **Empty**, while Account A's ads remain secure.

# Payment Simulation
1. Fill out the Ad Creation form.
2. Click **PAY & PUBLISH**.
3. Observe the **QR Code Scanning** simulation.
4. Wait for the **Verifying Transaction** phase before the ad is officially live.

# Support & Admin Flow
1. Navigate to **SUPPORT** and submit a "High Priority" ticket.
2. Navigate to **ADMIN** (Shield Icon) to see your ticket appear in the triage queue.

---

