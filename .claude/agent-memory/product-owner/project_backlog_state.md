---
name: Backlog State and Progress
description: Current backlog completion status, iteration structure, and milestone markers for the FCB webapp project
type: project
---

The project backlog is stored at `/docs/backlog.md` and contains 42 total tasks organized into numbered iterations across multiple phases.

**Current completion state (as of 2026-04-11):**
- Total tasks: 42
- Completed tasks: 19
- Remaining tasks: 23
- Completion: ~45%

**Completed iterations:**
- Iter 0.1 – Next.js projekt + konfiguráció: DONE (6/6 tasks complete)
- Iter 0.2 – Supabase séma + RLS + Storage: DONE (5/5 tasks complete)
- Iter 0.3 – Supabase kliensek + layout: DONE (8/8 tasks complete)

**In-progress / pending iterations:**
- Iter 1.1 – Regisztrációs oldal (UI required)
- Iter 1.2 – Bejelentkezési oldal (UI required)
- ... and further iterations across Phases 1–5

**Backlog structure conventions:**
- Iteration IDs: `<phase>.<iter>` (e.g., 0.1, 1.2)
- Task IDs: `<phase>.<iter>.<task>` (e.g., 0.1.1)
- Status field per iteration: TODO / DONE
- Task checkboxes: `[ ]` (pending) / `[x]` (complete)
- Progress table at top of file, updated after each iteration completion

**Why:** Track backlog progress across conversations without re-reading the full 400+ line file each time.
**How to apply:** Use as starting context when asked about next iteration or current progress. Always verify against the actual file before reporting figures.
