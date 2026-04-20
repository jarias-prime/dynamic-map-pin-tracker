# Dynamic Map Pin Tracker

An interactive map-based application that allows users to drop, view, and manage location pins in real time, displaying coordinates and reverse-geocoded addresses.

https://github.com/user-attachments/assets/3bf28616-15d5-4663-938f-461d8cd7640d

## Features

- Basic Login System
- Add pins by clicking on the map
- View pin coordinates and reverse-geocoded addresses
- Switch between multiple map layers (OSM, Dark, Light, Satellite)
- Search locations by address and add them as pins
- Drag markers to update pin position and address
- Pin list panel for quick pin overview and focus
- Loading state while map and geocoding requests are in progress

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn installed

### Default User Credential
```txt
Email: admin@example.com
Password: admin
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app in your browser.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Tech Stack

- Next.js
- React
- TypeScript
- Leaflet / React Leaflet
- Tailwind CSS
- Zustand
- ESLint
- PostCSS
- @iconify/react
- clsx
- vercel

Preview Project: [Dynamic Map Pin Tracker](https://dynamic-map-pin-tracker.vercel.app/)
