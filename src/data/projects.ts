export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface ProjectArchitecture {
  heading: string;
  body: string;
  points: string[];
  stack: string[];
}

export interface ProjectDeployment {
  heading: string;
  body: string;
  points: string[];
  deployed: string;
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  status: string;
  shortDesc: string;
  description: string;
  problem: string;
  aiArchitecture: ProjectArchitecture;
  uiDeployment: ProjectDeployment;
  technologies: string[];
  year: string;
  github: string | null;
  liveLink: string | null;
  features: string[];
  screenshots: ProjectScreenshot[];
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
    screenshots: [
      {
        src: '/projects/ai-sathi-architecture.svg',
        caption: 'Voice-Ledger Pipeline: Sarvam AI + Ollama cascade, LangGraph state-machine, PostgreSQL pgvector RAG, and Azure Container deployment',
      },
    ],
  },

  {
    id: 'copper-ai-assistant',
    title: 'C.O.P.P.E.R. - Local-First Personal AI OS',
    status: 'Completed',
    shortDesc:
      '100% offline personal AI OS featuring 12 specialized agent types (+5 roadmap targets), TFP cascade routing (<0.10ms, ~9,856 QPS), DFM-Guard safety, and an Electron desktop UI. Zero cloud egress.',
    description:
      'Architected C.O.P.P.E.R. (Centralized Omnifunctional Personal Productivity and Execution Routine), an independent, 100% offline personal AI OS running on local consumer hardware. Powered by a 14B Sovereign Core fleet across 12 specialized agent types (+5 roadmap targets), it achieves ~9,856 QPS dispatch with <0.10ms latency, 100% Guardian threat intercept across 350 adversarial test cases, and 614 passing automated tests (573 Pytest backend + 41 Vitest frontend).',
    problem:
      'Cloud AI assistants introduce recurring subscription costs, API rate limits, and severe privacy risks through telemetry surveillance and prompt data leakage. Developers lack a low-latency offline desktop environment combining multi-agent orchestration, native system automation, and strict safety guardrails.',
    aiArchitecture: {
      heading: 'TFP Cascade Router (<0.10ms, ~9,856 QPS) & 14B Sovereign Core Fleet',
      body: 'Orchestrates an independent 12-agent hierarchy (+5 architectural roadmap targets) anchored on 14B Sovereign Core local models (Qwen2.5-14B, Qwen2.5-Coder-14B, DeepSeek-R1-Distill-14B, phi-4-14B, Mistral-Nemo-12B). Implemented the Topological Failure-Predicting (TFP) cascade router with dynamic exemplar memory cache, achieving 97.77% precision and 98.78% weighted F1 across 1,390 benchmark tests at ~9,856 QPS Stage 0/1 dispatch with zero GPU blocking overhead on consumer 8 GB VRAM hardware.',
      points: [
        '97.77% routing precision and 98.78% weighted F1 over 1,390 combinatorial benchmark cases',
        'Sub-millisecond routing (<0.10ms cache dispatch at ~9,856 QPS, ~2,050 QPS full combinatorial)',
        'Multi-agent delegation across 12 specialized agent types with pinned 1.5B reflex router + LRU 14B pager',
        'UMF-EDR & PW-EBR Bayesian epistemic memory engine with dynamic decay and reinforcement',
      ],
      stack: ['FastAPI', 'Python', 'Ollama', 'ChromaDB', 'SQLite', 'DeepSeek-R1', 'Whisper'],
    },
    uiDeployment: {
      heading: 'Electron React 19 Desktop App with DFM-Guard Friction Safety Engine',
      body: 'Built a persistent desktop UI using Electron and React 19, consuming <1.0 GB RAM. Integrated the DFM-Guard 4-tier friction protocol (Levels 0-3) intercepting destructive terminal commands with 100% sensitivity across 350 test cases, backed by 614 automated tests (573 backend Pytest + 41 frontend Vitest) and Playwright E2E suites.',
      points: [
        'DFM-Guard 4-tier friction protocol achieving 100% threat catch sensitivity across 350 adversarial triggers',
        'Forge Sandbox with Layer 1 AST static security analysis and Layer 2 OS process sandboxing',
        '614 passing automated tests (573 Pytest backend + 41 Vitest frontend) and Playwright E2E validation',
        'Zero-Trust Data Firewall scrubbing credentials, PII, and sensitive filesystem paths in-line',
      ],
      deployed: 'Native desktop application via Electron + React 19 | Proprietary Source-Available',
      stack: ['Electron', 'React 19', 'FastAPI', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    },
    technologies: [
      'Electron',
      'React',
      'FastAPI',
      'TypeScript',
      'Python',
      'Ollama',
      'ChromaDB',
      'SQLite',
      'Redis',
      'Pytest',
      'Vitest',
    ],
    year: '2026',
    github: 'https://github.com/AkashKundu114/COPPER',
    liveLink: null,
    features: [
      'Guaranteed zero cloud egress and 100% offline execution using local 14B Sovereign Core LLMs and Whisper Large v3 Turbo.',
      'Dispatched 12 specialized local agents at ~9,856 QPS with <0.10ms latency via the TFP topological cascade router.',
      'Intercepted 100% of destructive terminal commands across 350 test cases via the DFM-Guard 4-tier friction protocol.',
      'Engineered long-term Bayesian epistemic memory (Facts, Observations, Hypotheses) backed by SQLite WAL and ChromaDB.',
      'Shipped an Electron desktop app with live 17-node radial ganglia neural map and real-time GPU/CPU hardware telemetry.',
    ],
    screenshots: [
      {
        src: '/projects/copper-ai-os.svg',
        caption: 'C.O.P.P.E.R. Architecture: Molten neural visualizer, DFM-Guard safety engine (100% catch rate), 12-agent sovereign fleet, and epistemic memory',
      },
    ],
  },
  {
    id: 'eye-disease-predictor',
    title: 'OphthalmoAI - Retinal Disease Screening Platform',
    status: 'Completed',
    shortDesc:
      'Calibrated tri-backbone retinal screening platform achieving 85.18% test accuracy, 0.9818 Macro AUROC, 0.0381 ECE, optical domain guardrails, and ONNX Runtime Web edge screening.',
    description:
      'Engineered OphthalmoAI, a point-of-care retinal disease screening and clinical decision-support platform. Fuses a temperature-calibrated tri-backbone vision ensemble (DenseNet-201, ConvNeXt-Small, EfficientNet-V2-M) with Platt scaling (0.0381 ECE), deterministic optical aperture domain guardrails (OAC-DG), dedicated Grad-CAM explainability, and 2.15x accelerated ONNX serving, validated across 285 passing automated tests.',
    problem:
      'Preventable vision loss from Diabetic Retinopathy, Glaucoma, and AMD is compounded by severe clinical ophthalmologist shortages. Existing automated diagnostic models suffer from neural overconfidence, black-box unexplainability, and domain hallucination when fed non-fundus imagery.',
    aiArchitecture: {
      heading: 'Temperature-Calibrated Tri-Backbone Soft Ensemble (TC-MBE)',
      body: 'Concurrently executes DenseNet-201, ConvNeXt-Small, and EfficientNet-V2-M, applying post-hoc Platt temperature scaling (T ∈ [1.06, 1.34]) to normalize logits before soft-voting probability averaging. Achieved 85.18% empirical test accuracy, 0.9818 Macro AUROC, and 0.0381 Expected Calibration Error (ECE) across 938 strictly held-out clinical fundus images across 6 classes.',
      points: [
        '85.18% empirical test accuracy and 0.9818 Macro AUROC on 938 strictly held-out clinical images',
        '0.0381 Expected Calibration Error (ECE) eliminating overconfidence via Platt temperature scaling',
        'OAC-DG optical guardrail achieving 97.84% rejection on 2,500 negative stress scans with 0.00% FRR on clinical fundus scans',
        'PASG-GradCAM explainability engine calculating macula and optic disc biomarker energy fractions',
      ],
      stack: ['PyTorch', 'ONNX Runtime', 'DenseNet-201', 'ConvNeXt', 'EfficientNet-V2', 'OpenCV'],
    },
    uiDeployment: {
      heading: '84.2ms ONNX Serving, In-Browser Edge Telemedicine & Multi-Tenant RLS',
      body: 'Compiled model graphs to FP16 ONNX Runtime (84.2ms p50 latency, 2.15x speedup). Built a client-side ONNX Runtime Web WASM edge screening pipeline (<2MB quantized MobileNetV3-Small INT8, 9.03ms mean latency) with zero cloud data transmission, backed by 285 passing automated tests (262 Pytest + 23 Vitest).',
      points: [
        '84.2ms p50 inference latency (2.15x acceleration) via FP16 ONNX graph compilation',
        'Client-side in-browser edge screening via ONNX Runtime Web WASM (9.03ms mean latency)',
        '285 passing automated tests (262 backend Pytest + 23 frontend Vitest) covering guardrails, calibration, and edge inference',
        'External clinical validation: 91.30% DR sensitivity on IDRiD cohort and 100% safety escalation on RIM-ONE DL',
      ],
      deployed: 'Production REST API via FastAPI & Docker | Live on Vercel & Hugging Face',
      stack: ['FastAPI', 'React 19', 'PostgreSQL', 'Docker', 'ONNX Runtime Web', 'Vercel'],
    },
    technologies: ['Python', 'FastAPI', 'PyTorch', 'ONNX Runtime', 'React', 'PostgreSQL', 'Docker', 'OpenCV', 'Pytest'],
    year: '2026',
    github: 'https://github.com/AkashKundu114/OphthalmoAI',
    liveLink: 'https://ophthalmo-ai-mu.vercel.app/',
    features: [
      'Achieved 85.18% test accuracy and 0.9818 Macro AUROC across 6 retinal disease classes on 938 clinical images.',
      'Eliminated neural overconfidence, achieving 0.0381 ECE through post-hoc Platt temperature scaling.',
      'Rejected 97.84% of non-fundus stress images before GPU allocation with 0.00% False Rejection Rate on clinical scans.',
      'Shipped client-side ONNX Runtime Web WASM edge screening (<2MB, 9.03ms latency) with zero cloud egress.',
      'Validated across 285 automated tests with 91.30% external DR sensitivity on the IDRiD clinical cohort.',
    ],
    screenshots: [
      {
        src: '/projects/ophthalmoai-pipeline.svg',
        caption: 'OphthalmoAI Architecture: Calibrated tri-backbone ensemble, OAC-DG domain guardrail, Grad-CAM saliency, and ONNX serving',
      },
    ],
  },
  {
    id: 'icc-clustering',
    title: 'Inductive Consensus Clustering (ICC-v2)',
    status: 'Research / Completed',
    shortDesc:
      'Geometry-calibrated high-dimensional consensus clustering introducing VSSG feature gating, O(NL) bipartite anchor consensus, and closed-form inductive projection. Evaluated across 13 datasets with 76 passing pytest tests.',
    description:
      'Engineered Inductive Consensus Clustering (ICC-v2), a geometry-calibrated consensus clustering framework designed to overcome high-dimensional distractor noise (D >> N) and quadratic memory scaling. Couples linear unsupervised feature screening via Sarle\'s Bimodality Coefficient (VSSG) with an O(NL) bipartite co-association matrix and closed-form stability-weighted centroid assignment for out-of-sample projection. Evaluated across 13 datasets and 1,430 model executions, achieving Rank #1 on cancer genomics assays, backed by 76 passing pytest tests and a submitted IEEE TKDE publication manuscript.',
    problem:
      'Classical consensus clustering co-association matrices scale quadratically as O(N^2) in memory and runtime, rendering full spectral consensus intractable on large datasets with no closed-form inductive projection mechanism. Furthermore, high-dimensional ambient noise (D >> N) causes distance concentration that degrades base partitions into false stability traps.',
    aiArchitecture: {
      heading: 'VSSG Subspace Gating & Determinacy-Based Bipartite Anchor Consensus',
      body: 'Introduced Variable Subspace Screening Gating (VSSG), a linear O(N·D) unsupervised filter based on Sarle\'s Bimodality Coefficient that isolates informative multi-modal dimensions from unimodal background noise before base clustering. Formulated a rectangular bipartite co-association graph that reduces auxiliary memory from O(N^2) to O(NL) while preserving exact spectral cluster extraction, paired with an Anchor-Space Perturbation Profiler (ASPP) for interpretable multi-family stability diagnostics.',
      points: [
        'Linear O(N·D) unsupervised feature screening (VSSG) filtering unimodal distractor noise with 0.94-0.96 precision@50',
        'Rectangular O(NL) bipartite co-association graph reducing auxiliary memory by 39.1% over dense O(N^2) consensus at N=8,000',
        'Closed-form inductive out-of-sample query projection requiring only O(K·|F_active|) operations without graph re-clustering',
        'Anchor-Space Perturbation Profiler (ASPP) calculating Perturbation Sensitivity Index (PSI) in linear memory',
      ],
      stack: ['Python', 'NumPy', 'SciPy', 'Scikit-learn', 'PyTorch', 'Pytest', 'Ruff'],
    },
    uiDeployment: {
      heading: '13-Dataset Multi-Domain Benchmarking, Scalability to N=1,000,000 & IEEE Manuscript',
      body: 'Conducted an exhaustive empirical evaluation across 13 benchmark datasets (Sonar, Madelon, Colon, SRBCT, CNS, Leukemia, Prostate, Ovarian, 20 Newsgroups, Isolet, Indian Pines, Extended Yale B, Zheng68k scRNA-seq) and 11 baseline algorithms across 1,430 executions. Verified linear empirical scaling up to N=1,000,000 and D=100,000 with zero out-of-memory errors, with complete reproducibility scripts and IEEE TKDE/ICDE manuscript dossiers.',
      points: [
        'Rank #1 performance on ultra-high-dimensional biomedical cancer assays (D/N > 20, Leukemia ARI = 0.680 vs DEC 0.148, SRBCT ARI = 0.538)',
        '1,430 benchmark executions across 13 datasets and 11 baseline methods (Grand Mean ARI = 0.1599)',
        'Linear O(N) sample scaling verified up to N=1,000,000 points and D=100,000 dimensions',
        '76/76 automated unit/integration tests passing (100% pass rate) with PEP 517/621 packaging',
      ],
      deployed: 'Open-Source Python Package & Benchmark CLI | IEEE TKDE / ICDE Manuscript',
      stack: ['Python 3.11', 'Scikit-learn', 'SciPy', 'Pytest', 'Sphinx', 'IEEE LaTeX'],
    },
    technologies: ['Python', 'Scikit-learn', 'PyTorch', 'NumPy', 'SciPy', 'Machine Learning', 'Pytest'],
    year: '2026',
    github: 'https://github.com/AkashKundu114/icc-clustering',
    liveLink: null,
    features: [
      'Filtered high-dimensional distractor noise with 0.94-0.96 precision@50 up to D=5,000 via VSSG bimodality coefficient screening.',
      'Reduced auxiliary consensus memory from quadratic O(N^2) to linear bipartite O(NL), saving 39.1% RAM at N=8,000.',
      'Enabled instant inductive out-of-sample projection at O(K·|F_active|) operations per query without full ensemble re-clustering.',
      'Achieved Rank #1 cluster recovery on ultra-high-dimensional cancer microarrays (D/N > 20) including Leukemia and SRBCT.',
      'Maintained 100% test pass rate across 76 automated pytest tests with Grade A+ IEEE publication compliance.',
    ],
    screenshots: [
      {
        src: '/projects/icc-clustering-architecture.svg',
        caption: 'ICC-v2 Architecture: VSSG bimodality subspace gating, O(NL) bipartite anchor consensus graph, ASPP stability profiler, and inductive out-of-sample projection',
      },
    ],
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
    screenshots: [
      {
        src: '/projects/portfolio-cms.svg',
        caption: 'Portfolio Architecture: Headless DataContext, Workbox PWA offline caching, Fuse.js fuzzy index, and GitHub Actions automated deployment',
      },
    ],
  },
];

