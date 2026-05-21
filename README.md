<div align="center">

# 👻 Third Settler

### *The player who always shows up.*

![Status](https://img.shields.io/badge/status-in_development-ffb259)
![PWA](https://img.shields.io/badge/PWA-installable-7c63ff)
![Price](https://img.shields.io/badge/price-free_forever-46c98b)
![License](https://img.shields.io/badge/license-MIT-9f8aff)
![Players](https://img.shields.io/badge/players-2_+_1_ghost-ff7a4d)

**A free web app that plays the third player — so two people can finally enjoy the board games that need three or four.**

</div>

---

## 🎲 The problem

Some of the best board games quietly demand three or four players. If it's just you and
your kid on a Tuesday night, that shelf may as well be locked. Single parents hit this wall
constantly: the game is *right there*, and you still can't play it.

## ✨ The fix

Third Settler runs the missing player for you — the **Ghost**. You play on the real board
you already own, with the real pieces. The app generates the map, rolls the dice, takes the
Ghost's turns, and keeps score. Two humans, one friendly phantom, a real game night.

No login. No cost. Installs on any phone. Built to keep your eyes on your kid and the
table — not a screen.

## 📂 What's in here right now

```
third-settler/
├── site/
│   ├── index.html          ← the landing page — a complete, installable PWA
│   ├── manifest.webmanifest ← PWA manifest
│   ├── sw.js               ← service worker (works offline)
│   └── icon.svg            ← app icon
├── PLAN.md                 ← the full master plan: architecture, MVP, roadmap
├── README.md               ← you are here
└── LICENSE                 ← MIT
```

The landing page isn't a mockup — it's a real, self-contained Progressive Web App. One HTML
file, zero dependencies, zero build step, nothing to break. It even has a **working dice
roller** so you can feel a piece of the product before it's finished.

## 👀 Preview it in 10 seconds

**Quick look:** double-click `site/index.html` — it opens in your browser, dice roller and
all.

**Full PWA (offline + installable):** service workers must be served over http, so:

```bash
npx serve site
# then open the http://localhost address it prints
```

## 🧠 How it works — the "Game Master" model

A companion app can't *see* your physical table. So instead of fighting that, Third Settler
leans into it with four moves:

- 🗺️ **We draw the map** — the app generates a balanced board and tells you how to lay your
  tiles, so it knows the layout without ever needing to see it.
- 🎲 **We roll the dice** — every turn starts with a tap, so the app stays in rhythm with
  your game. No stopping to type in what happened.
- 👻 **We play the Ghost** — on the Ghost's turn, the app narrates exactly what it does in
  plain English. You just move the piece.
- ❤️ **You just play** — no accounts, barely any tapping. Eyes on your kid and the board.

Full architecture and reasoning live in **[PLAN.md](./PLAN.md)**.

## 👻 Meet the Ghost

The Ghost isn't a criminal mastermind — and that's the point. It's a **friendly pain in the
neck who always shows up**: a third player that blocks the good spots, takes its turns, and
never argues about whose go it is. Predictable, fair, and *just* annoying enough to make the
game a real game again.

## 📲 Install it like a real app

The landing page is a full PWA — manifest, service worker, offline support, and an install
button that appears when your browser supports it. On a phone: open the page, tap **Install
the app** (or your browser's "Add to Home Screen"), and Third Settler lands on your home
screen like any other app — no app store, no account.

## 🗺️ Roadmap

**Shipping first — v0.1 "Game Night":**

- [x] Project set up + master plan written
- [x] Landing page built as an installable PWA
- [x] Dice roller with production narration *(live prototype on the landing page)*
- [ ] Deploy to Vercel for a live URL
- [ ] Balanced board generator
- [ ] Ghost turn engine
- [ ] Score tracker + win detection
- [ ] Printable one-page rules sheet

**Later:**

- [ ] More games converted for two players
- [ ] Optional saved games / accounts
- [ ] Camera-based board recognition
- [ ] ⚠️ A full digital game — **legally gated:** only after a license from the rights
  holder *or* a redesign into fully original IP. See [PLAN.md](./PLAN.md) § 10.

## 💜 The story

Built by a dad and his almost-eight-year-old son, who got tired of not being able to play
their favorite hex-and-resource game with just the two of them. If Third Settler gives one
other single parent a better game night — with no one missing from the table — it did its
job.

## 🛠️ Tech

- **Landing page:** a single self-contained HTML file. Zero dependencies, zero build.
- **The app (coming):** Next.js · TypeScript · Tailwind.
- **Hosting:** Vercel · **Source:** GitHub · **License:** MIT.

## 🚀 Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Set **Root Directory** to `site`, framework preset **Other** (no build needed).
4. Deploy — you're live.

## 🤝 Contributing

This is for single parents everywhere. Contributions are welcome — especially new game
conversions and translations. Open an issue or a pull request.

## 📜 License

MIT — see [LICENSE](./LICENSE). Free to use, fork, and share. That's the whole point.

> **Note:** Third Settler is an independent companion app for board games you already own.
> It is not affiliated with, endorsed by, or connected to any board game publisher, and uses
> no third-party names, logos, or artwork.

---

<div align="center">

**[📖 Read the full master plan →](./PLAN.md)**

*👻 The player who always shows up.*

</div>
