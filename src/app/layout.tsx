import "~/styles/globals.css";

import { DM_Sans } from "next/font/google";

import NavBar from "../components/navabr/navbar";
import Providers from "~/components/providers";
import { Toaster } from "~/components/toaster";

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Tribetie",
  description: "Where connections become tribes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable} data-theme="dim">
      <body className="min-h-screen pt-12 font-sans antialiased">
        <Providers>
          <NavBar />
          {authModal}
          <main className="container mx-auto max-w-7xl px-4 py-10">
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
