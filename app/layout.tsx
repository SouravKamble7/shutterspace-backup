import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "ShutterSpace — Capture. Share. Inspire.",
  description: "A creative space for photographers to share their perspective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
