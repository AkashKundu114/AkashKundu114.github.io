# Project Synchronization Matrix & Ground Truth Evidence Ledger

**Audit Purpose:** Verify and synchronize all project descriptions, features, metrics, architectures, links, screenshots, publication claims, and repository references on `AkashKundu114.github.io` against the actual source code repositories on disk.  
**Auditor Lead:** Antigravity Principal Systems Architect & Project Sync Auditor  
**Date:** October 2026  
**Status:** 100% Synchronized & Verified Against Source Repositories

---

## 1. Project 1: C.O.P.P.E.R. (Cognitive Operational Personal Assistant for Execution & Reflex)

### Source Repository Ground Truth

- **Repository Location:** `./copper`
- **Git Remote URL:** `https://github.com/AkashKundu114/C.O.P.P.E.R.git`
- **Active Branch & Commit:** `main` (`5ed4f362dd9666e0214d5cb5f500b2f2805c7ab5`)
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
        _(5 additional agents are scheduled on the roadmap for v2.5+)_.
- **Test Suite Ground Truth:** **685 passing tests** (644 backend Pytest tests [608 root suite + 36 microservices suite] + 41 frontend Vitest tests in `frontend/src/__tests__/`).
- **Benchmark & Hardware Reality:**
  - Pinned Reflex Router: 1.5B parameter quantized model permanently memory-mapped in VRAM.
  - Core Reasoning: 14B Qwen2.5 (IQ3_XS quantized) loaded on demand via LRU slot pager, fitting strictly within consumer **8 GB VRAM**.
  - In-memory reflex dispatch achieves **~9,856 QPS** at **<0.10ms** cached latency.
- **Manuscript & Publications:** 25-page comprehensive IEEE Transactions on Consumer Electronics / arXiv research paper (`research/paper.pdf`, 6.30 MB).
- **Security Protocols:** Dynamic Friction Mechanism (DFM-Guard) intercepting destructive filesystem or network actions with 100% boundary enforcement across 350 test cases, AST Layer 1/2 sandboxing, and zero-egress fonts and telemetry.

### Portfolio Synchronization Ledger

| Field                    | Previous Portfolio Claim                       | Ground Truth Reality in `./copper`                                           | Action Taken & File Modified                                                       |
| :----------------------- | :--------------------------------------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Agent Count**          | "30-agent swarm"                               | **12 specialized agent implementations (+5 roadmap)**                        | Synchronized in `src/data/projects.ts` (L103) and `src/pages/About.tsx` (L77, L91) |
| **Test Count**           | "614 tests"                                    | **685 passing tests** (644 backend Pytest + 41 frontend Vitest)              | Synchronized in `src/data/projects.ts` (L98, L114, L118)                           |
| **Hardware Constraints** | Generic local execution                        | **Runs in consumer 8 GB VRAM** via pinned 1.5B reflex + LRU paged 14B IQ3_XS | Explicitly documented in `src/data/projects.ts` (L107)                             |
| **Commit Reference**     | `5a536a7`                                      | **`5ed4f36`** (Security reports, test ledgers, and sandbox stdin isolation)  | Updated ground truth in matrix ledger                                              |
| **Manuscript Reference** | General paper claim                            | **25-page IEEE T-CE / arXiv manuscript** (`research/paper.pdf`)              | Synchronized in `src/data/projects.ts` (L146)                                      |
| **GitHub Repository**    | `https://github.com/AkashKundu114/C.O.P.P.E.R` | Verified valid, active remote repository                                     | Verified link integrity in `src/data/projects.ts` (L138)                           |

---

## 2. Project 2: OphthalmoAI (AI Retinal Disease Screening Platform)

### Source Repository Ground Truth

- **Repository Location:** `./ophthalmoai`
- **Git Remote URL:** `https://github.com/AkashKundu114/OphthalmoAI.git`
- **Active Branch & Commit:** `main` (`2b86dd5c693d522831581d4bb3240446f7ab2208`)
- **License:** Apache 2.0.
- **Implemented Architecture:** Dual-engine clinical decision-support and retinal screening architecture:
  1. _Client Edge Screener:_ In-browser inference via ONNX Runtime Web WASM using an INT8 quantized MobileNetV3-Small backbone (<2MB memory footprint, 9.03ms mean latency), enabling complete zero-server screening on field laptops and tablets without internet connectivity.
  2. _Centralized Diagnostic Backend:_ High-throughput FastAPI PyTorch pipeline with TensorRT and ONNX FP16 serving (84.2ms p50 latency).
