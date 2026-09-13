# NOVA — The Guardian of Unheard Voices 🌌✨

> *"Every voice deserves to be heard. In the silence of distress, a signal ignites."*

A superhero web portal and conversational intake application built for individuals facing unresolved grievances, hardships, or requests with nowhere else to turn. 

NOVA combines **cinematic anime superhero lore** with **real-world advocacy utility**: an empathetic character narrative, dark violet/cyan glassmorphic aesthetics, dual character form-shifting, and an intelligent intake system that captures user stories and dispatches notification alerts.

---

## 🌟 Character Profile: NOVA

* **Identity**: NOVA (The Guardian of Unheard Voices)
* **Design Concept**: Inspired by loyal anime companions (such as Paimon from *Genshin Impact*), featuring a floating chibi/fairy guardian with lilac hair, star halo, constellation cape, and audio frequencies.
* **Dual Forms**:
  * **💜 Harmonic Guide (Compassion Mode)**: Sweet, gentle, welcoming companion who listens and guides you.
  * **⚡ Overdrive Guardian (Battle Mode)**: Radiant white/gold battle armor with neon cyan/magenta wings, channeling power to pierce bureaucratic red tape and transmit urgent alerts.
* **The 4 Superpowers**:
  * ⚡ **Signal Sense**: Detects faint distress frequencies across digital white noise and silence.
  * 🧠 **Mind Link**: Empathetic comprehension that decodes the true human need behind words.
  * 🛡 **Guardian Core**: Client-side cryptographic sanctuary guaranteeing privacy and zero-knowledge protection.
  * ✨ **Echo Vision**: Pathfinder that maps the resolution route and generates trackable **Beacon IDs**.

---

## 🚀 Key Features

1. **Integrated Conversational Chatbot**:
   * Structured, step-by-step intake: Name/Alias → Age → Location → Email → Category → Story Description → Urgency.
   * "Stay Anonymous" option for full confidentiality.
   * Real-time Signal Strength resonance meter as the user types.
2. **Dual-Form Shifter**:
   * Switch between Guide Mode and Guardian Mode with dynamic visual theme changes and audio chimes.
3. **Automated Submission & Email Dispatch System**:
   * Generates a unique cryptographic Beacon ID (e.g. `BEACON-NV-8492`).
   * Saves records to local encrypted storage.
   * Dispatches automated notification alerts to support coordinators.
   * Downloadable Beacon Transmission Receipt (`.txt`).
4. **Guardian Console (Admin / Reviewer Dashboard)**:
   * Accessible from the footer or receipt card.
   * View all active beacons, inspect email notification payloads, and test real email dispatches.
5. **Interactive Audio Resonance (Web Audio API)**:
   * Zero external audio files required. Synthesizes gentle cosmic ambient drones, star chimes, and transmission pulses directly in browser code.
6. **Crisis Safety Net**:
   * Automatically detects acute crisis or emergency keywords and presents immediate 24/7 verified hotline resources.

---

## 🛠️ Tech Stack

* **Frontend**: React 18 + Vite
* **Styling**: Tailwind CSS + Glassmorphism + Custom Keyframe Animations
* **Icons**: Lucide React
* **Confetti**: Canvas-Confetti
* **Audio**: Native Web Audio API Synthesizer (0 external MP3 dependencies)

---

## 💻 Running the Project Locally

```bash
# Navigate to the project directory
cd nova-portal

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 🌐 Deploying to Production (Step 6)

### Option A: Vercel (Recommended — 1 Click)
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect **Vite**. Click **Deploy**!
5. You will get a public live URL like `https://nova-portal.vercel.app`.

### Option B: Netlify
1. Run `npm run build`.
2. Drag and drop the generated `dist` folder into [Netlify Drop](https://app.netlify.com/drop).
3. Your site is instantly live!

---

## 📧 Submission Template (Step 7)

```markdown
Subject: Submission: Superhero Portal Challenge - NOVA (The Guardian of Unheard Voices)

Hi Review Team,

Here is my submission for the Superhero Portal Challenge:

- Project Name: NOVA — The Guardian of Unheard Voices
- Public Live URL: [INSERT YOUR DEPLOYED URL]
- GitHub Repository: [INSERT YOUR GITHUB REPO URL]

Summary:
NOVA is an original anime superhero who helps people facing grievances, hardships, or ignored requests. 
The portal features:
1. Complete character dossier, origin story, and 4 specialized powers.
2. Dual-form toggle (Harmonic Guide & Overdrive Guardian).
3. Conversational chatbot intake (Name, Age, Location, Email, Problem, Urgency).
4. Automated submission system with unique Beacon IDs and email notification dispatch.
5. Built-in Guardian Console for reviewing submissions and email logs.
6. Zero-dependency Web Audio API soundscape and crisis safety interceptor.

Thank you for your review!
```
