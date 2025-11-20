# 🔗 TinyLink — URL Shortener (Node + Express + MongoDB)

A simple and clean URL shortening application inspired by Bit.ly.  
Users can create short links, view stats, delete links, and track clicks.

The project follows all assignment requirements including API structure, redirect handling, health check, and UI behavior.

---

## 🚀 Live Demo
> Add your deployed link here  
Example:  
`https://tinylink-r28x.onrender.com/`

---

## 📂 GitHub Repository
> Add your repo link here

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
Users can delete an existing link.  
After deletion, `/code` → **404 Not Found**


