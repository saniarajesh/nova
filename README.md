# NOVA — The Guardian of Unheard Voices 🌌✨

> *"Every voice deserves to be heard. In the silence of distress, a beacon ignites."*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

An immersive anime-inspired superhero web portal and intelligent conversational grievance intake system designed for individuals facing unresolved grievances, hardships, or unheard cries for help.

NOVA bridges **cinematic anime superhero lore** with **real-world advocacy utility**: an empathetic character narrative, dark violet/cyan glassmorphic aesthetics, 3D interactive artifacts, dual character form-shifting, and an automated intake system that captures stories, generates verifiable cryptographic Beacon IDs with PDF receipts, and dispatches real-time email alerts.

---

## 🌟 Character Dossier: NOVA

* **Identity**: NOVA (The Celestial Guardian of Unheard Voices)
* **Archetype**: Cosmic Sorceress / Empathic Guardian Companion
* **Aesthetics**: Floating celestial guardian with lilac hair, star halo, constellation cape, celestial staff, and resonating audio frequencies.
* **Dual Forms**:
  * **💜 Harmonic Guide (Compassion Mode)**: Gentle, empathetic companion providing solace, active listening, and guidance.
  * **⚡ Overdrive Guardian (Battle Mode)**: Radiant celestial battle armor with energized wings, channeling cosmic mana to break through administrative red tape and broadcast urgent distress beacons.
* **The 4 Core Superpowers**:
  * ⚡ **Signal Sense**: Detects faint distress frequencies and silent cries for help buried under digital white noise.
  * 🧠 **Mind Link**: Empathetic comprehension that deciphers the true emotional urgency and human need behind words.
  * 🛡️ **Guardian Core**: Client-side cryptographic sanctuary ensuring zero-knowledge privacy and data protection.
  * ✨ **Echo Vision**: Pathfinder trajectory mapping that generates unique, trackable **Beacon IDs** and resolution paths.

---

## 🗡️ Celestial Arsenal & Lore

* **Starlight Requiem (Celestial Staff)**: An ancient conduit forged from fallen starlight that channels harmonic resonance into protective barriers.
* **Astral Veil**: A zero-knowledge ward that shields vulnerable transmissions from interceptors.
* **Interactive 3D Grimoire & Codex**: Browse interactive 3D weapon models, battle timeline archives, and the ancient lore chronicles.

---

## 🚀 Key Features

### 1. 🤖 Intelligent Conversational Intake Bot
* **Structured & Empathic Flow**: Step-by-step guidance covering Alias/Name, Demographics, Problem Category, Narrative Details, and Urgency Level.
* **AI-Assisted Processing**: Powered by Gemini API / NLP heuristics for context-aware responses and sentiment recognition.
* **Confidential & Anonymous Mode**: One-click toggle for complete anonymity and sensitive data masking.
* **Real-time Resonance Meter**: Dynamic signal strength indicator responding dynamically to user interactions.

### 2. 📜 Automated Beacon & PDF Transmission Receipts
* Generates a unique, tamper-resistant cryptographic **Beacon ID** (e.g. `BEACON-NV-8492`).
* **Instant PDF Receipt Generator**: Powered by `jspdf` with official celestial seal, timestamp, and grievance summary.
* Persistent encrypted local transmission history.

### 3. 📧 Automated Email Dispatch Integration
* Direct integration with **EmailJS** to dispatch grievance beacons instantly to designated support coordinators and responders.

### 4. 🎵 Zero-Dependency Web Audio Synth
* Custom browser-native **Web Audio API** sound engine synthesizing cosmic ambient drones, harmonic chimes, and battle pulses without external audio asset downloads.

### 5. 🛡️ Crisis Safety Net Interceptor
* Real-time keyword interceptor for acute crisis signals, displaying immediate 24/7 verified hotline and support resources.

### 6. ✨ High-End Visual Experience
* Dark violet & cyan glassmorphism with dynamic custom particle systems (`ParticleBackground`, `CrimsonParticlesCanvas`).
* Smooth micro-interactions, 3D card tilt physics, and dynamic celebratory confetti effects (`canvas-confetti`).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom Keyframe Glassmorphism |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) |
| **VFX / FX** | Canvas Confetti & Canvas Particle Engines |
| **Audio** | Native Browser Web Audio API (Synthesizer Engine) |
| **Email Service** | [EmailJS](https://www.emailjs.com/) |

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Optional AI / Intake API Keys
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# EmailJS Service Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# 1. Admin Triage Alert Template
# Dashboard source file: email-templates/admin-template_7o5tasj.html
# Dashboard settings: To Email = {{to_email}}, Reply To = {{reply_to}}, Content = HTML from file
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_7o5tasj
VITE_ADMIN_EMAIL=saniarajesh7205@gmail.com

# 2. User Welcome Confirmation Template
# Dashboard source file: email-templates/user-template_b3yly2t.html
# Dashboard settings: To Email = {{to_email}}, Reply To = {{reply_to}}, Content = HTML from file
VITE_EMAILJS_USER_TEMPLATE_ID=template_b3yly2t

# Portal config
VITE_PORTAL_URL=https://nova-inky-beta.vercel.app/
```

---

## 💻 Getting Started Locally

### Prerequisites
* Node.js (v18 or higher recommended)
* npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/saniarajesh/nova.git

# 2. Navigate to project directory
cd nova-portal

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port indicated in your terminal) to view the portal.

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment

### Option A: Vercel (Recommended)
1. Push your repository to GitHub.
2. Link the repository in [Vercel](https://vercel.com).
3. Set your environment variables in the Vercel project settings.
4. Click **Deploy**.

### Option B: Netlify
1. Run `npm run build`.
2. Connect your Git repository or deploy the `dist/` directory directly via [Netlify Drop](https://app.netlify.com/drop).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Forged with 💜 & ✨ for the <b>Superhero Portal Challenge</b>
</p>
