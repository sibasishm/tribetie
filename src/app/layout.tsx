import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "./_components/topnav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} bg-slate-100 text-slate-600 antialiased dark:bg-slate-900 dark:text-slate-300`}
        >
          <TopNav />
          <main className="container mx-auto max-w-7xl px-4 py-10">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
