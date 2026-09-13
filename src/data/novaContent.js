// Central lore, weapons, dimensions, and character data for NOVA (SONOVA)

export const NOVA_LORE = {
  name: "NOVA",
  fullName: "Sonova",
  title: "Guardian of Wonder & Savior of the World",
  tagline: "Every note is a step towards a better tomorrow.",
  subhero: "A common wanderer who transformed her suffering into celestial melody. Wielding music and ancient knowledge, she travels across dimensions to protect what the multiverse tries to tear apart.",

  character: {
    name: "NOVA",
    alias: "Sonova",
    age: "20",
    role: "Savior of the World",
    power: "Music + Celestial Knowledge",
    weapons: "The Harmonic Lens & The Starlit Journal",
    style: "Modern • Vintage • Powerful • Free",
    badge: "✦ Guardian of Wonder",
    description: "She doesn't just see the world; she feels it, learns from it, and turns its stories into music. Because for Nova, the world is worth saving — and so are its dreams.",
    quote: "Not just a dreamer... I'm the one who turns dreams into reality.",
    secondaryQuote: "Knowledge is another kind of power.",
    image: "/nova-full-body.png",
    portraitImage: "/nova-guide.jpg",
    fullArt: "/nova-full-body.png",
    characterSheet: "/nova-character-sheet.jpg",
    weaponArt: "/harmonic-lens-weapon.jpg",
    batmanRef: "/batman-reference.png",
    accent: "from-purple-500 via-pink-500 to-cyan-400",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },

  origin: {
    heading: "From Loneliness to Multiverse Savior",
    storyParagraphs: [
      "Sonova began her life as an ordinary girl. For years, she lived alone, enduring hardship, isolation, and profound suffering. Yet within the silence of her solitude, she began hearing the hidden frequencies that connect all living souls.",
      "She set out across the continents on foot, carrying nothing but an old notebook and an unyielding spirit. Traveling through bustling cities, forgotten villages, and untamed nature, she listened to the joys, tears, and grievances of ordinary people.",
      "Through her travels, she realized that music is not just sound—it is the primal frequency of life, emotion, and hope. She refined her inner music into an untouchable celestial art form. When multiversal anomalies and dark entities began fracturing our world, Sonova rose as Nova: the radiant guardian whom no villain could touch, armed with the beauty of sound and living knowledge."
    ],
    motto: "Same planet. Different stories. One home."
  },

  weapons: [
    {
      id: "harmonic_lens",
      name: "The Harmonic Violin Wand & Astrolabe",
      category: "Celestial Music Relic",
      tagline: "Weaponized Starlight Violin Bow & Astrolabe Core",
      description: "A masterwork celestial violin-wand crowned with counter-rotating astrolabe rings and a pulsating star core. Translates human memories, acoustic resonances, and starlight into impenetrable shields.",
      features: [
        "Acoustic Shockwave & Barrier: Disperses corruption waves across realms",
        "Emotional Transmutation: Turns acute pain into courage and hope",
        "Resonance Strings: 4 celestial strings tuned to 432Hz harmonic frequencies"
      ],
      soundFrequencies: [
        { note: "C4", freq: 261.63, label: "Heartbeat of Earth" },
        { note: "E4", freq: 329.63, label: "Echo of Memory" },
        { note: "G4", freq: 392.00, label: "Tears into Hope" },
        { note: "B4", freq: 493.88, label: "Multiverse Resonance" }
      ],
      image: "/nova-weapon-astrolabe.jpg",
      quote: "Every note is a step towards a better tomorrow."
    },
    {
      id: "starlit_guitar",
      name: "Celestial Starlight Guitar",
      category: "Harmonic Weapon",
      tagline: "Constellation Resonant Acoustic",
      description: "Forged with obsidian wood and inlaid with glowing celestial constellations, moon phases, and starlight orbit rings. Plays cosmic chords that alter reality and soothe fractured souls.",
      features: [
        "Starlight Resonance: Constellations ignite as chords are strummed",
        "Harmonic Blast: Emits golden stardust shockwaves in battle",
        "Celestial Tuning: Connects directly with the music of the spheres"
      ],
      soundFrequencies: [
        { note: "A3", freq: 220.00, label: "Cosmic Foundation" },
        { note: "D4", freq: 293.66, label: "Starlight Wave" },
        { note: "F#4", freq: 369.99, label: "Solar Flare" },
        { note: "A4", freq: 440.00, label: "Pure Resonance" }
      ],
      image: "/nova-weapon-guitar.jpg",
      quote: "Music is the language the universe speaks when words fail."
    },
    {
      id: "starlit_journal",
      name: "The Grimoire Book of Star Veils",
      category: "Living Wisdom Relic",
      tagline: "Living Celestial Chronicle & Star Charts",
      description: "A heavy velvet and brass-bound tome adorned with compass stars, moon phases, and glowing cosmic ribbons. Contains ancient star charts, lost cultural records, and every story Nova records.",
      features: [
        "Living Memory Matrix: Archives every distress signal and human story",
        "Tactical De-escalation: Translates complex systemic crises into clear paths",
        "Universal Cipher: Deciphers forgotten scripts and lost cultural records"
      ],
      image: "/nova-grimoire-book.jpg",
      quote: "Knowledge is another kind of power."
    },
    {
      id: "astrolabe_codex",
      name: "Astrolabe Leather Codex",
      category: "Star Chart Relic",
      tagline: "Celestial Navigation & Multiverse Map",
      description: "Bound in deep purple velvet leather with gold brass clasps and antique parchment inserts. Maps cosmic dimensional portals, planetary alignment vectors, and emergency beacon distress locations.",
      features: [
        "Dimensional Navigation: Maps exact rift coordinates across 5 realms",
        "Parchment Cipher: Translates forgotten ancient runes into tactical insight",
        "Astrolabe Lock: Secured with star-alignment locks that open only to Nova"
      ],
      image: "/nova-astrolabe-codex.jpg",
      quote: "Every page turned reveals a path through the dark."
    }
  ],

  dimensionsSaved: [
    {
      id: "environment",
      icon: "Leaf",
      title: "The Environment",
      desc: "Healing damaged biomes, soothing endangered fauna with harmonic frequencies, and standing guard over old-growth forests."
    },
    {
      id: "people",
      icon: "Users",
      title: "People & Cultures",
      desc: "Defending vulnerable communities, supporting weary laborers, and honoring ancestral traditions across every continent."
    },
    {
      id: "stories",
      icon: "BookOpen",
      title: "Stories & History",
      desc: "Preserving forgotten memories, documenting oral testimonies, and ensuring no person's life is erased."
    },
    {
      id: "music",
      icon: "Music",
      title: "Music & Art",
      desc: "Inspiring youth, reigniting passion in artists, and using acoustic beauty to silence hate and weapons."
    },
    {
      id: "future",
      icon: "Sparkles",
      title: "The Future",
      desc: "Protecting the dreams of the next generation so they inherit a world that is kind, empathetic, and free."
    }
  ],

  powers: [
    {
      id: "signal_sense",
      icon: "Zap",
      name: "Harmonic Signal Sense",
      tagline: "Piercing the Static",
      lore: "Nova detects faint frequencies of distress across digital noise, dimensional rifts, and hesitant human pauses.",
      interactiveDetail: "Translates tone, urgency, and underlying grievance into clear harmonic resonance vectors.",
      badge: "Multiverse Range: Infinite"
    },
    {
      id: "mind_link",
      icon: "Brain",
      name: "Empathetic Resonance",
      tagline: "Soul Comprehension",
      lore: "Decodes the emotional truth and underlying human necessity behind fragmented or hesitant words.",
      interactiveDetail: "Validates the speaker's emotional state, adapting the dialogue to provide comforting reassurance.",
      badge: "Empathy Level: 100%"
    },
    {
      id: "guardian_core",
      icon: "Shield",
      name: "Harmonic Aegis",
      tagline: "Acoustic Shield Barrier",
      lore: "An impenetrable barrier of musical resonance protecting the speaker's dignity, personal rights, and safety.",
      interactiveDetail: "Every transmission is encrypted client-side with full confidentiality.",
      badge: "Protection: Absolute"
    },
    {
      id: "echo_vision",
      icon: "Sparkles",
      name: "Starlit Pathfinder",
      tagline: "Direct Resolution Vector",
      lore: "Anticipates the optimal chain of allies, community advocates, and institutional contacts required to solve the issue.",
      interactiveDetail: "Generates a trackable cryptographic Beacon ID and initiates automatic dispatch alerts to candidate email.",
      badge: "Action Vector: Immediate"
    }
  ],

  howItWorks: [
    {
      step: "01",
      title: "Tell Your Story",
      desc: "Connect via the ChatGPT-style AI Dispatch portal. Share your name, age, location, email, and grievance freely.",
      icon: "MessageSquareHeart"
    },
    {
      step: "02",
      title: "Harmonic Lens Analysis",
      desc: "Nova decodes your words through acoustic resonance and living wisdom from the Starlit Journal.",
      icon: "Sparkles"
    },
    {
      step: "03",
      title: "Beacon Encrypted",
      desc: "A unique cryptographic Beacon ID is generated with downloadable verification receipt.",
      icon: "Radio"
    },
    {
      step: "04",
      title: "Automatic Dispatch",
      desc: "An automated email notification with subject '🦸 Someone Needs Your Help!' is sent to the candidate.",
      icon: "Send"
    }
  ],

  stats: [
    { label: "Role", value: "Savior of Earth" },
    { label: "Age", value: "20 Years" },
    { label: "Power Source", value: "Music + Lore" },
    { label: "Response", value: "100% Instant" }
  ],

  categories: [
    { id: "personal", label: "Personal Struggle & Mental Well-Being", icon: "HeartHandshake" },
    { id: "workplace", label: "Workplace, Labor & Wage Injustice", icon: "Briefcase" },
    { id: "community", label: "Community, Tenancy & Civil Grievance", icon: "Users" },
    { id: "environmental", label: "Environmental / Ecological Threat", icon: "Leaf" },
    { id: "multiverse", label: "Multiversal / Unexplained Phenomenon", icon: "Zap" },
    { id: "other", label: "Other Crisis or Request", icon: "HelpCircle" }
  ],

  crisisHotlines: [
    { name: "Emergency Dispatch", number: "911 / 112 (or local emergency)", description: "For immediate physical danger" },
    { name: "Suicide & Crisis Lifeline", number: "988 (Call or Text)", description: "24/7 free, confidential support" },
    { name: "Crisis Text Line", number: "Text HOME to 741741", description: "Connect with a crisis counselor" },
    { name: "International Resources", number: "befrienders.org", description: "Global emotional support network" }
  ]
};