/**
 * Finds a project by its unique ID.
 */
export function getProjectById(id: string): Project | undefined {
  if (!id || typeof id !== 'string' || !id.trim()) return undefined;
  return projects.find((proj) => proj.id === id.trim());
}

/**
 * Filters projects matching a specific technology (case-insensitive).
 */
export function getProjectsByTechnology(tech: string): Project[] {
  if (!tech || typeof tech !== 'string' || !tech.trim()) return [];
  const target = tech.trim().toLowerCase();
  return projects.filter(
    (proj) =>
      Array.isArray(proj.technologies) &&
      proj.technologies.some((t) => t.toLowerCase() === target)
  );
}

/**
 * Searches projects across title, shortDesc, description, problem, and technologies.
 */
export function searchProjects(query: string): Project[] {
  if (!query || typeof query !== 'string' || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return projects.filter(
    (proj) =>
      proj.title.toLowerCase().includes(q) ||
      proj.shortDesc.toLowerCase().includes(q) ||
      proj.description.toLowerCase().includes(q) ||
      proj.problem.toLowerCase().includes(q) ||
      (Array.isArray(proj.technologies) &&
        proj.technologies.some((t) => t.toLowerCase().includes(q)))
  );
}

/**
 * Returns a deduplicated and sorted list of all technologies used across projects.
 */
export function getAllTechnologies(): string[] {
  const techSet = new Set<string>();
  projects.forEach((proj) => {
    if (Array.isArray(proj.technologies)) {
      proj.technologies.forEach((tech) => {
        if (tech && typeof tech === 'string' && tech.trim()) {
          techSet.add(tech.trim());
        }
      });
    }
  });
  return Array.from(techSet).sort();
}
