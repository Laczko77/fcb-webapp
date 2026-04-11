---
name: Backlog State and Progress
description: Current backlog completion status, iteration structure, and milestone markers for the FCB webapp project
type: project
---

The project backlog is stored at `/docs/backlog.md` and contains 42 total tasks organized into numbered iterations across multiple phases.

**Current completion state (as of 2026-04-11):**
- Total tasks: 42
- Completed tasks: 38
- Remaining tasks: 4
- Completion: ~90%

**Completed iterations:**
- Iter 0.1 – Next.js projekt + konfiguráció: DONE (6/6 tasks complete)
- Iter 0.2 – Supabase séma + RLS + Storage: DONE (5/5 tasks complete)
- Iter 0.3 – Supabase kliensek + layout: DONE (8/8 tasks complete)
- Iter 1.1 – Regisztrációs oldal: DONE (5/5 tasks complete)
- Iter 1.2 – Bejelentkezési oldal: DONE (4/4 tasks complete)
- Iter 1.3 – Auth helper + user lekérés: DONE (3/3 tasks complete)
- Iter 2.1 – Landing page alap struktúra: DONE (4/4 tasks complete)
- Iter 2.2 – Feature kártyák szekció: DONE (3/3 tasks complete)

**Pending iterations (TODO):**
- Iter 3.1 – API-Football kliens + mock layer + típusok (no UI)
- Iter 3.2 – Meccs lekérő függvények (no UI)
- Iter 3.3 – Játékos lekérő függvények (no UI)
- Iter 4.1 – Dashboard layout + hírek szekció (requires UI)
- Iter 4.2 – Dashboard meccs szekció (requires UI)
- Iter 4.3 – Dashboard tabella + játékos szekció (requires UI)
- Iter 4.4 – Dashboard trófeák + szavazás szekció (requires UI)

**Backlog structure conventions:**
- Iteration IDs: `<phase>.<iter>` (e.g., 0.1, 1.2)
- Task IDs: `<phase>.<iter>.<task>` (e.g., 0.1.1)
- Status field per iteration: TODO / DONE
- Task checkboxes: `[ ]` (pending) / `[x]` (complete)
- Progress table at top of file, updated after each iteration completion

**Why:** Track backlog progress across conversations without re-reading the full 400+ line file each time.
**How to apply:** Use as starting context when asked about next iteration or current progress. Always verify against the actual file before reporting figures.
