import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { FooterGlow } from "@/components/footer-glow";
import { TopRightControls } from "@/components/top-right-controls";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vertical Partners - Soluções de I.A para negócios",
  description: "Empresa focada em soluções de I.A para negócios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} min-h-screen bg-white font-sans antialiased text-slate-900 dark:bg-black dark:text-white`}
      >
        <TopRightControls />
        <div className="relative z-10 min-h-screen">{children}</div>
        <FooterGlow />
      </body>
    </html>
  );
}
