import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Next.js Quiz App with TypeScript & Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-darkBg text-white">{children}</body>
    </html>
  );
}
