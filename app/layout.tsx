import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

/**
 * Configure Geist Sans font
 * Used as the primary font throughout the application
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configure Geist Mono font
 * Used for monospace text elements
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/**
 * Root Layout Component
 * 
 * Provides the base structure for all pages including:
 * - Font configuration
 * - Theme provider
 * - Initial theme script to prevent flash
 * - HTML structure
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 
         * Inline script for initial theme detection
         * Runs before React hydration to prevent flash of wrong theme
         * Checks localStorage and sets initial theme class/attribute
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  const savedTheme = localStorage.getItem('theme');
                  // Always default to light theme if no preference is saved
                  return savedTheme || 'light';
                }
                const theme = getInitialTheme();
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
