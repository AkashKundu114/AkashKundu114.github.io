export interface Project {
  id: string;
  title: string;
  status: string;
  shortDesc: string;
  description: string;
  problem: string;
  aiArchitecture: {
    heading: string;
    body: string;
    points: string[];
    stack: string[];
  };
  uiDeployment: {
    heading: string;
    body: string;
    points: string[];
    deployed: string;
    stack: string[];
  };
  technologies: string[];
  year: string;
  github: string | null;
  liveLink: string | null;
  features: string[];
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: 'copper-ai-assistant',
    title: 'COPPER — AI Desktop Productivity Assistant',
    status: 'In Progress',
    shortDesc: 'A fully offline desktop AI assistant built on Tauri + Ollama with voice I/O, coding automation, and <50ms local inference latency.',
    description: 'Developed a fully offline desktop AI assistant as measured by achieving <50ms local inference latency on consumer hardware, by integrating a Tauri-based native application with a locally-deployed Ollama LLM and Whisper STT.',
    problem: 'Cloud AI assistants are unsuitable for developers working with sensitive codebases or in offline environments. There is no native desktop tool that combines local LLM inference, voice I/O, and system-level automation in a single low-latency package.',
    aiArchitecture: {
      heading: 'Local Ollama LLM with voice pipeline and database-backed memory',
      body: 'The AI core is a locally-deployed LLM served via Ollama, eliminating all external API calls. A voice-to-text pipeline processes 10+ daily queries with Whisper STT. Conversation history is persisted in a local database, giving the model continuous memory across sessions rather than a flat per-session context window.',
      points: [
        'Ollama-served local LLM achieving <50ms inference latency on consumer hardware',
        'Voice-to-text pipeline processing 10+ daily queries with Whisper STT integration',
        'Database-backed memory layer — context persists across sessions, not just within them',
        'Coding and system-level automation hooks for file operations and CLI task execution',
        '100% offline execution — zero data egress, no API keys, no usage limits',
      ],
      stack: ['Ollama', 'Whisper STT', 'Python', 'FastAPI', 'PostgreSQL'],
    },
    uiDeployment: {
      heading: 'Native desktop application built with Tauri (Rust + React frontend)',
      body: 'The interface is a native desktop application built with Tauri, combining a Rust backend for low-level system access with a React/TypeScript frontend. This gives COPPER true native performance and OS integration while keeping the interface fast and responsive.',
      points: [
        'Tauri (Rust core) for native OS integration, file system access, and system tray support',
        'React + TypeScript frontend for the chat interface, voice controls, and task dashboard',
        'Real-time streaming text output — tokens render as they are generated, not in a batch',
        'Dark-themed interface with conversation history, pinned notes, and voice activation toggle',
        'Cross-platform: Windows, macOS, and Linux from a single codebase',
      ],
      deployed: 'Native desktop app via Tauri — packaged as .exe / .dmg / .AppImage',
      stack: ['Tauri', 'Rust', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    technologies: ['Tauri', 'FastAPI', 'Ollama', 'Python', 'React', 'TypeScript', 'Whisper'],
    year: '2026',
    github: null,
    liveLink: null,
    features: [
      'Eliminated cloud reliance as measured by 100% offline execution, by integrating local LLM inference via Ollama with <50ms latency.',
      'Streamlined user input as measured by processing 10+ daily queries, by building a voice-to-text pipeline via Whisper STT.',
      'Enhanced context continuity as measured by seamless cross-session interactions, by implementing a database-backed persistent memory layer.',
      'Automated developer workflows as measured by reduced manual CLI usage, by creating system-level automation hooks for file operations.',
      'Delivered native performance as measured by low overhead execution, by building a cross-platform desktop app via Tauri.',
    ],
    screenshots: [],
  },
  {
    id: 'eye-disease-predictor',
    title: 'AI-Based Eye Disease Predictor',
    status: 'Completed',
    shortDesc: 'CNN trained on 5,000+ images classifying 7 eye diseases with >85% accuracy, Grad-CAM visual explanations, and automated clinical PDF reports.',
    description: 'Engineered an AI-driven eye disease prediction system as measured by >85% classification accuracy across 7 distinct conditions, by training a Convolutional Neural Network (PyTorch) on 5,000+ images with Grad-CAM visual explanations.',
    problem: 'Ophthalmologic diagnosis requires expensive specialists and equipment, creating access barriers in underserved regions. There was no lightweight, explainable tool for pre-screening patients that could generate actionable clinical documentation.',
    aiArchitecture: {
      heading: 'CNN (PyTorch) trained on 5,000+ images with Grad-CAM interpretability pipeline',
      body: 'A Convolutional Neural Network built on a PyTorch backbone was trained on a curated dataset of 5,000+ labelled retinal images across 7 disease classes. Grad-CAM generates pixel-level heat-maps highlighting the exact regions the model identified as clinically significant.',
      points: [
        'CNN (PyTorch) trained on 5,000+ labelled retinal images across 7 disease classes',
        'Achieved >85% classification accuracy with data augmentation to prevent overfitting',
        'Grad-CAM pipeline generating pixel-level heat-map overlays for clinical interpretability',
        'Automated diagnostic PDF pipeline integrating prediction, confidence score, and annotated image',
        '40% reduction in manual clinical review time through automated report generation',
      ],
      stack: ['Python', 'PyTorch', 'OpenCV', 'Grad-CAM', 'NumPy', 'Pandas'],
    },
    uiDeployment: {
      heading: 'Clinical-grade prediction interface with automated PDF data pipeline',
      body: 'The interface allows clinicians or patients to upload a retinal photograph and receive a full diagnostic report within seconds — prediction, confidence score, Grad-CAM overlay, and a structured PDF ready for clinical documentation.',
      points: [
        'Single-click image upload with real-time preview and format validation',
        'Side-by-side display of original photograph and Grad-CAM heat-map overlay',
        'Automated PDF report generation with prediction, confidence, and annotated image',
        'Batch processing mode for screening multiple patients sequentially',
        'Results exported in structured format compatible with medical record systems',
      ],
      deployed: 'Local Python application — planned FastAPI backend for web deployment',
      stack: ['Python', 'PyTorch', 'OpenCV', 'ReportLab (PDF)', 'CLI Interface'],
    },
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Grad-CAM', 'Computer Vision', 'CNN'],
    year: '2026',
    github: null,
    liveLink: null,
    features: [
      'Improved diagnostic accuracy as measured by >85% classification success, by training a CNN (PyTorch) on 5,000+ labelled retinal images.',
      'Expanded pre-screening capabilities as measured by the classification of 7 distinct eye diseases, by utilizing a custom PyTorch backbone.',
      'Increased clinical trust as measured by transparent prediction rationale, by implementing Grad-CAM heat-map overlays for interpretability.',
      'Reduced manual review time as measured by a 40% efficiency gain, by engineering an automated PDF diagnostic report generation pipeline.',
      'Prevented model overfitting as measured by consistent validation performance, by executing a robust medical imaging data augmentation pipeline.',
    ],
    screenshots: [],
  },
  {
    id: 'ai-hardware-benchmark',
    title: 'AI Hardware Benchmark Engine',
    status: 'In Progress',
    shortDesc: 'Full-stack ML app predicting hardware performance across 3 heavy AI workloads using CatBoost, custom scrapers, and a FastAPI serving layer.',
    description: 'Constructed an AI hardware performance prediction engine as measured by reliable benchmark estimations across 3 heavy workloads, by utilizing custom web scrapers, a CatBoost regression model, and a FastAPI serving layer.',
    problem: 'Hardware upgrade decisions for AI workloads require either expensive benchmarking rigs or unreliable anecdotal comparisons. There is no accessible tool that predicts multi-workload performance from a hardware spec sheet.',
    aiArchitecture: {
      heading: 'CatBoost regression model trained on scraped hardware benchmark data',
      body: 'Custom Python scrapers ingest hardware specification tables from 6+ sources, engineer features from raw specs, and feed them into a CatBoost gradient-boosted model trained to predict benchmark scores across 3 heavy workloads: AI inference, 3D rendering, and general compute.',
      points: [
        'Custom scraping pipeline ingesting 6+ hardware specification tables via Python',
        'Feature engineering converting raw hardware specs into ML-ready numerical features',
        'CatBoost gradient-boosted regressor predicting performance across 3 target workloads',
        'Model trained on real-world benchmark scores for GPU/CPU performance prediction',
        'Cross-validation and RMSE evaluation ensuring prediction reliability across hardware tiers',
      ],
      stack: ['Python', 'CatBoost', 'Pandas', 'Scikit-learn', 'BeautifulSoup'],
    },
    uiDeployment: {
      heading: 'FastAPI model serving layer with targeted upgrade recommendation engine',
      body: 'Trained model weights are served via a FastAPI endpoint accepting hardware specifications as JSON and returning predicted benchmark scores. A recommendation layer compares the submitted hardware against similar-tier alternatives, surfacing upgrade suggestions ranked by performance-per-dollar.',
      points: [
        'FastAPI model serving endpoint accepting hardware specs and returning predictions',
        'Recommendation engine ranking upgrade alternatives by predicted performance gain',
        'JSON API interface for easy integration with hardware review sites or tools',
        'Automated data refresh pipeline keeping benchmark training data current',
        'React frontend (planned) for a consumer-facing hardware comparison tool',
      ],
      deployed: 'FastAPI server — local development, planned Railway/Render deployment',
      stack: ['FastAPI', 'Python', 'REST API', 'Uvicorn', 'Pydantic'],
    },
    technologies: ['Python', 'CatBoost', 'Pandas', 'FastAPI', 'Scikit-learn', 'Web Scraping'],
    year: '2026',
    github: null,
    liveLink: null,
    features: [
      'Delivered accurate hardware predictions as measured by cross-validated RMSE evaluation, by training a CatBoost model on AI inference, rendering, and compute workloads.',
      'Aggregated comprehensive hardware data as measured by processing 6+ specification tables, by developing a custom Python scraping pipeline.',
      'Provided targeted upgrade suggestions as measured by performance-per-dollar rankings, by deploying a FastAPI model serving JSON API.',
      'Optimized machine learning inputs as measured by improved model accuracy, by engineering a feature pipeline converting raw specs to ML-ready formats.',
      'Ensured prediction reliability as measured by consistent performance across hardware tiers, by utilizing robust cross-validation techniques.',
    ],
    screenshots: [],
  },
  {
    id: 'e2ee-chat',
    title: 'E2EE Multi-User Chat Application',
    status: 'Completed',
    shortDesc: 'Real-time chat supporting 50+ concurrent users with 256-bit end-to-end encryption, JWT auth, and sub-100ms WebSocket message delivery.',
    description: 'Developed a real-time, privacy-first chat application as measured by supporting 50+ concurrent users with sub-100ms message delivery, by implementing a Node.js WebSocket engine and 256-bit AES end-to-end encryption.',
    problem: 'Cloud chat platforms store messages in plaintext on their servers. Small teams handling sensitive discussions need a self-hostable alternative where messages are encrypted end-to-end and never readable by the server.',
    aiArchitecture: {
      heading: 'Node.js WebSocket engine with 256-bit E2EE and JWT authentication',
      body: 'The backend is a Node.js WebSocket server implementing a publish-subscribe model for real-time message routing. 256-bit AES end-to-end encryption ensures messages are encrypted client-side before transmission — the server handles routing without ever accessing plaintext.',
      points: [
        'Node.js WebSocket server supporting 50+ concurrent users across 10+ named rooms',
        '256-bit AES end-to-end encryption — messages encrypted client-side, server sees only ciphertext',
        'JWT authentication with short expiry windows validated on every WebSocket handshake',
        'Publish-subscribe room model with per-room participant registry and message queue',
        'Sub-100ms message delivery latency under concurrent multi-user load',
      ],
      stack: ['Node.js', 'WebSocket (ws)', 'JWT', 'AES-256 Encryption', 'SQL'],
    },
    uiDeployment: {
      heading: 'React frontend with real-time rendering and responsive room navigation',
      body: 'The React frontend delivers a native-app-like feel with instant message rendering via WebSocket event listeners, instant room switching with unread counters, and a responsive layout adapting between desktop and mobile. Graceful reconnection logic handles network interruptions without losing state.',
      points: [
        'React frontend with real-time message rendering — zero page refreshes',
        'Instant room switching with persistent unread message counters',
        'Responsive layout with desktop sidebar and mobile bottom-nav adaptations',
        'Graceful WebSocket reconnection with state recovery on network interruption',
        'Typing indicators and real-time online presence status per room',
      ],
      deployed: 'Self-hosted Node.js server — deployable on any VPS or local network',
      stack: ['React', 'JavaScript', 'Tailwind CSS', 'WebSocket Client API'],
    },
    technologies: ['React', 'Node.js', 'WebSockets', 'JWT', 'AES-256', 'SQL'],
    year: '2025',
    github: null,
    liveLink: null,
    features: [
      'Scaled real-time communication as measured by supporting 50+ concurrent users, by designing a pub-sub WebSocket message routing architecture.',
      'Secured user privacy as measured by zero plaintext server exposure, by implementing 256-bit AES end-to-end encryption.',
      'Ensured secure session management as measured by robust connection validation, by integrating JWT authentication with per-frame token validation.',
      'Achieved rapid message delivery as measured by sub-100ms latency across 10+ concurrent named chat rooms, by optimizing Node.js server performance.',
      'Enhanced user experience as measured by seamless session recovery, by building a React frontend with graceful reconnection logic.',
    ],
    screenshots: [],
  },
  {
    id: 'portfolio-cms',
    title: 'Portfolio CMS & Admin Dashboard',
    status: 'Completed',
    shortDesc: 'Full-stack headless CMS powering this portfolio — protected admin panel, dynamic CRUD, FastAPI contact API, and PWA with GitHub Actions CI/CD.',
    description: 'Architected a full-stack portfolio content management system as measured by automated GitHub Actions CI/CD deployments and dynamic content rendering, by developing a React PWA, a DataContext abstraction layer, and a FastAPI contact microservice.',
    problem: 'Static portfolio sites require a full code deployment to update a single project description. Content management should be decoupled from the codebase entirely.',
    aiArchitecture: {
      heading: 'DataContext abstraction layer — localStorage today, API tomorrow',
      body: 'The DataContext layer acts as the single source of truth for all portfolio content. Currently backed by localStorage for zero-config persistence, it is architected to swap in a REST API with one change — making the entire site genuinely backend-ready without touching any component.',
      points: [
        'DataContext abstraction decoupling every component from the storage implementation',
        'Fuse.js fuzzy search across all projects — tolerates typos and partial matches',
        'Multi-tag AND-filter allowing simultaneous technology filtering on projects page',
        'JSON export functionality for data backup and backend database seeding',
        'FastAPI contact microservice with rate limiting, input sanitization, and SMTP delivery',
      ],
      stack: ['React Context API', 'Fuse.js', 'localStorage', 'FastAPI', 'Python'],
    },
    uiDeployment: {
      heading: 'Secured admin panel, Framer Motion transitions, PWA, GitHub Actions CI/CD',
      body: 'The admin panel sits behind a password gate with session authentication, providing full CRUD for all content. Framer Motion powers page transitions. The site is a PWA with Workbox caching and deploys automatically on every git push via GitHub Actions.',
      points: [
        'Password-gated admin at /#/admin with session-based authentication and CRUD modals',
        'Framer Motion AnimatePresence for fluid page transitions and route animations',
        'PWA conversion — Workbox service worker caches assets and Google Fonts offline',
        'GitHub Actions CI/CD pipeline deploying to GitHub Pages with injected environment secrets',
        'JSON-LD Person schema + full Open Graph meta for ATS and SEO optimisation',
      ],
      deployed: 'GitHub Pages (akashkundu.me) via GitHub Actions',
      stack: ['Vite PWA', 'Workbox', 'GitHub Actions', 'Framer Motion', 'FastAPI'],
    },
    technologies: ['React', 'FastAPI', 'Python', 'Vite PWA', 'Framer Motion', 'Fuse.js', 'GitHub Actions'],
    year: '2025',
    github: null,
    liveLink: 'https:
    features: [
      'Decoupled content management as measured by dynamic data rendering, by creating a REST API-ready DataContext abstraction layer.',
      'Secured content administration as measured by restricted backend access, by building a password-gated admin panel with full CRUD capabilities.',
      'Improved project discoverability as measured by accurate multi-criteria queries, by integrating Fuse.js fuzzy search and multi-tag AND filtering.',
      'Optimized application performance as measured by offline capabilities, by converting the application into a PWA using a Workbox service worker.',
      'Automated deployment workflows as measured by zero-touch publishing, by configuring GitHub Actions CI/CD with environment secret injection.',
    ],
    screenshots: [],
  },
];
