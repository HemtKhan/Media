# LEMAR SunTech | لمر سن‌تک ☀️

The official mobile web app for **LEMAR SunTech** — a solar energy company in Kabul, Afghanistan, selling solar panels, LiFePO4 lithium batteries, and hybrid inverters since 2018.

Designed in the **iOS 27 "Liquid Glass"** style: frosted-glass cards, a floating pill tab bar, ambient gradient orbs, spring animations, and automatic light/dark mode. The entire app is in **Dari** with right-to-left layout.

## Screens

- **خانه (Home)** — hero, company stats (7+ years, 5-year warranty, Tier-1 brands, 24/7 support), brand chips, and popular products
- **محصولات (Products)** — full catalog with category filter: solar panels, lithium batteries, inverters, complete packages. Every product has a one-tap WhatsApp inquiry button
- **محاسبه (Calculator)** — customers pick their appliances (lights, fridge, TV, water pump, AC…) and backup hours; the app recommends inverter size, battery capacity, and panel count — then sends the whole calculation to WhatsApp with one tap
- **تماس (Contact)** — WhatsApp, phone (077 820 2600), website, address, and working hours

## Tech

- Single self-contained `index.html` — no build step, no dependencies
- `services.json` — company and product data
- `netlify/functions/services.js` — serverless API endpoint serving the data

## Run it

Open `index.html` in any browser, or deploy to Netlify — works out of the box.

Website: [lemarsuntech.com](https://lemarsuntech.com)
