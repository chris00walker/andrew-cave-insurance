import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '@/components/ui/toast-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Trust-Building Authority Font (Serif)
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Professional Clarity Font (Sans-serif)
const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andrew Cave Insurance - Trusted Insurance Broker in Barbados",
  description: "Professional insurance solutions for life, health, business, and pensions in Barbados. Trusted expertise for protecting your family and securing your future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${sourceSans3.variable} font-sans antialiased`}
      >
        <TooltipProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col bg-neutral-white">
              <header>
                <Navbar />
              </header>
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
