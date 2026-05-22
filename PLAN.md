# 👻 Third Settler — The Master Plan

> The player who always shows up.

---

## 1. The one-sentence pitch

**Third Settler is a free web app that plays the "third player," so two people — like a
single parent and their kid — can finally enjoy the board games that normally need three
or four.**

---

## 2. Why this exists

A dad and his almost-8-year-old son wanted to play their favorite hex-and-resource board
game. They couldn't — it needs three or four players, and mom wasn't always around. The
game sat on the shelf.

That wall is everywhere. Single parents, couples, roommates, anyone who is exactly two
people on a given night — they all own great games they can't play. The fix isn't a new
game. It's a **third player who always shows up.**

That third player is the **Ghost**. Third Settler is the app that runs it.

---

## 3. Who it's for

- **Primary:** single parents and their kids.
- **Secondary:** any pair stuck at two players — couples, siblings, roommates.
- **Design north star:** the magic is *two humans and a real board*, looking at each other.
  The app is a quiet game master in the corner, **not** the entertainment. Screen-light,
  always.

---

## 4. What it is — and what it is NOT

| It IS | It is NOT |
|---|---|
| A companion / game master for games you already own | A copy or clone of any published game |
| Generic — "hex-and-resource games," "settlement games" | A user of any trademarked name, logo, or art |
| A turn engine, dice roller, and scorekeeper | A reproduction of anyone's rulebook text |

This distinction is the legal foundation of the whole project. See section 10.

---

## 5. The core design: the "Game Master" model

A companion app is **blind** — it cannot see your physical table. We turn that limitation
into the entire craft of the app with four pillars:

### Pillar 1 — The app dictates the map
At setup, Third Settler generates a balanced board and tells you how to lay your physical
tiles. The app now knows the board's full geography **for free** — it never had to "learn"
it, because it *designed* it.

### Pillar 2 — The app owns the dice
Every turn begins with a tap to roll. This means the app is **already in the loop on every
single turn** — nobody has to stop and "report" anything. It rolls, narrates production,
and stays in rhythm with the game.

### Pillar 3 — The app narrates the Ghost
On the Ghost's turn, the app tells you in plain English exactly what the Ghost does:
*"The Ghost builds a road toward the open corner by the 6-brick."* You move the physical
piece. The app stays the storyteller.

### Pillar 4 — Minimal taps, ruthlessly
The only inputs are: tap-to-roll (which you'd do anyway), a "+1" on score, and the
occasional one-question check-in ("Who's ahead right now?"). If we ever find ourselves
making people type in every move, we've failed — at that point we've built a worse version
of a digital game.

---

## 6. The Ghost — the phantom player

- **Personality:** a consistent, slightly-annoying *blocker*. Not a strategic genius —
  on purpose. A predictable Ghost needs almost no information to feel alive, and "fair and
  explainable" beats "smart and mysterious."
- **Behavior is deterministic:** every Ghost decision follows a stated policy, so players
  can always see *why* it did what it did. No black box, no arguments.
- **Mascot:** a friendly, spooky-cute ghost — Halloween-approved by the 8-year-old
  co-designer. The Ghost is the product's character even though the product's *name* is
  plain and descriptive.

**Ghost decision policies (v0.1 draft):**
- *Setup:* the app places the Ghost's starting settlements on strong intersections it
  picks from its own generated map.
- *Roads:* extends the Ghost's longest road toward contested open space.
- *Robber / blocker:* targets the current leader's best-producing hex (resolved via a
  one-tap "who's ahead?" check-in).

---

## 7. The 2-player ruleset it runs

Third Settler implements an original house-rule set for two players (generic, no
trademarked content):

1. **Standard board**, generated and dictated by the app.
2. **Ghost blockers:** the Ghost occupies several intersections during setup. They never
   produce resources and never score — they exist purely to create healthy scarcity so the
   two-player game stays tense.
3. **Bank trades at 3:1** (instead of 4:1) to replace the trade economy lost with only one
   human opponent.
4. **First to 10 points wins.** Everything else mirrors familiar conventions.
5. **Optional spice:** a free Ghost road each round to let players wall each other out.

The app ships this as its built-in rules screen plus a one-page printable sheet.

---

## 8. MVP — v0.1 "Game Night"

