/**
 * PROJECTS DATA
 * Each project has two structured case-study sections for the detail page:
 *   aiArchitecture  → "The Data & AI Architecture"
 *   uiDeployment    → "The User Interface & Deployment"
 */
export const projects = [
  {
    id: 'copper-ai-assistant',
    title: '"Copper" — Personal AI Assistant',
    shortDesc:
      'A fully offline, privacy-first desktop AI assistant with custom LLM, voice I/O, and smart task management.',
    description:
      'Most productivity tools are either cloud-dependent or too generic to be truly useful. Copper was built to solve that: a private, personalized AI assistant that runs entirely on your machine, understands your workflow, and adapts to your needs. It combines a fine-tuned local language model with a voice-controlled interface, persistent conversation memory, and an intelligent reminder system — all wrapped in a custom dark-themed desktop GUI.',
    problem:
      'Cloud-based AI assistants compromise privacy and require constant internet access. Users with domain-specific workflows have no way to customize the model\'s behavior without sharing proprietary data with third-party servers.',
    aiArchitecture: {
      heading: 'Custom fine-tuned LLM with context-aware NLP pipeline',
      body: 'The core intelligence is a locally deployed Large Language Model fine-tuned with LoRA adapters via Ollama, trained on domain-specific prompt-response pairs to specialize its behavior. A custom NLP pipeline handles intent classification, entity extraction for reminder parsing, and multi-turn conversation context management using a rolling memory buffer.',
      points: [
        'LoRA fine-tuning pipeline on a base LLM for domain-specific Q&A adaptation',
        'Speech-to-Text (STT) pipeline using Whisper for low-latency voice input',
        'Text-to-Speech (TTS) engine for natural voice output responses',
        'Rolling conversation context window with semantic compression for long sessions',
        'Intent classifier for routing queries between chat, reminders, and task management',
      ],
      stack: ['Python', 'Ollama', 'LoRA Fine-Tuning', 'Whisper STT', 'NLP', 'TTS'],
    },
    uiDeployment: {
      heading: 'Interactive dark-themed desktop application with voice controls',
      body: 'The interface was built from scratch as a native desktop application, prioritizing a frictionless user experience. The dark-themed GUI features a real-time chat view, voice-activation controls, a visual reminder timeline, and full conversation search — all without any web browser dependency.',
      points: [
        'Custom native desktop GUI with a real-time streaming chat view',
        'Visual reminder timeline with natural language scheduling ("remind me tomorrow at 3")',
        'Full conversation history with semantic search across past sessions',
        'Voice-activation toggle for hands-free workflow integration',
        'Zero external network calls — 100% local inference for data privacy',
      ],
      deployed: 'Local desktop application — Windows / macOS / Linux',
      stack: ['Python', 'Custom GUI Framework', 'Voice API', 'SQLite'],
    },
    technologies: ['Python', 'LLM', 'LoRA Fine-Tuning', 'NLP', 'TTS', 'Whisper', 'Ollama'],
    year: '2024',
    github: null,
    liveLink: null,
    features: [
      'Fully offline local LLM inference — no data sent to external servers',
      'LoRA fine-tuning pipeline for domain-specific model behavior',
      'Voice input (Whisper STT) and voice output (TTS) pipeline',
      'Smart reminder parsing with natural language time expressions',
      'Persistent, searchable conversation history with rolling context memory',
    ],
    screenshots: [],
  },

  {
    id: 'eye-disease-predictor',
    title: 'AI-Based Eye Disease Predictor',
    shortDesc:
      'Deep learning system that classifies 7 eye diseases from retinal images with Grad-CAM visual explanations and automated clinical reports.',
    description:
      'Early detection of eye diseases like glaucoma, diabetic retinopathy, and cataracts dramatically improves treatment outcomes — but specialist diagnosis is expensive and inaccessible in many regions. This system brings CNN-based diagnostic capability to any device with a camera, classifying 7 distinct conditions from outer retinal photographs and explaining its reasoning through Grad-CAM heat-map overlays.',
    problem:
      'Ophthalmologic diagnosis requires expensive specialists and equipment, making early detection inaccessible for underserved populations. There was no lightweight, explainable tool that could pre-screen patients and generate actionable clinical reports.',
    aiArchitecture: {
      heading: 'Transfer learning CNN with Grad-CAM explainability',
      body: 'The model uses a pre-trained deep convolutional neural network (VGG/ResNet backbone) fine-tuned on a custom dataset of 5,000+ labelled retinal images across 7 disease classes. Grad-CAM (Gradient-weighted Class Activation Mapping) generates pixel-level heat-maps that highlight the exact retinal regions the model identified as clinically significant — making the predictions interpretable to medical professionals.',
      points: [
        'Transfer learning on VGG/ResNet backbone, fine-tuned on 5,000+ labelled retinal images',
        'Classified 7 eye conditions: glaucoma, diabetic retinopathy, cataracts, and 4 others',
        'Grad-CAM gradient visualization pipeline highlighting diagnostically relevant regions',
        'Data augmentation pipeline (rotation, flipping, brightness) to prevent overfitting',
        'Softmax confidence scores with threshold-based uncertainty flagging',
      ],
      stack: ['Python', 'TensorFlow', 'Keras', 'Grad-CAM', 'Deep Learning', 'OpenCV'],
    },
    uiDeployment: {
      heading: 'Clinical-grade prediction UI with automated PDF report generation',
      body: 'The interface allows clinicians or patients to upload a retinal photograph and receive a full diagnostic report within seconds. The output includes the predicted condition, confidence score, the Grad-CAM heat-map overlay, and a structured PDF report ready for clinical documentation.',
      points: [
        'Single-click image upload interface with real-time preview and validation',
        'Side-by-side display of original image and Grad-CAM heat-map overlay',
        'Automated PDF report generation with prediction, confidence, and annotated image',
        'Batch processing mode for screening multiple patients sequentially',
        'Results exported in structured format compatible with medical records',
      ],
      deployed: 'Local Python application with planned FastAPI backend for web deployment',
      stack: ['Python', 'TensorFlow', 'OpenCV', 'ReportLab (PDF)', 'Tkinter / CLI'],
    },
    technologies: ['Python', 'TensorFlow', 'Grad-CAM', 'Deep Learning', 'OpenCV', 'Transfer Learning'],
    year: '2024',
    github: null,
    liveLink: null,
    features: [
      'Classifies 7 distinct eye diseases with transfer learning fine-tuning',
      'Trained on 5,000+ labelled retinal photographs with augmentation pipeline',
      'Grad-CAM heat-map overlays for clinical interpretability and trust',
      'Automated PDF diagnostic report generation per patient',
      'Uncertainty flagging when model confidence falls below threshold',
    ],
    screenshots: [],
  },

  {
    id: 'stock-prediction',
    title: 'Automated Stock Prediction System',
    shortDesc:
      'End-to-end ML pipeline consuming live financial APIs, served through a high-performance backend with interactive Tableau dashboards.',
    description:
      'Retail investors are overwhelmed by raw market data and lack accessible predictive tools. This system engineers a full prediction pipeline — from ingesting live financial data via APIs, through a machine learning model, to an interactive Tableau dashboard — transforming complex market signals into clear, actionable insights delivered daily via automated PDF reports.',
    problem:
      'Retail investors lack the engineering infrastructure to build and run predictive models against live market data. Existing tools are either too expensive, too technical, or present data without interpretable insights.',
    aiArchitecture: {
      heading: 'Multi-model ML pipeline with live financial data ingestion',
      body: 'The prediction engine combines a regression model for short-term price forecasting with an ARIMA/LSTM time-series model for trend projection. Live data is ingested from financial APIs (Yahoo Finance / Alpha Vantage), preprocessed with Pandas, and fed through a feature engineering pipeline that computes technical indicators (RSI, MACD, Bollinger Bands) as model inputs.',
      points: [
        'Dual-model architecture: regression for price prediction + LSTM for trend forecasting',
        'Feature engineering pipeline computing RSI, MACD, Bollinger Bands, and volume metrics',
        'Live financial data ingestion via Yahoo Finance / Alpha Vantage APIs',
        'Automated daily model retraining on fresh data to prevent model drift',
        'Backtesting framework to evaluate prediction accuracy against historical periods',
      ],
      stack: ['Python', 'Scikit-learn', 'LSTM / Keras', 'Pandas', 'NumPy', 'Financial APIs'],
    },
    uiDeployment: {
      heading: 'Tableau dashboards and automated daily PDF reporting',
      body: 'The outputs are presented through two channels: interactive Tableau dashboards with drill-down visualizations for exploratory analysis, and automated PDF reports generated daily and distributed on a schedule, giving non-technical stakeholders clear, formatted summaries without needing to open the dashboard.',
      points: [
        'Interactive Tableau dashboard with candlestick charts, indicator overlays, and signal alerts',
        'Drill-down views per stock, sector, and time horizon',
        'Automated daily PDF report with predictions, confidence intervals, and trend summaries',
        'Email/schedule-based report distribution pipeline',
        'Alert system flagging stocks with high-confidence directional signals',
      ],
      deployed: 'Python scheduler (APScheduler) for daily automation, Tableau Public for dashboards',
      stack: ['Tableau', 'Python', 'ReportLab', 'APScheduler', 'Matplotlib'],
    },
    technologies: ['Python', 'Machine Learning', 'LSTM', 'Financial APIs', 'Tableau', 'Pandas', 'Scikit-learn'],
    year: '2024',
    github: null,
    liveLink: null,
    features: [
      'Regression + LSTM dual-model architecture for price and trend prediction',
      'Live financial API ingestion with automated daily retraining pipeline',
      'Technical indicator feature engineering (RSI, MACD, Bollinger Bands)',
      'Interactive Tableau dashboards with drill-down and signal overlays',
      'Automated daily PDF report generation and distribution pipeline',
    ],
    screenshots: [],
  },

  {
    id: 'multi-user-chat',
    title: 'Multi-User Chat Application',
    shortDesc:
      'Self-hosted real-time chat over WebSockets with multiple rooms, secure authentication, and sub-100ms message delivery.',
    description:
      'Small teams and friend groups needed a lightweight, self-hostable alternative to bloated chat platforms. This application delivers real-time multi-room messaging with secure session authentication over Java WebSockets, achieving sub-100ms message delivery latency under concurrent load with a fully responsive cross-device UI.',
    problem:
      'Existing chat solutions are either too complex to self-host, require cloud subscriptions, or lack the simplicity needed for small groups who just want fast, private messaging without data being stored on third-party servers.',
    aiArchitecture: {
      heading: 'Event-driven WebSocket architecture with intelligent message routing',
      body: 'The backend uses a Java WebSocket server with a publish-subscribe event model for real-time message routing. Each chat room maintains its own message queue and participant registry, with the server handling connection lifecycle, authentication token validation, and concurrent broadcast operations.',
      points: [
        'Java WebSocket server with event-driven publish-subscribe message routing',
        'Per-room participant registry and message queue management',
        'Session-based authentication with token validation on every WebSocket frame',
        'Concurrent broadcast handling with thread-safe room state management',
        'Persistent message history stored in relational database with efficient pagination',
      ],
      stack: ['Java', 'WebSocket API', 'Spring Boot', 'SQL', 'Session Management'],
    },
    uiDeployment: {
      heading: 'Responsive real-time frontend with instant room switching',
      body: 'The frontend delivers a smooth, chat-application feel with instant room switching, real-time message rendering without page refresh, and a fully responsive layout optimized for both desktop and mobile. Connection state is managed gracefully with automatic reconnection on network interruption.',
      points: [
        'Real-time message rendering via WebSocket event listeners — zero page refreshes',
        'Instant room switching with persistent unread message counts',
        'Responsive layout with distinct desktop sidebar and mobile bottom-nav views',
        'Graceful connection handling — automatic reconnection with state recovery',
        'Typing indicator and online presence status for each room',
      ],
      deployed: 'Self-hosted Java server — deployable on any VPS or local network',
      stack: ['JavaScript', 'HTML5', 'CSS3', 'WebSocket Client API'],
    },
    technologies: ['Java', 'WebSocket', 'Spring Boot', 'JavaScript', 'CSS3', 'SQL'],
    year: '2023',
    github: null,
    liveLink: null,
    features: [
      'Event-driven Java WebSocket server with sub-100ms message delivery',
      'Multiple named chat rooms with real-time participant presence',
      'Secure session-based authentication with per-frame token validation',
      'Responsive UI optimized for desktop and mobile with instant room switching',
      'Persistent message history with efficient pagination',
    ],
    screenshots: [],
  },

  {
    id: 'fine-tuned-llm',
    title: 'Fine-Tuned Local LLM Deployment',
    shortDesc:
      'Privacy-first offline LLM with custom LoRA fine-tuning, domain-specific Q&A optimization, and zero cloud dependency.',
    description:
      'Cloud AI services are powerful but fundamentally incompatible with sensitive use cases — every prompt you send is processed on someone else\'s server. This project demonstrates the complete pipeline for fine-tuning, evaluating, and deploying a local LLM: from dataset curation and LoRA adapter training, through quantization for efficient inference, to a clean API interface that integrates with productivity workflows — all with zero data egress.',
    problem:
      'Organizations and individuals with sensitive data cannot safely use cloud AI services due to privacy constraints. There was no accessible, end-to-end guide demonstrating offline LLM deployment with real performance optimization.',
    aiArchitecture: {
      heading: 'LoRA fine-tuning pipeline with quantization-aware inference',
      body: 'The pipeline begins with curated domain-specific instruction-following datasets. LoRA (Low-Rank Adaptation) adapters are trained on top of a frozen base model, requiring a fraction of the compute needed for full fine-tuning. The fine-tuned model is then quantized (4-bit GGUF format) using llama.cpp for CPU-efficient inference, then served via Ollama for clean API access.',
      points: [
        'LoRA adapter training pipeline with configurable rank and target modules',
        'Custom instruction-tuning dataset curation for domain-specific behavior',
        '4-bit GGUF quantization via llama.cpp for memory-efficient CPU inference',
        'Ollama model serving layer for clean OpenAI-compatible API access',
        'Evaluation benchmarking against base model on domain-specific test prompts',
      ],
      stack: ['Python', 'LoRA / PEFT', 'llama.cpp', 'Ollama', 'Hugging Face Transformers'],
    },
    uiDeployment: {
      heading: 'OpenAI-compatible API with productivity workflow integrations',
      body: 'The deployed model exposes an OpenAI-compatible REST API via Ollama, enabling drop-in replacement for cloud LLM calls in any existing integration. A lightweight CLI and Python SDK wrapper demonstrate integration into productivity scripts, code generation workflows, and document summarization pipelines.',
      points: [
        'OpenAI-compatible REST API endpoint for seamless drop-in integration',
        'Python SDK wrapper with streaming support for real-time text generation',
        'CLI interface for interactive local chat and batch prompt processing',
        'Integration examples: code review assistant, document summarizer, Q&A over local files',
        'Complete offline operation — no API keys, no usage limits, no privacy tradeoffs',
      ],
      deployed: 'Local inference server via Ollama — runs on consumer hardware (8GB RAM minimum)',
      stack: ['Ollama', 'Python', 'REST API', 'CLI', 'GGUF Format'],
    },
    technologies: ['Python', 'LLM', 'LoRA Fine-Tuning', 'Ollama', 'NLP', 'llama.cpp', 'Hugging Face'],
    year: '2024',
    github: null,
    liveLink: null,
    features: [
      'End-to-end LoRA fine-tuning pipeline from dataset curation to deployment',
      '4-bit GGUF quantization for efficient CPU inference on consumer hardware',
      'OpenAI-compatible REST API via Ollama for drop-in cloud replacement',
      'Zero data egress — 100% offline, privacy-first architecture',
      'Benchmarked against base model with measurable domain accuracy improvement',
    ],
    screenshots: [],
  },

  {
    id: 'portfolio-cms',
    title: 'Portfolio CMS & Admin Dashboard',
    shortDesc:
      'Full-stack headless CMS with a protected admin panel, dynamic content management, and a FastAPI backend with rate-limited contact API.',
    description:
      'Rather than hardcoding portfolio content in static files, this infrastructure demonstrates production-grade full-stack thinking: a secured admin panel for dynamic CRUD operations, a DataContext layer abstracting local storage from a real backend, a FastAPI microservice with rate limiting and SMTP email, and a PWA conversion with service worker caching — all deployed via GitHub Actions CI/CD.',
    problem:
      'Static portfolio sites cannot be updated without a code deployment. Content management required a developer workflow even for simple changes like adding a new project, certificate, or updating descriptions.',
    aiArchitecture: {
      heading: 'Headless CMS architecture with DataContext abstraction layer',
      body: 'The DataContext layer acts as a clean abstraction between the UI and the data source. Currently backed by localStorage for instant persistence without a backend, it is architected to swap in a real API with a single change — making it genuinely production-ready. All CRUD operations flow through this context, keeping every component decoupled from the storage implementation.',
      points: [
        'DataContext abstraction layer decoupling UI from storage implementation',
        'localStorage-backed persistence with identical interface to a REST API',
        'Optimistic UI updates — changes reflected instantly without loading states',
        'JSON export functionality for data backup and backend seeding',
        'Designed for hot-swap to FastAPI / Spring Boot backend without component changes',
      ],
      stack: ['React Context API', 'localStorage', 'JSON', 'FastAPI (backend-ready)'],
    },
    uiDeployment: {
      heading: 'Secured admin panel, PWA conversion, and GitHub Actions CI/CD',
      body: 'The admin panel sits behind a password gate with session-based authentication, providing a clean CRUD interface for projects and certificates with modal forms, a data export tool, and environment configuration guidance. The portfolio itself is converted to a PWA with Workbox service worker caching, and deployed automatically on every git push via GitHub Actions.',
      points: [
        'Password-gated admin panel at /#/admin with session-based authentication',
        'Full CRUD interface for projects and certificates with validation and modals',
        'FastAPI contact microservice with rate limiting (5 req/min), input sanitization, and SMTP',
        'PWA conversion with Workbox service worker caching fonts and static assets',
        'GitHub Actions CI/CD pipeline deploying to GitHub Pages on every push to main',
      ],
      deployed: 'GitHub Pages (frontend) + Railway/Render (FastAPI backend)',
      stack: ['Vite PWA', 'Workbox', 'GitHub Actions', 'FastAPI', 'Framer Motion'],
    },
    technologies: ['React', 'FastAPI', 'Python', 'Vite PWA', 'Framer Motion', 'Fuse.js', 'GitHub Actions'],
    year: '2025',
    github: null,
    liveLink: 'https://akashkundu.me',
    features: [
      'DataContext abstraction layer ready to swap localStorage for a real backend',
      'Secured admin panel with full CRUD for projects and certificates',
      'FastAPI contact microservice with IP rate limiting and SMTP email delivery',
      'PWA with Workbox service worker — installable and offline-capable',
      'GitHub Actions CI/CD with environment secrets for automated deployment',
    ],
    screenshots: [],
  },
]
