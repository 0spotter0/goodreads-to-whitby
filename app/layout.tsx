import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goodreads to Whitby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[url('/pochacco.png')] bg-size-[100px] bg-yellow-400/20 flex justify-center">
        {children}
      </body>
    </html>
  );
}
