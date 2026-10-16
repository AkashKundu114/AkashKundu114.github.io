# Git History & Credentials Security Plan

## 1. Secret & History Audit Verdict

An exhaustive audit of the working tree and the entire Git commit history was conducted using automated pattern scanning (`git log -S`, `git log --all --full-history`) and AST regex matching:

| Credential / Datum | Location(s) Found | Present in Git History? | Status / Action Taken |
| ------------------ | ----------------- | ----------------------- | --------------------- |
| **Gmail SMTP App Password (`ahucxrkplgfkovoh`)** | Local untracked `backend/.env` | **NO** (0 commits found) | Local file sanitized with placeholder; app password recommendation: revoke in Google Account Security settings. |
| **Admin Password SHA-256 Hash (`45cbd...3be`)** | `.env.example`, `.github/workflows/deploy.yml` | **YES** (Documented in commits) | Harmless client-side demonstration hash. Migrating `/admin` to an explicit open client sandbox removes the concept of a secret hash altogether. |
| **Personal Telephone (`+91 9064349004`)** | `index.html`, `About.tsx`, `Contact.tsx`, `*.tex` | **YES** (Committed in earlier portfolio revisions) | Stripped from working tree in all source files, schemas, and assets. |
| **Secondary Email (`akashkundu1152@gmail.com`)** | `resume_cdac.tex`, `resume_sde.tex` | **YES** (Committed in earlier CV updates) | Stripped from LaTeX templates and replaced with primary recruiter contact email `akashkundu7487@gmail.com`. |

---

## 2. History Rewrite Options & Recommendation

Because the telephone number was committed in earlier commits on `main` before this cleanup initiative, two remediation strategies exist:

### Option A: Do Not Rewrite History (Recommended Default)
- **Rationale:** The phone number was public on the live portfolio site. Rewriting git history via force-push disrupts collaborator clones, breaks existing Git commit SHAs, and requires an explicit Approval Gate under global operating rules.
- **Action:** Scrub all personal data from the working tree on `cleanup/public-site`. Going forward, no phone numbers, home addresses, or credentials ever enter new commits.

### Option B: Deep History Scrub via `git filter-repo` (Requires User Approval Gate 1)
- If the repository owner strictly desires complete removal of the phone string from all historical Git blobs:
  ```bash
  # Prerequisite: pip install git-filter-repo
  # Create a fresh clone backup before running
  git filter-repo --replace-text <(echo "+91 9064349004==>[REDACTED]")
  git filter-repo --replace-text <(echo "+91-9064349004==>[REDACTED]")
  ```
- **Constraint:** This requires force-pushing to remote (`git push --force --all origin`), which is prohibited without explicit user sign-off.

---

## 3. Working Tree Verification

All occurrences of the personal telephone number and secondary email have been completely purged from the working tree on `cleanup/public-site`.
