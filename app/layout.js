import "./globals.css";
import { UnifrakturCook } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";

// Blackletter/gothic font used for the "Le Monde" style logo in the header
const logoFont = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata = {
  title: "Le Monde",
  description: "News, in the style of Le Monde.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={logoFont.variable}>
      <body className="bg-white text-neutral-900 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}