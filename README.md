# demoCORS

An interactive demo project built for **learning and teaching** how [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) works in the browser.

This project was developed as a companion to an in-depth technical article on CORS — covering the Same-Origin Policy, preflight requests, CORS headers, credentials, common misconfigurations, and browser security internals.

## What This Demo Shows

| Scenario | Server | What Happens |
|---|---|---|
| **Same-Origin Request** | `:3000` → `:3000` | Always works — no CORS involved |
| **Cross-Origin Without CORS** | `:3000` → `:4000` | Browser **blocks** the response (no CORS headers) |
| **Cross-Origin With CORS** | `:3000` → `:4001` | Server sends CORS headers — browser **allows** the response |
| **Preflight Blocked** | `:3000` → `:4000` | `POST` with JSON triggers `OPTIONS` preflight — fails |
| **Preflight Allowed** | `:3000` → `:4001` | Preflight passes — `POST` succeeds |

## Architecture

All three servers run **simultaneously** on different ports:

```
┌──────────────────────┐
│   Frontend Server     │    fetch('/api/same-origin')
│   localhost:3000      │ ─────────────────────────────── ✅ Same-Origin (always works)
│                       │
│   Serves index.html   │    fetch('http://localhost:4000/...')
│   + same-origin API   │ ──────────────────────────────► 🚫 Backend (NO CORS)
│                       │
│                       │    fetch('http://localhost:4001/...')
│                       │ ──────────────────────────────► ✅ Backend (WITH CORS)
└──────────────────────┘

  Origin A (:3000)          Origin B (:4000)         Origin C (:4001)
```

Different ports = **different origins**. The browser enforces CORS on every `fetch()` from one origin to another.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)

### Install

```bash
git clone https://github.com/karankessy/demoCORS.git
cd demoCORS
npm install
```

### Run

A single command starts all three servers:

```bash
npm start
```

This boots:
- **Frontend** on [http://localhost:3000](http://localhost:3000)
- **Backend (no CORS)** on [http://localhost:4000](http://localhost:4000)
- **Backend (with CORS)** on [http://localhost:4001](http://localhost:4001)

Then open [http://localhost:3000](http://localhost:3000) in your browser.

You can also run each server individually:

```bash
npm run start:frontend      # port 3000
npm run start:no-cors       # port 4000
npm run start:with-cors     # port 4001
```

## What to Look For

1. Open **DevTools** (`F12`) → **Network** tab before clicking any button
2. Click a button in the UI and watch the network requests
3. For preflight demos, look for the **OPTIONS** request that appears before the actual POST
4. Click **"Show Response Headers"** under each card to see what the server sent back
5. Check the **Console** tab for the full CORS error messages

## Project Structure

```
├── frontend-server.js      # Express static server (port 3000) + same-origin API
├── server-no-cors.js       # API server without CORS headers (port 4000)
├── server-with-cors.js     # API server with CORS enabled (port 4001)
├── public/
│   └── index.html          # Interactive frontend UI
└── package.json
```

## Key Concepts Demonstrated

- **Same-Origin Policy** — why the browser blocks cross-origin responses by default
- **Origin** — defined as `scheme + host + port` (`http://localhost:3000` ≠ `http://localhost:4000`)
- **Simple Requests** — GET requests that don't trigger preflight
- **Preflight Requests** — POST with `application/json` triggers an OPTIONS check first
- **CORS Headers** — `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Credentials`, `Access-Control-Max-Age`
- **Browser Enforcement** — CORS doesn't prevent the request from reaching the server; it controls whether the browser exposes the response to JavaScript

## License

This is a personal hobby project. Do whatever you want with it.
