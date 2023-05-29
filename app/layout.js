import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "Social Nextwork for software developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
