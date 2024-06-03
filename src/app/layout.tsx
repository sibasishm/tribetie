import "~/styles/globals.css";

import { Inter } from "next/font/google";

import NavBar from "../components/navabr/navbar";
import Providers from "~/components/providers";
import { Toaster } from "~/components/toaster";

const inter = Inter({
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
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
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
