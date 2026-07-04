# LemarSunTech ☀️

A solar energy company web app designed in the **iOS 27 "Liquid Glass"** style — frosted-glass cards, a floating pill tab bar, ambient gradient orbs, spring animations, and automatic light/dark mode.

## Features

- **Home** — animated hero, live stat counters, weekly energy production chart
- **Services** — full catalog of solar services (residential, commercial, battery, EV charging, and more)
- **Savings** — interactive calculator: drag the sliders to estimate yearly savings, system size, payback period, and 25-year savings
- **Contact** — glass contact form with toast confirmation

## Tech

- Single self-contained `index.html` — no build step, no dependencies
- `services.json` — services data
- `netlify/functions/services.js` — serverless API endpoint that serves the services data

## Run it

Just open `index.html` in a browser, or deploy to Netlify — the site and function work out of the box.
