 # BidUp – Auction Marketplace  
_Semester Project 2 – Front-End Development, Noroff School (2025)_

BidUp is a responsive web application.  
It is built with **vanilla JavaScript**, **ES modules**, **Tailwind CSS v3** and the public **Noroff Auction API v2** – no frameworks.

---

## ✨ Key Features

| Area | What you get |
|------|--------------|
| **Authentication** | Register & log in with an `@stud.noroff.no` email, form validation, persistent session (`localStorage`). |
| **Global Header** | Logo, search (≥ 768 px), nav links (Home · Auctions · My Profile)
| **Carousel (Home)** | “Newest auctions” – one card at a time, prev/next arrows, snaps into place. |
| **Infinite Listings Grid** | Active auctions paged `16 items per fetch`, _Load more_ button, responsive grid (1 → 4 columns). |
| **Profile Page** | Banner & avatar upload, editable bio, live |
| **Listing Detail** | 16 : 9 hero image, description, countdown, bid history & Place-bid button (PUT to the API). |
| **100 % Responsive** | Mobile-first, accessibility-friendly colours and focus outlines. |

---

## 💻 Tech Stack

* **Vanilla JS (ES Modules)**  
* **Tailwind CSS v3** – custom palette in `tailwind.config.js`  
* **Noroff Auction API v2** – purely REST  
* Dev server: **Live Server** + Tailwind CLI (`npm run dev`)  
* No bundler – everything runs natively in modern browsers.

---


---

## 🚀 Local Development

```bash
git clone https://github.com/your-username/bidup.git
cd bidup
npm install        # installs tailwindcss + run-all

# start Tailwind watcher + Live Server
npm run dev        # -> http://127.0.0.1:5500


