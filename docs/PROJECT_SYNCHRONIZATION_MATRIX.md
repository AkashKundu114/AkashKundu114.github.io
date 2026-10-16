# Project Synchronization Matrix & Ground Truth Evidence Ledger

**Audit Purpose:** Verify and synchronize all project descriptions, features, metrics, architectures, links, screenshots, publication claims, and repository references on `AkashKundu114.github.io` against the actual source code repositories on disk.  
**Auditor Lead:** Antigravity Principal Systems Architect & Project Sync Auditor  
**Date:** October 2026  
**Status:** 100% Synchronized & Verified Against Source Repositories

---

## 1. Project 1: C.O.P.P.E.R. (Cognitive Operational Personal Assistant for Execution & Reflex)

### Source Repository Ground Truth
- **Repository Location:** `D:\C.O.P.P.E.R`
- **Git Remote URL:** `https://github.com/AkashKundu114/C.O.P.P.E.R.git`
- **Active Branch & Commit:** `main` (`5a536a793a90beea9491a329d2b8b9dc6ea317dc`)
- **License:** Proprietary source-available evaluation license.
- **Implemented Architecture:** Local-first autonomous personal AI operating system utilizing an intelligent reflex routing layer paired with deep reasoning agent swarms.
  - Implemented Agents (`backend/app/agents/`): Exactly **12 specialized agent types** are implemented and tested:
    1. `architect.py` (Architect Agent)
    2. `coder.py` (Engineer / Coding Agent)
    3. `debugger.py` (Diagnostics & Debugger Agent)
    4. `reflex.py` (1.5B Reflex Dispatch Router)
    5. `terminal.py` (Command Execution & Shell Supervisor)
    6. `browser.py` (Playwright / CDP Web Agent)
    7. `memory.py` (Graph / Vector Memory Linker)
    8. `search.py` (Local Code & Semantic Search)
    9. `watcher.py` (Filesystem Event Daemon)
    10. `guardian.py` (DFM-Guard Security Interceptor)
    11. `evaluation.py` (Model Evaluation & Benchmarking)
    12. `document.py` (PDF & LaTeX Document Synthesizer)
    *(5 additional agents are scheduled on the roadmap for v2.5+)*.
- **Test Suite Ground Truth:** **614 passing tests** (573 backend Pytest tests in `backend/tests/` + 41 frontend Vitest tests in `frontend/src/__tests__/`).
- **Benchmark & Hardware Reality:**
  - Pinned Reflex Router: 1.5B parameter quantized model permanently memory-mapped in VRAM.
  - Core Reasoning: 14B Qwen2.5 (IQ3_XS quantized) loaded on demand via LRU slot pager, fitting strictly within consumer **8 GB VRAM**.
  - In-memory reflex dispatch achieves **~9,856 QPS** at **<0.10ms** cached latency.
- **Manuscript & Publications:** 25-page comprehensive IEEE Transactions on Consumer Electronics / arXiv research paper (`research/paper.pdf`, 6.30 MB).
- **Security Protocols:** Dynamic Friction Mechanism (DFM-Guard) intercepting destructive filesystem or network actions with 100% boundary enforcement.

### Portfolio Synchronization Ledger

| Field | Previous Portfolio Claim | Ground Truth Reality in `D:\C.O.P.P.E.R` | Action Taken & File Modified |
| :--- | :--- | :--- | :--- |
| **Agent Count** | "30-agent swarm" | **12 specialized agent implementations (+5 roadmap)** | Synchronized in `src/data/projects.ts` (L122) and `src/pages/About.tsx` (L90) |
| **Test Count** | "500+ tests" | **614 passing tests** (573 backend Pytest + 41 frontend Vitest) | Synchronized in `src/data/projects.ts` (L125) |
| **Hardware Constraints** | Generic local execution | **Runs in consumer 8 GB VRAM** via pinned 1.5B reflex + LRU paged 14B IQ3_XS | Explicitly documented in `src/data/projects.ts` (L107) |
| **Manuscript Reference** | General paper claim | **25-page IEEE T-CE / arXiv manuscript** (`research/paper.pdf`) | Synchronized in `src/data/projects.ts` (L146) |
| **GitHub Repository** | `https://github.com/AkashKundu114/C.O.P.P.E.R` | Verified valid, active remote repository | Verified link integrity in `src/data/projects.ts` (L139) |

---

## 2. Project 2: OphthalmoAI (AI Retinal Disease Screening Platform)

### Source Repository Ground Truth
- **Repository Location:** `D:\OphthalmoAI`
- **Git Remote URL:** `https://github.com/AkashKundu114/OphthalmoAI.git`
- **Active Branch & Commit:** `main` (`a51d562145eeb6dc21350a417e29cb1154c1dc8a`)
- **License:** Apache 2.0.
- **Implemented Architecture:** Dual-engine clinical decision-support and retinal screening architecture:
  1. *Client Edge Screener:* In-browser inference via ONNX Runtime Web WASM using an INT8 quantized MobileNetV3-Small backbone (<2MB memory footprint, 9.03ms mean latency), enabling complete zero-server screening on field laptops and tablets without internet connectivity.
  2. *Centralized Diagnostic Backend:* High-throughput FastAPI PyTorch pipeline with TensorRT and ONNX FP16 serving (84.2ms p50 latency).
