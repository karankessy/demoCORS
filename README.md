# CORS Demo

An interactive demo project built for **learning and teaching** how [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) works in the browser.

This project was developed as a companion to an in-depth technical article on CORS — covering the Same-Origin Policy, preflight requests, CORS headers, credentials, common misconfigurations, and browser security internals.

## What This Demo Shows

| Scenario | What Happens |
|---|---|
| **Same-Origin Request** | Request to `localhost:3000` from `localhost:3000` — always works, no CORS involved |
| **Cross-Origin Without CORS** | Request to `localhost:4000` — browser **blocks** the response (no `Access-Control-Allow-Origin` header) |
| **Cross-Origin With CORS** | Request to `localhost:4000` — server sends correct CORS headers, browser **allows** the response |
| **Preflight (Blocked)** | `POST` with `Content-Type: application/json` triggers an `OPTIONS` preflight — fails without CORS |
| **Preflight (Allowed)** | Same `POST` to the CORS-enabled server — preflight passes, actual request succeeds |

## Architecture

```
┌─────────────────────┐         ┌──────────────────────────┐
│  Frontend Server     │  fetch  │  Backend Server           │
│  localhost:3000      │ ──────► │  localhost:4000            │
│                      │         │                            │
│  Serves index.html   │         │  Option A: server-no-cors  │
│  + same-origin API   │         │  Option B: server-with-cors│
└─────────────────────┘         └──────────────────────────┘
       Origin A                         Origin B
  (http://localhost:3000)         (http://localhost:4000)
```

Different ports = **different origins**. The browser enforces CORS on every `fetch()` from Origin A to Origin B.

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

You need **two terminals** — one for the frontend, one for the backend.

**Terminal 1 — Frontend:**

```bash
npm run start:frontend
```

**Terminal 2 — Backend (choose one):**

```bash
# Without CORS headers (requests will be blocked):
npm run start:backend-no-cors

# With CORS headers (requests will succeed):
npm run start:backend-with-cors
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> **Tip:** Start with `server-no-cors.js` to see the blocked requests, then restart with `server-with-cors.js` to see them succeed. Or run them one at a time and observe the difference.

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
├── server-with-cors.js     # API server with CORS enabled (port 4000)
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