- **Test Suite Ground Truth:** **335 passing tests** (312 backend Pytest tests across 37 modules + 23 frontend Vitest tests in `frontend/src/__tests__/`).
- **Validated Clinical Metrics:**
  - **Macro AUROC:** **0.9818** across Diabetic Retinopathy, Glaucoma, and Age-Related Macular Degeneration (AMD).
  - **Expected Calibration Error (ECE):** **0.0381** achieved through Platt scaling and temperature optimization ($T \in [1.06, 1.34]$).
  - **Out-of-Distribution Guardrail (OAC-DG):** 97.84% rejection rate on 2,500 non-fundus distractor images with 0.00% False Rejection Rate (FRR) on clinical fundus scans.
  - **Clinical Sensitivity:** 91.30% Diabetic Retinopathy sensitivity (100% Proliferative DR recall) on IDRiD; 100% safety escalation on RIM-ONE DL glaucoma cohort.
- **Manuscript:** 24-page IEEE Journal of Biomedical and Health Informatics (J-BHI) / arXiv manuscript (`manuscript.pdf`, 6.36 MB).
- **Medical Disclaimer & Security:** Strict regulatory disclaimer: "Designed as an investigational Clinical Decision Support / Triage system; does not replace licensed ophthalmologist diagnosis. Not certified as Software as a Medical Device (SaMD) by FDA, CE, or CDSCO." Complete zero-egress HIPAA dataflow, 19 red-team adversarial tests passing, EXIF PHI stripping, and multi-tenant RLS isolation.

### Portfolio Synchronization Ledger

| Field                    | Previous Portfolio Claim    | Ground Truth Reality in `./ophthalmoai`                                           | Action Taken & File Modified                                             |
| :----------------------- | :-------------------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| **AUROC Metric**         | `0.9805`                    | **0.9818 Macro AUROC**                                                            | Synchronized in `src/data/projects.ts` (L159, L166)                      |
| **Test Count**           | "285 tests"                 | **335 passing tests** (312 backend Pytest + 23 frontend Vitest)                   | Synchronized in `src/data/projects.ts` (L161, L177, L181, L196)          |
| **Calibration (ECE)**    | Unspecified / approximate   | **0.0381 ECE** via temperature scaling                                            | Synchronized in `src/data/projects.ts` (L159, L166)                      |
| **Commit Reference**     | `a51d562`                   | **`2b86dd5`** (Live E2E verification and release test count update to 335 passed) | Updated ground truth in matrix ledger                                    |
| **Client Edge Engine**   | General ONNX Web mention    | **MobileNetV3-Small INT8 WASM (<2MB, 9.03ms latency)**                            | Synchronized in `src/data/projects.ts` (L177, L195)                      |
| **Medical Disclaimer**   | Missing from detail view    | SaMD Clinical Research & Policy notice added to project detail page               | Prominent disclaimer banner in `src/pages/ProjectDetail.tsx` (L412-L451) |
| **Manuscript Reference** | General publication mention | **24-page IEEE J-BHI / arXiv manuscript** (`manuscript.pdf`)                      | Synchronized in `src/data/projects.ts` (L195)                            |

---

## 3. Project 3: ICC Clustering (Inductive Consensus Clustering)

### Source Repository Ground Truth