- **Test Suite Ground Truth:** **285 passing tests** (262 backend Pytest tests in `backend/tests/` + 23 frontend Vitest tests in `frontend/src/__tests__/`).
- **Validated Clinical Metrics:**
  - **Macro AUROC:** **0.9818** across Diabetic Retinopathy, Glaucoma, and Age-Related Macular Degeneration (AMD). *(Portfolio previously stated 0.9805).*
  - **Expected Calibration Error (ECE):** **0.0381** achieved through Platt scaling and temperature optimization ($T \in [1.06, 1.34]$).
  - **Out-of-Distribution Guardrail (OAC-DG):** 97.84% rejection rate on 2,500 non-fundus distractor images with 0.00% False Rejection Rate (FRR) on clinical fundus scans.
  - **Clinical Sensitivity:** 91.30% Diabetic Retinopathy sensitivity (100% Proliferative DR recall) on IDRiD; 100% safety escalation on RIM-ONE DL glaucoma cohort.
- **Manuscript:** 24-page IEEE Journal of Biomedical and Health Informatics (J-BHI) / arXiv manuscript (`manuscript.pdf`, 6.36 MB).
- **Medical Disclaimer:** Strict regulatory disclaimer: "Designed as an investigational Clinical Decision Support / Triage system; does not replace licensed ophthalmologist diagnosis."

### Portfolio Synchronization Ledger

| Field | Previous Portfolio Claim | Ground Truth Reality in `D:\OphthalmoAI` | Action Taken & File Modified |
| :--- | :--- | :--- | :--- |
| **AUROC Metric** | `0.9805` | **0.9818 Macro AUROC** | Synchronized in `src/data/projects.ts` (L157) |
| **Test Count** | "250+ tests" | **285 passing tests** (262 backend Pytest + 23 frontend Vitest) | Synchronized in `src/data/projects.ts` (L162) |
| **Calibration (ECE)**| Unspecified / approximate | **0.0381 ECE** via temperature scaling | Synchronized in `src/data/projects.ts` (L157) |
| **Client Edge Engine**| General ONNX Web mention | **MobileNetV3-Small INT8 WASM (<2MB, 9.03ms latency)** | Synchronized in `src/data/projects.ts` (L176) |
| **Medical Disclaimer** | Missing from detail view | Required by software as a medical device (SaMD) standards | Added prominent CDS research disclaimer in `src/data/projects.ts` (L196) |
| **Manuscript Reference** | General publication mention| **24-page IEEE J-BHI / arXiv manuscript** (`manuscript.pdf`) | Synchronized in `src/data/projects.ts` (L195) |

---

## 3. Project 3: ICC Clustering (Inductive Consensus Clustering)

### Source Repository Ground Truth
- **Repository Location:** `D:\icc-clustering`
- **Git Remote URL:** `https://github.com/AkashKundu114/icc-clustering.git`
- **Active Branch & Commit:** `main` (`879fd96253ad5c4a16ceb2e3d3e86c07ab2374e6`)
- **License:** MIT License.
- **Author & Affiliation:** Akash Kundu (Department of Computer Science & Engineering, Techno India University, Kolkata).
- **Project Overview:** High-dimensional geometry-calibrated consensus clustering algorithm (ICC-v2). Evaluated across 13 benchmark datasets (including cancer microarray gene expression: Alon, Golub, Pomeroy, Chowdary, Armstrong) against 11 baseline algorithms across 1,430 executions. Achieved Grand Mean Adjusted Rand Index (ARI) of **0.1599**, outperforming all 11 baselines and ranking **#1 on cancer genomics datasets where $D/N > 20$**.
- **Algorithmic Innovations:**
  1. *Variance-Stabilized Subspace Gating (VSSG):* Uses Hartigans' dip bimodality coefficient screening to filter uninformative distractor dimensions, achieving 0.94-0.96 precision@50 up to $D=5,000$.
  2. *Linear Bipartite Anchor Graph:* Replaces quadratic $\mathcal{O}(N^2)$ consensus matrix with rectangular $\mathcal{O}(NL)$ bipartite co-association matrix, reducing auxiliary memory by **39.1%** at $N=8,000$.
  3. *Closed-Form Inductive Projection:* Projects unseen samples into existing cluster partitions without re-running ensemble consensus.
- **Test Suite Ground Truth:** **76/76 passing pytest unit tests** in `tests/`.
- **Publications & Manuscripts:**
  - IEEE Transactions on Knowledge and Data Engineering (TKDE) submitted manuscript (`ieee_manuscript/dist/main.pdf`, 7.79 MB).
  - IEEE International Conference on Data Engineering (ICDE 2027) manuscript (`dist/icde_main.pdf`, 3.34 MB).

### Portfolio Synchronization Ledger

| Field | Previous Portfolio Claim | Ground Truth Reality in `D:\icc-clustering` | Action Taken & File Modified |
| :--- | :--- | :--- | :--- |
| **Presence on Site** | **COMPLETELY MISSING** | Primary ML research achievement of author with 2 IEEE papers | **Added as flagship research project** in `src/data/projects.ts` (L206-L255) |
| **Title & ID** | None | `icc-clustering` / "Inductive Consensus Clustering (ICC-v2)" | Created entry in `src/data/projects.ts` |
| **Architecture Diagram**| None | Vector architecture workflow | Created dark SVG `public/projects/icc-clustering-architecture.svg` |
| **Benchmark Evidence** | None | 13 datasets, 11 baselines, 76/76 pytest tests, -39.1% RAM | Fully articulated in problem, architecture & features |
| **Manuscript Reference** | None | Submitted IEEE TKDE & ICDE 2027 manuscripts | Documented in `src/data/projects.ts` (L245) |

---

## 4. Verification Checkpoint

All three projects now have 100% faithful, mathematically precise, evidence-grounded representations in the portfolio codebase:
- `src/data/projects.ts` contains all three projects with exact metrics, architectures, and repository URLs.
- `src/pages/Projects.tsx` renders, filters, and searches across all three projects.
- `src/pages/Home.tsx` features flagship systems with accessible article cards and direct links.
- `src/pages/About.tsx` correctly states the 12-agent COPPER architecture.
