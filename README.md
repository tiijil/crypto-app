# CryptoTracker

A modern, responsive cryptocurrency tracking application built with Next.js 15, featuring real-time price tracking and cryptocurrency conversion capabilities.

![CryptoTracker Preview](public/preview.png)

## Features

- 🚀 Real-time cryptocurrency price tracking
- 📊 Live market data updates
- 💱 Cryptocurrency conversion tool
- 🌓 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Server-side rendering
- 🎯 SEO optimized
- Light mode by default for all users
- Manual theme switching capability
- Theme persistence across sessions
- Real-time cryptocurrency data
- Responsive design for all devices
- Live market monitoring
- Cryptocurrency conversion tools

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion One](https://motion.dev/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **API**: [CoinMarketCap API](https://coinmarketcap.com/api/)
- **Typography**: [Geist Font](https://vercel.com/font)
- **Testing**: Jest & React Testing Library

## Project Structure

```
crypto-tracker/
├── app/
│   ├── components/
│   │   ├── home/
│   │   │   ├── CryptoCard.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MarketsSection.tsx
│   │   │   └── StatsDisplay.tsx
│   │   ├── ui/
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── LiveIndicator.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── Header.tsx
│   │   └── ThemeProvider.tsx
│   ├── api/
│   │   └── crypto/
│   │       └── route.ts
│   ├── utils/
│   │   └── api.ts
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── grid-dark.svg
│   └── grid-light.svg
├── types/
│   └── crypto.ts
└── tests/
    └── components/
        ├── CryptoCard.test.tsx
        └── Header.test.tsx
```

## Quick Start

1. Clone the repository
2. Install dependencies with `npm install`
3. Create `.env.local` and add your API key
4. Run `npm run dev` to start development server

For detailed setup instructions, deployment guides, and testing information, see [SETUP.md](SETUP.md).

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (640px and up)
- Laptops (1024px and up)
- Desktops (1280px and up)

Features include:
- Responsive navigation with hamburger menu
- Fluid typography
- Adaptive layouts
- Touch-friendly interactions
- Optimized images
- Performance-focused animations

## Performance Optimizations

- Server-side rendering for better SEO
- Image optimization with Next.js Image component
- Dynamic imports for better code splitting
- Responsive images for different screen sizes
- Efficient styling with Tailwind CSS
- Optimized animations with Motion One

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Theme System

The application uses a light theme by default for all users. Users can manually switch between light and dark themes, and their preference will be saved for future visits.
