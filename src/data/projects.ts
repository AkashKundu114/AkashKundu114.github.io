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
    id: 'ai-sathi',
    title: 'AI-SATHI: Voice-first AI operating system',
    status: 'Completed',
    shortDesc:
      'Voice-first AI operating system and intelligent financial ledger for rural micro-entrepreneurs & Self-Help Groups (SHGs), powered by Sarvam AI and deployed on Azure.',
    description:
      'Developed AI-SATHI, a voice-first AI operating system and intelligent financial ledger designed to support rural Self-Help Group (SHG) women in West Bengal through spoken Bengali interactions under Purposive AI. Scaled for a 100-user, 2,000 msg/day pilot via a single Azure Container App.',
    problem:
      'Rural micro-entrepreneurs face persistent challenges in manual bookkeeping and limited market knowledge. There is a strong need for trustworthy, voice-first AI assistants tailored to local languages and realities.',
    aiArchitecture: {
      heading: 'Voice-Ledger pipeline with RAG PDF chatbot and multi-agent orchestration',
      body: 'Engineered a full Voice-Ledger Python FastAPI pipeline to auto-extract Bengali voice notes into bank-submittable PDFs. Integrated a robust RAG PDF chatbot with 2-stage per-chunk grounding checks to minimize scheme-matching hallucinations to 0%, while slashing AI vendor lock-in by routing through a Sarvam AI to Ollama fallback cascade.',
      points: [
        'Voice-Ledger Python FastAPI pipeline auto-extracting Bengali voice notes into PDFs',
        'RAG PDF chatbot with 2-stage per-chunk grounding checks ensuring 0% hallucinations',
        'Sarvam AI to Ollama fallback cascade, eliminating OpenAI dependencies and costs',
        '389-test PyTorch offline suite preventing regressions in validation and logic',
      ],
      stack: ['Python', 'FastAPI', 'LangGraph', 'Ollama', 'Sarvam AI'],
    },
    uiDeployment: {
      heading: 'Multi-Agent Orchestration via LangGraph & PostgreSQL',
      body: 'Orchestrated agents using LangGraph state-machines and PostgreSQL. Migrated from a 4-service Celery stack to in-process BackgroundTasks to meet strict WhatsApp delivery deadlines with minimal latency on Azure.',
      points: [
        'LangGraph state-machines for agentic orchestration',
        'PostgreSQL 16 + pgvector for persistent dedup and connection pooling',
        '100% pass rate maintained across 389 unit/integration tests',
        'Deployed via a single Azure Container App + Blob Storage',
      ],
      deployed: 'Azure Container App',
      stack: ['LangGraph', 'PostgreSQL', 'BackgroundTasks', 'Azure Blob'],
    },
    technologies: ['Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Sarvam AI', 'Ollama', 'Azure'],
    year: '2026',
    github: 'https://github.com/AkashKundu114/AI-SATHI',
    liveLink: 'https://purposiveai.com',
    features: [
      'Developed a Bengali voice assistant delivering real-time WhatsApp responses by orchestrating Sarvam AI and Ollama fallback cascades.',
      'Automated product catalog extraction, generating bank-submittable financial PDFs, by building a unified Python FastAPI voice-ledger pipeline.',
      'Eliminated mathematical hallucinations to 0%, ensuring strict vendor compliance, by integrating a 2-stage per-chunk grounding RAG chatbot.',
      'Prevented agent state data loss, achieving 100% test pass rates, by orchestrating LangGraph state-machines backed by PostgreSQL pgvector.',
      'Reduced latency to meet strict deadlines, managing 2,000 daily messages, by migrating to in-process FastAPI BackgroundTasks.',
    ],
    screenshots: [],
  },

  {
    id: 'copper-ai-assistant',
    title: 'COPPER - Local-First Personal AI OS',
    status: 'Completed',
    shortDesc:
      '100% offline, local-first personal AI OS - 30-agent orchestration, epistemic memory, Guardian safety engine & a molten-copper neural visualizer. FastAPI + React + Electron.',
    description:
      'Developed COPPER, a 100% offline, local-first personal AI OS utilizing <1.0 GB active system RAM. It orchestrates specialized models like Qwen2.5-Coder and DeepSeek-R1-Distill across 30 agents with a Guardian safety engine evaluating commands in 0.002ms.',
    problem:
      'Cloud AI assistants are unsuitable for developers working with sensitive codebases or in offline environments. There is no native desktop tool that combines local LLM inference, voice I/O, and system-level automation in a single low-latency package.',
    aiArchitecture: {
      heading: 'Offline agentic LLM orchestration across specialized foundation models',
      body: 'Architected an offline agentic system via LangCrew, orchestrating specialized models (Qwen2.5-Coder for synthesis, DeepSeek-R1-Distill for reasoning, Llama-3.2-1B for classification). Achieved 100% intent routing accuracy across 1,110 samples with 0.052ms latency (~18,950 QPS).',
      points: [
        '100% intent routing accuracy evaluated on a 1,360-sample combinatorial test suite',
        'Multi-model delegation (Qwen2.5-Coder-7B, DeepSeek-R1-Distill-7B, Llama-3.2-1B)',
        'Achieved sub-50ms TTFT inference on an 8GB VRAM constraint',
        'Dynamic Memory Cache & 3 confidence classes backed by SQLite & ChromaDB',
      ],
      stack: ['LangCrew', 'Ollama', 'ChromaDB', 'SQLite', 'DeepSeek-R1'],
    },
    uiDeployment: {
      heading: 'Electron React UI with Guardian Alignment safety framework',
      body: 'Delivered a persistent React desktop UI using Electron, consuming only ~260 MB RAM. Integrated a Guardian Alignment safety framework with 100% accuracy in threat detection, validating execution through a 213-sample pytest suite.',
      points: [
        'Guardian Safety Catch blocking destructive commands with 0.002 ms latency',
        'Network-sandboxed execution validated by a comprehensive 213-unit test suite',
        'Electron React desktop interface with integrated psutil telemetry dashboard',
      ],
      deployed: 'Native desktop app via Electron',
      stack: ['Electron', 'React', 'FastAPI', 'TypeScript', 'Redis'],
    },
    technologies: [
      'Electron',
      'FastAPI',
      'React',
      'TypeScript',
      'LangCrew',
      'Ollama',
      'SQLite',
      'ChromaDB',
      'Redis',
    ],
    year: '2026',
    github: 'https://github.com/AkashKundu114/COPPER',
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
    title: 'OphthalmoAI',
    status: 'Completed',
    shortDesc:
      'Meta-Classifier Ensemble classifying 12 eye diseases with 99.72% accuracy on 5,663 images, trained via GPU-accelerated Mixed Precision.',
    description:
      'Engineered OphthalmoAI, a Point-of-Care Retinal Screening Platform that achieved 99.72% Diagnostic Screening Accuracy across 12 distinct ocular disease categories by fusing three SOTA vision backbones (ConvNeXt, DenseNet, EfficientNet-V2).',
    problem:
      'Ophthalmologic diagnosis requires expensive specialists and equipment, creating access barriers in underserved regions. There was no lightweight, explainable tool for pre-screening patients that could generate actionable clinical documentation.',
    aiArchitecture: {
      heading: 'Meta-Classifier Ensemble Fusion with PyTorch Mixed Precision',
      body: 'Concatenated output logits from ConvNeXt-Small, DenseNet-201, and EfficientNet-V2-M into a dense fusion head. Scaled training throughput by 23x using GPU batch size optimization and FP16/BF16 Mixed Precision, lowering epoch times to 20.6s on 8GB VRAM.',
      points: [
        '99.72% screening accuracy achieved across 5,663 clinical images (12 diseases)',
        'Fused ConvNeXt-Small, DenseNet-201, and EfficientNet-V2-M into a Meta-Classifier',
        '23x training speedup via Dockerized PyTorch FP16/BF16 Mixed Precision',
        'Eliminated single-model blind spots with < 1.2 GB VRAM Meta-Classifier overhead',
      ],
      stack: ['PyTorch', 'Docker', 'ConvNeXt', 'EfficientNet-V2', 'DenseNet'],
    },
    uiDeployment: {
      heading: 'Production FastAPI REST endpoints and automated Grad-CAM PDF pipelines',
      body: 'Shipped production-ready FastAPI REST endpoints backed by rigorous testing. Scripted an end-to-end Grad-CAM PDF reporting pipeline from the Linux CLI and managed database schemas via Alembic migrations.',
      points: [
        'Automated Grad-CAM PDF reporting pipeline scripted end-to-end from Linux CLI',
        '3 production FastAPI REST endpoints backed by a robust 66-test suite',
        'Alembic database schema migrations verified through clean upgrade/downgrade cycles',
      ],
      deployed: 'Production REST API via FastAPI & Docker',
      stack: ['FastAPI', 'Linux CLI', 'Alembic'],
    },
    technologies: ['Python', 'FastAPI', 'PyTorch', 'OpenCV', 'Docker', 'Kubernetes', 'Linux CLI'],
    year: '2026',
    github: 'https://github.com/AkashKundu114/OphthalmoAI',
    liveLink: null,
    features: [
      'Achieved 99.72% diagnostic screening accuracy across 12 distinct ocular diseases by fusing ConvNeXt, DenseNet, and EfficientNet-V2 backbones.',
      'Scaled model training throughput by 23x and lowered epoch times to 20.6s by optimizing PyTorch mixed precision on GPU.',
      'Automated diagnostic reporting pipelines, reducing manual review time by 40%, by scripting end-to-end Grad-CAM PDF generation.',
      'Deployed production-ready machine learning services, handling continuous diagnostic requests, by building robust FastAPI REST endpoints backed by Alembic migrations.',
      'Eliminated single-model blind spots, maintaining <1.2 GB VRAM overhead, by engineering a dense PyTorch Meta-Classifier Fusion head.',
    ],
    screenshots: [],
  },
  {
    id: 'ai-hardware-benchmark',
    title: 'AI Hardware Benchmark Engine',
    status: 'Completed',
    shortDesc:
      'Full-stack ML app predicting hardware performance across 3 heavy AI workloads using CatBoost, custom scrapers, and a FastAPI serving layer.',
    description:
      'Constructed an AI hardware performance prediction engine as measured by reliable benchmark estimations across 3 heavy workloads, by utilizing custom web scrapers, a CatBoost regression model, and a FastAPI serving layer.',
    problem:
      'Hardware upgrade decisions for AI workloads require either expensive benchmarking rigs or unreliable anecdotal comparisons. There is no accessible tool that predicts multi-workload performance from a hardware spec sheet.',
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
      deployed: 'FastAPI server - local development, planned Railway/Render deployment',
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
    shortDesc:
      'Real-time chat supporting 50+ concurrent users with 256-bit end-to-end encryption, JWT auth, and sub-100ms WebSocket message delivery.',
    description:
      'Developed a real-time, privacy-first chat application as measured by supporting 50+ concurrent users with sub-100ms message delivery, by implementing a Node.js WebSocket engine and 256-bit AES end-to-end encryption.',
    problem:
      'Cloud chat platforms store messages in plaintext on their servers. Small teams handling sensitive discussions need a self-hostable alternative where messages are encrypted end-to-end and never readable by the server.',
    aiArchitecture: {
      heading: 'Node.js WebSocket engine with 256-bit E2EE and JWT authentication',
      body: 'The backend is a Node.js WebSocket server implementing a publish-subscribe model for real-time message routing. 256-bit AES end-to-end encryption ensures messages are encrypted client-side before transmission - the server handles routing without ever accessing plaintext.',
      points: [
        'Node.js WebSocket server supporting 50+ concurrent users across 10+ named rooms',
        '256-bit AES end-to-end encryption - messages encrypted client-side, server sees only ciphertext',
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
        'React frontend with real-time message rendering - zero page refreshes',
        'Instant room switching with persistent unread message counters',
        'Responsive layout with desktop sidebar and mobile bottom-nav adaptations',
        'Graceful WebSocket reconnection with state recovery on network interruption',
        'Typing indicators and real-time online presence status per room',
      ],
      deployed: 'Self-hosted Node.js server - deployable on any VPS or local network',
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
    title: 'AkashKundu114.github.io (Portfolio)',
    status: 'Completed',
    shortDesc:
      'Full-stack headless CMS powering this portfolio - protected admin panel, dynamic CRUD, FastAPI contact API, and PWA with GitHub Actions CI/CD.',
    description:
      'Architected a full-stack portfolio content management system as measured by automated GitHub Actions CI/CD deployments and dynamic content rendering, by developing a React PWA, a DataContext abstraction layer, and a FastAPI contact microservice.',
    problem:
      'Static portfolio sites require a full code deployment to update a single project description. Content management should be decoupled from the codebase entirely.',
    aiArchitecture: {
      heading: 'DataContext abstraction layer - localStorage today, API tomorrow',
      body: 'The DataContext layer acts as the single source of truth for all portfolio content. Currently backed by localStorage for zero-config persistence, it is architected to swap in a REST API with one change - making the entire site genuinely backend-ready without touching any component.',
      points: [
        'DataContext abstraction decoupling every component from the storage implementation',
        'Fuse.js fuzzy search across all projects - tolerates typos and partial matches',
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
        'PWA conversion - Workbox service worker caches assets and Google Fonts offline',
        'GitHub Actions CI/CD pipeline deploying to GitHub Pages with injected environment secrets',
        'JSON-LD Person schema + full Open Graph meta for ATS and SEO optimisation',
      ],
      deployed: 'GitHub Pages (akashkundu.me) via GitHub Actions',
      stack: ['Vite PWA', 'Workbox', 'GitHub Actions', 'Framer Motion', 'FastAPI'],
    },
    technologies: [
      'React',
      'FastAPI',
      'Python',
      'Vite PWA',
      'Framer Motion',
      'Fuse.js',
      'GitHub Actions',
    ],
    year: '2025',
    github: 'https://github.com/AkashKundu114/AkashKundu114.github.io',
    liveLink: 'https://akashkundu.me',
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
