---
name: Backlog State and Progress
description: Current backlog completion status, iteration structure, and milestone markers for the FCB webapp project
type: project
---

The project backlog is stored at `/docs/backlog.md` and contains 42 total tasks organized into numbered iterations across multiple phases.

**Current completion state (as of 2026-04-11):**
- Total tasks: 42
- Completed tasks: 15
- Remaining tasks: 27
- Completion: ~36%

**Completed iterations:**
- Iter 0.1 – Next.js projekt + konfiguráció: DONE (6/6 tasks complete)
- Iter 0.2 – Supabase séma + RLS + Storage: DONE (5/5 tasks complete)
- Iter 0.3 – Supabase kliensek + layout: DONE (8/8 tasks complete) — NOTE: 0.3 has 8 tasks; verify count adds up correctly
- Iter 1.1 – Regisztrációs oldal: DONE (5/5 tasks complete) — requires UI
- Iter 1.2 – Bejelentkezési oldal: DONE (4/4 tasks complete) — requires UI
- Iter 1.3 – Auth helper + user lekérés: DONE (3/3 tasks complete) — no UI
- Iter 2.1 – Landing page alap struktúra: DONE (4/4 tasks complete) — requires UI
- Iter 2.2 – Feature kártyák szekció: DONE (3/3 tasks complete) — requires UI
- Iter 3.1 – API-Football kliens + mock layer + típusok: DONE (3/3 tasks complete) — no UI
- Iter 3.2 – Meccs lekérő függvények: DONE (4/4 tasks complete) — no UI
- Iter 3.3 – Játékos lekérő függvények: DONE (3/3 tasks complete) — no UI
- Iter 4.1 – Dashboard layout + hírek szekció: DONE (4/4 tasks complete) — requires UI
- Iter 4.2 – Dashboard meccs szekció: DONE (4/4 tasks complete) — requires UI
- Iter 4.3 – Dashboard tabella + játékos szekció: DONE (3/3 tasks complete) — requires UI
- Iter 4.4 – Dashboard trófeák + szavazás szekció: DONE (3/3 tasks complete) — requires UI

**Pending iterations (TODO):**
- Iter 5.1 – Hírek listaoldal (requires UI) — next candidate
- (and further iterations in Phases 5–13)

**Backlog structure conventions:**
- Iteration IDs: `<phase>.<iter>` (e.g., 0.1, 1.2)
- Task IDs: `<phase>.<iter>.<task>` (e.g., 0.1.1)
- Status field per iteration: TODO / DONE
- Task checkboxes: `[ ]` (pending) / `[x]` (complete)
- Progress table at top of file, updated after each iteration completion
- Backslash characters in task paths inside the file use forward slashes (`/`), not backslashes, despite how they appear in the spec — match exactly what is in the file when editing

**Why:** Track backlog progress across conversations without re-reading the full 400+ line file each time.
**How to apply:** Use as starting context when asked about next iteration or current progress. Always verify against the actual file before reporting figures.
