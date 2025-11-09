 **🌤️ Weather Dashboard**

A modern, responsive weather dashboard built with Next.js, TypeScript, and Tailwind CSS that allows users to search any city and get the current weather and a 5-day forecast.

Live Demo: (https://upthrust-workflow.onrender.com)

Features

# 🔍 Search for any city worldwide.

# ☀️ Display current weather including temperature, feels like, humidity, wind speed, and weather description.

# 📅 5-day forecast with daily temperature and weather icon.

# 🌈 Responsive, clean, and visually appealing design with background images and gradient overlays.

# ⚡ Loading and error handling for smooth user experience.

Screenshots


(Replace with actual screenshot URL)

Technologies Used

# Next.js 15 – React framework for server-side rendering and static site generation.

# TypeScript – Type-safe JavaScript for more reliable code.

# Tailwind CSS – Utility-first CSS framework for responsive and clean UI.

# OpenWeatherMap API – Fetch real-time weather data.

# Next/Image – Optimized image loading for weather icons.

Getting Started

Clone the repository

git clone https://github.com/poonamdxt06/upthrust-workflow.git
cd upthrust-workflow


Install dependencies

npm install


Create a .env file in the project root and add your API key(s):

OPENWEATHER_API_KEY=your_openweather_api_key_here


Run the development server

npm run dev


Open http://localhost:3000
 to view the app.

Deployment

This app can be deployed easily on Render or Vercel:

Render url: https://upthrust-workflow.onrender.com 

# Make sure your environment variables (like API keys) are set on the platform.

# Build and deploy using:

npm run build
npm run start

Project Structure
├── app/               # Main app folder
│   ├── api/weather.ts # API route for fetching weather
│   └── page.tsx       # Home page component
├── public/            # Static assets
├── prisma/            # Prisma ORM (optional for future expansion)
├── package.json
├── tsconfig.json
└── tailwind.config.js

Contributing

Contributions are welcome!

# Fork the repo

# Create a new branch: git checkout -b feature-name

# Commit your changes: git commit -m 'Add some feature'

# Push to the branch: git push origin feature-name

# Open a pull request

License

This project is MIT Licensed.
