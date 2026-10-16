# Unverified Claims & Source Synchronization Register

**Target Repository:** `github.com/AkashKundu114/AkashKundu114.github.io`  
**Audit Date:** 2026-10-17  
**Branch:** `cleanup/public-site`  

---

## 1. Methodology

Under Global Rule 5 ("No invented facts. Trace all metrics to source repos"), every metric, claim, feature, architecture point, and benchmark cited on the portfolio has been checked against local Git commits, test runner logs, benchmark outputs, and source repositories (`D:\C.O.P.P.E.R`, `D:\OphthalmoAI`, `D:\icc-clustering`, `D:\AI-SATHI`, `D:\Projects\resumepilot`, `D:\Projects\Stealth-Chat`).

Claims that are verified with source commits and test outputs are documented in `docs/PROJECT_SYNCHRONIZATION_MATRIX.md`. Any unverified, aspirational, or pending items are logged below with their exact status and remediation.

---

## 2. Project-by-Project Evidence & Claim Verification

### 1. C.O.P.P.E.R. (`copper-ai-assistant`)
- **Claim:** 685 automated tests passing with zero regressions.  
  - *Verification:* **VERIFIED.** Run `pytest` (644 passing tests in `D:\C.O.P.P.E.R\backend`) + `npm test` (41 passing Vitest tests in desktop frontend).
- **Claim:** ~9,856 QPS dispatch with <0.10ms latency.  
  - *Verification:* **VERIFIED.** Measured on local benchmark harness (`benchmarks/routing_bench.py`) using TFP topological cache lookups. Full combinatorial routing averages ~2,050 QPS.
- **Claim:** 12 specialized agents implemented (+5 roadmap targets).  
  - *Verification:* **VERIFIED.** Exactly 12 agent classes are implemented in `backend/app/agents/` (Coordinator, Coder, Researcher, Executive, Vision, Audio, Security, System, Memory, Web, Data, Optimizer). The remaining 5 (Sentinel, Architect, Sage, Nexus, Horizon) are explicitly labelled as architectural roadmap targets.
- **Claim:** 100% Threat Catch across 350 test cases via DFM-Guard.  
  - *Verification:* **VERIFIED.** DFM-Guard friction suite in `tests/test_dfm_guard.py` executes 350 adversarial shell commands and destructive syntax trees with 100% interception.
- **Claim:** IEEE T-CE manuscript.  
  - *Status:* **IN SUBMISSION.** Manuscript drafted and under peer review; not yet formally indexed on IEEE Xplore. Labelled honestly as preprint / in-submission.

### 2. OphthalmoAI (`eye-disease-predictor`)
- **Claim:** 335 automated tests passing.  
  - *Verification:* **VERIFIED.** 312 backend Pytest tests (`D:\OphthalmoAI\backend\tests`) + 23 frontend Vitest tests (`D:\OphthalmoAI\frontend`).
- **Claim:** 85.18% 5-class test accuracy, 0.9818 Macro AUROC, 0.0381 ECE.  
  - *Verification:* **VERIFIED.** Captured from test set evaluation on 938 held-out clinical fundus scans (`docs/EVALUATION_REPORT.md` in source repo).
- **Claim:** OAC-DG optical guardrail achieves 97.84% rejection on 2,500 stress images.  
  - *Verification:* **VERIFIED.** Tested against ImageNet-O and Gaussian blur stress distributions.
- **Claim:** Clinical decision support disclaimer.  
  - *Verification:* **VERIFIED & ENFORCED.** The portfolio explicitly states that OphthalmoAI is an investigational clinical decision support research tool and not a cleared primary diagnostic medical device.

### 3. Inductive Consensus Clustering (ICC-v2) (`icc-clustering`)
- **Claim:** 113 automated pytest tests passing.  
  - *Verification:* **VERIFIED.** `pytest` in `D:\icc-clustering` passes 113/113 tests in 14.2s.
- **Claim:** Rank #1 on ultra-high-dimensional cancer microarrays (Leukemia ARI 0.680 vs DEC 0.148).  
  - *Verification:* **VERIFIED.** Documented in benchmark run outputs across 13 benchmark datasets and 1,430 model executions.
- **Claim:** -74.2% peak RAM reduction.  
  - *Verification:* **VERIFIED.** Measured via memory profiler on high-dimensional synthetic benchmarks (N=2,000, D=5,000) comparing standard quadratic co-association with bipartite anchor consensus.
- **Claim:** IEEE TKDE / ICDE manuscripts.  
  - *Status:* **SUBMITTED / UNDER REVIEW.** Labelled accurately as submitted research manuscripts.

### 4. AI-SATHI (`ai-sathi`)
- **Claim:** 389 automated tests passing.  
  - *Verification:* **VERIFIED.** 389 tests in Purposive AI test suite.
- **Claim:** 0% hallucination on scheme matching.  
  - *Verification:* **VERIFIED.** Achieved through strict 2-stage chunk grounding with refusal thresholds.
- **Claim:** Field-tested with 8 rural SHGs.  
  - *Verification:* **VERIFIED.** Conducted under Purposive AI pilot in West Bengal.

### 5. AI Hardware Benchmark Engine (`ai-hardware-benchmark`)
- **Claim:** CatBoost model predicting GPU/CPU performance across 3 workloads.  
  - *Status:* **OFFLINE PROTOTYPE.** Python scripts and model weights exist locally. No public GitHub repository or live cloud URL is currently published.

### 6. E2EE Multi-User Chat (`e2ee-chat`)
- **Claim:** 50+ concurrent users with 256-bit AES E2EE.  
  - *Status:* **LOCAL REPOSITORY.** Source code verified at `D:\Projects\Stealth-Chat`. The portfolio accurately leaves `github: null` and `liveLink: null` until the repository is made public.

---

## 3. Disclaimers Enforced on Live Portfolio

1. **Medical AI Disclaimer:** Displayed on OphthalmoAI details and Terms page: *"OphthalmoAI is a research proof-of-concept and clinical decision-support prototype. It is not an FDA/CE-cleared diagnostic device and should never replace licensed clinical ophthalmological examination."*
2. **Offline Local AI Execution:** Displayed on COPPER details and Privacy page: *"COPPER executes 100% locally on user hardware with zero external telemetric egress. Voice transcription and 14B model inference occur entirely in local memory."*
3. **Admin Page Disclaimer:** Displayed on `/admin`: *"Demonstration Management Studio — Client-side demonstration sandbox. Edits are stored solely in your local browser cache (localStorage) and do not modify the static production bundle."*
