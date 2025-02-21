"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { inter } from "./styles/font";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !pathname.includes("/auth/");
  return (
    <html lang="en">
      <body className={inter.className} data-bs-theme="dark">
        <main>
          <Providers>
            {showNavbar && <Header />}
            {children}
            {showNavbar && <Footer />}
          </Providers>
        </main>
      </body>
    </html>
  );
}
