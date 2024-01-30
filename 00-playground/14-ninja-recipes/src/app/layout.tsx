import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipes for Ninjas",
  description: "A collection of recipes for Ninjas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <h1>Recipes for Ninjas</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
