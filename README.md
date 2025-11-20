# 🔗 TinyLink — URL Shortener (Node + Express + MongoDB)

A simple and clean URL shortening application inspired by Bit.ly.  
Users can create short links, view stats, delete links, and track clicks.

The project follows all assignment requirements including API structure, redirect handling, health check, and UI behavior.

---

## 🚀 Live Demo
`https://tinylink-r28x.onrender.com/`

---

## 📂 GitHub Repository
`https://github.com/skyeyeye/tinylink`

---

## 🎥 Video Walkthrough
> Add your Loom / YouTube demo link here

---


# ✨ Features

### 🔗 URL Shortening
- Enter long URL → get a short URL
- Optional custom short code
- Auto-generate 6-char code if none is provided
- Fully validated URLs

### 📊 Stats Page
Displays:
- Short code  
- Target URL  
- Click count  
- Created time  
- Last clicked time  

### 🔁 Redirection
Visiting `/:code`:
- Performs a 302 redirect  
- Increments click count  
- Updates last clicked time  

### 🗑 Delete Links
- Users can delete an existing link.  
- After deletion, `/code` → **404 Not Found**

### ❤️ Health Check
Returns:
```json
{ "ok": true, "version": "1.0" }

```
## Clean UI
- Dashboard to list, create, search, and delete links

- Stats page

- Responsive Tailwind CSS design

- Copy button

- Inline validation
---
## Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

dotenv

CORS

Frontend

Static HTML

Tailwind CSS (CDN)

Vanilla JavaScript

Deployment

Render / Railway

MongoDB Atlas database
---
## Project Structure
```
tinylink/
│
├── server.js                # Express server
├── package.json
├── .gitignore
├── .env.example
│
├── models/
│   └── Link.js              # Mongoose schema
│
├── routes/
│   ├── links.js             # Create, list, delete, stats
│   ├── redirect.js          # GET /:code → redirect
│   └── healthz.js           # GET /healthz
│
└── public/
    ├── index.html           # Dashboard
    ├── code.html            # Stats page
    ├── script.js            # Dashboard logic
    └── stats.js             # Stats page logic
```



