# GAG2 Stock Tracker & Predictor

Live stock tracker and restock predictor for **Grow a Garden 2** (Roblox).

## Features

- **Live Seed Stock** — Real-time stock data from the official [gag.gg](https://gag.gg) API, refreshing every 15 seconds
- **Restock Countdown** — Per-item countdown timers predicting when each seed will restock
- **Gear Shop** — Track 19+ gears with predicted restock times
- **Crates Shop** — Track 15 crates with restock predictions
- **Weather Events** — Aurora Borealis, Mega Moon, and other weather event tracking
- **Light/Dark Mode** — Toggle between themes, saved to localStorage
- **3-Tier Sorting** — In-stock → Next restock (≤5 min) → No stock
- **Discord Bot** — Slash commands (/setup-stock, /stock, /seed) for Discord integration
- **Cloudflare CDN** — JS assets served via Cloudflare Worker for fast global delivery

## Live Sites

| Site | URL | Description |
|------|-----|-------------|
| Stock Tracker | [stocks.zaskarian.com](https://stocks.zaskarian.com) | Original predictor with full sorting & history |
| Combined Tracker | [gag2.zaskarian.com](https://gag2.zaskarian.com) | gag.gg live API + static predictions (seeds, gears, crates, weather) |
| API / JS CDN | [api.zaskarian.com](https://api.zaskarian.com) | Cloudflare Worker serving JS assets & documentation |

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS — no frameworks, no build step
- **Backend:** Node.js + Discord.js (bot), Apache2 (web server)
- **CDN:** Cloudflare Workers + KV storage
- **APIs:** [gag.gg](https://gag.gg) (live seed stock), Miraheze Wiki (crate images)

## Project Structure

```
gag2-stock/
├── index.html          # Main stock tracker page
├── style.css           # Light/dark theme styling
├── script.js           # Core logic — DATA, seed arrays, render
├── sort.js             # 3-tier sorting (in-stock → ≤5min → no stock)
├── restock.js          # Restock history tracking
├── pets.js             # Pet data + tab management
├── sky-sync.js         # Day/night sky background
├── zynehouse.png       # Brand logo
├── logo.png            # Header logo
├── favicon.ico         # Site favicon
├── sky/                # Sky background assets
├── worker.js           # Cloudflare Worker (serves JS via KV)
└── README.md
```

## Discord Bot

```bash
cd /var/www/gag2-bot
cp .env.example .env    # Fill in bot token & client ID
npm install
pm2 start ecosystem.config.js
```

### Commands

| Command | Description |
|---------|-------------|
| /setup-stock | Create the live stock embed in a channel |
| /stock | Get current seed stock status |
| /seed | Look up a specific seed |

## License

Personal project — not affiliated with the Grow a Garden 2 game or gag.gg.