The smallest thing that delivers a real, complete game night.

**In scope:**
- [ ] Board generator (balanced layout) + "lay your tiles like this" setup screen
- [ ] Dice roller with production narration
- [ ] Ghost turn engine (setup placement + road + blocker policies)
- [ ] Score tracker (tap to +1, win detection at 10)
- [ ] Built-in rules screen
- [ ] Printable one-page rules sheet
- [ ] Installable as a PWA (add-to-home-screen on any phone)

**Out of scope for v0.1:** accounts, multiple games, camera recognition, online play.

**Definition of done:** a single parent and a kid can open the app cold and play one full,
satisfying game on their physical board with zero outside instructions.

---

## 9. Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** all local — `localStorage`, no backend for the MVP
- **Delivery:** PWA, **mobile-first** (phones are the real device on a game table)
- **Hosting:** Vercel — `third-settler.vercel.app`, custom domain later
- **Source:** public GitHub repo, MIT licensed
- **CI:** Vercel preview deploys on every push

No backend until there's a feature that genuinely needs one (see roadmap).

---

## 10. Legal guardrails 🛡️

Non-negotiable rules baked into the project:

1. **Never** use the name, logo, artwork, or trade dress of any published game.
2. **Never** reproduce another game's rulebook text.
3. Always use **generic language**: "hex-and-resource game," "settlement and trading game
   you already own."
4. Ship under **MIT** — open and shareable.
5. **The full digital game (roadmap item) does not begin** until one of these is true:
   either (a) we secure a license or written blessing from the rights holder, or (b) it is
   redesigned into fully original IP — our own theme and our own twist on the mechanics.

*Not legal advice — but this is the conservative, well-trodden path companion apps live on.*

---

## 11. Build phases & milestones

### Phase 0 — Foundation
- [x] Create repo, init git
- [x] Write the master plan
- [x] Build the landing page — a complete, installable PWA (single file, no build step)
- [x] First Vercel deploy — live at third-settler.vercel.app
- [ ] Scaffold Next.js + TypeScript + Tailwind (when we start the game engine)

### Phase 1 — The Game Master engine
- [x] Board generator — balanced, enforces the 6/8 adjacency rule
- [x] Dice roller + production narration
- [x] Ghost turn engine + policies (v1 — narrated road-building)
- [x] Score tracker + win detection

### Phase 2 — Polish & feel
- [ ] Ghost mascot art + spooky-cute UI
- [ ] Big tap targets, dark-mode for evening play
- [ ] Printable rules sheet
- [x] PWA install — network-first service worker, offline support, install button

### Phase 3 — Ship
- [ ] Real-table playtest (the dad + son)
- [ ] Custom domain
- [ ] Launch (section 12)

---

## 12. Roadmap (post-MVP)

- **More games** — convert other 3+ player games to two-player with a Ghost.
- **Saved games & accounts** — optional, Supabase-backed, only if players ask for it.
- **Camera / computer-vision board recognition** — the app *sees* the table. Hard;
  a stretch dream, not a promise.
- **The full digital game** — a complete browser game needing no physical box.
  ⚠️ **Legally gated — see section 10.** Real ambition, not started until cleared.

---

## 13. Launch plan

- **Open source from day one** — public GitHub, MIT, contributions welcome.
- **Vercel deploy** with preview links for every change.
- **Origin-story announcement** on the mphinance Substack — the dad-and-son angle is the
  marketing; it's true and it's the whole heart of the thing.
- **Communities:** r/Catan, r/boardgames, r/SingleParents, and single-parent groups.
- **Product Hunt** once v0.1 is solid.
- **The hook:** "co-designed by an almost-8-year-old." Because it is.

---

## 14. How we'll know it worked

- ✅ The dad and son play a full game with just the two of them.
- ✅ One other single parent, somewhere, plays a game they couldn't play before.
- ✅ It gets used again — game *night*, not game *once*.
- ⭐ Bonus: stars, forks, and contributors who add their own games.

---

## 15. Immediate next step

A playable game companion (`site/play.html`) is live — it deals a balanced board, runs
the dice, plays the Ghost's turns, tracks the score, and calls the winner. Next: the
printable one-page rules sheet.

---

*Built by Michael and his son. 👻 The player who always shows up.*