- **Repository Location:** `Final Year Project` _(and `./icc-clustering`)_
- **Git Remote URL:** `https://github.com/AkashKundu114/icc-clustering.git`
- **Active Branch & Commit:** `fix/audit-remediation` (`1db855a89bf00ad0cd8f90d3c8df579d838b97f1`), upstream `main` (`879fd96253ad5c4a16ceb2e3d3e86c07ab2374e6`)
- **License:** MIT License.
- **Author & Affiliation:** Akash Kundu (Department of Computer Science & Engineering, Techno India University, Kolkata).
- **Project Overview:** High-dimensional geometry-calibrated consensus clustering algorithm (ICC-v2). Evaluated across 13 benchmark datasets (including cancer microarray gene expression: Alon, Golub, Pomeroy, Chowdary, Armstrong) against 11 baseline algorithms across 1,430 executions. Achieved Grand Mean Adjusted Rand Index (ARI) of **0.1599**, outperforming all 11 baselines and ranking **#1 on cancer genomics datasets where $D/N > 20$**.
- **Algorithmic Innovations & Efficiency Optimizations:**
  1. _Variance-Stabilized Subspace Gating (VSSG):_ Uses Hartigans' dip / Sarle's bimodality coefficient screening to filter distractor dimensions, achieving 0.94-0.96 precision@50 up to $D=5,000$. Memory-bounded column chunking slashes high-D peak RAM by **74.2%** (76.54 MB → 19.76 MB).
  2. _Linear Bipartite Anchor Graph:_ Replaces quadratic $\mathcal{O}(N^2)$ consensus matrix with rectangular $\mathcal{O}(NL)$ bipartite co-association matrix, reducing auxiliary memory by **39.1%** at $N=8,000$ and cutting standard $(N=1000, D=2000)$ memory by **50.0%**.
  3. _Exact Matrix Symmetry Exploitation:_ Evaluates off-diagonal co-association determinacy once with $2\times$ multiplication, cutting loop iterations by **47.5%** with $0.0$ numerical error.
  4. _Closed-Form Inductive Projection:_ Projects unseen samples into existing cluster partitions without re-running ensemble consensus, achieving **$2.61 \times 10^6\text{ samples/sec}$** streaming query throughput (+20.0%).
- **Test Suite Ground Truth:** **113 passing pytest unit/integration tests** across 12 test modules (100% pass rate; includes 33 adversarial input tests and 9 edge case tests).
- **Publications & Manuscripts:**
  - IEEE Transactions on Knowledge and Data Engineering (TKDE) submitted manuscript (`ieee_manuscript/dist/main.pdf`, 7.79 MB).
  - IEEE International Conference on Data Engineering (ICDE 2027) manuscript (`dist/icde_main.pdf`, 3.34 MB).

### Portfolio Synchronization Ledger

| Field                    | Previous Portfolio Claim      | Ground Truth Reality in `Final Year Project`                                           | Action Taken & File Modified                                       |
| :----------------------- | :---------------------------- | :------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| **Presence on Site**     | Missing from early iterations | Flagship ML research achievement of author with 2 IEEE papers                          | Added in `src/data/projects.ts` (L206-L255)                        |
| **Test Count**           | "76/76 pytest tests"          | **113 passing pytest tests** (100% pass rate across 12 modules)                        | Synchronized in `src/data/projects.ts` (L210, L212, L233, L247)    |
| **Memory Optimization**  | 39.1% auxiliary RAM reduction | **-74.2% peak RAM reduction** at $D=5,000$ and **-50.0%** at $(N=1000, D=2000)$        | Synchronized in `src/data/projects.ts` (L210, L220, L244)          |
| **Commit Reference**     | `879fd96`                     | **`1db855a`** (Master Audit 3 remediation, adversarial hardening, resource benchmarks) | Updated ground truth in matrix ledger                              |
| **Architecture Diagram** | None                          | Vector architecture workflow                                                           | Created dark SVG `public/projects/icc-clustering-architecture.svg` |
| **Benchmark Evidence**   | 13 datasets, 11 baselines     | 13 datasets, 11 baselines, 113 tests, -74.2% peak RAM, +20% streaming query throughput | Fully articulated in problem, architecture & features              |
| **Manuscript Reference** | General mention               | Submitted IEEE TKDE & ICDE 2027 manuscripts                                            | Documented in `src/data/projects.ts` (L212, L235)                  |

---

## 4. Verification Checkpoint

All three projects have 100% faithful, mathematically precise, evidence-grounded representations in the portfolio codebase:

- `src/data/projects.ts` contains all three projects with exact metrics, architectures, test counts, and repository URLs.
- `src/pages/Projects.tsx` dynamically renders, filters, and searches across all three projects.
- `src/pages/Home.tsx` features flagship systems with accessible article cards and direct links.
- `src/pages/About.tsx` correctly states the 12-agent (+5 roadmap) COPPER architecture.
- `src/pages/ProjectDetail.tsx` renders full technical specifications with medical disclaimer policies.
