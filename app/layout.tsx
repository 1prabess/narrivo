import type { Metadata } from "next";
import { Playfair } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "next-themes";

const playFair = Playfair({
  variable: "--font-play-fair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Narrivo",
  description: "Number 1 Blog App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased flex flex-col min-h-screen px-2",
          playFair.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer>footer</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
