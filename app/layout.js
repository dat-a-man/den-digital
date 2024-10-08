import { Raleway } from "next/font/google";
import "./globals.css";
const robotoMono = Raleway({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["100", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});
export const metadata = {
  title: {
    default: "Data Engineering News",

    template: "%s | Data Engineering News",
  },
  description: "The latest news and updates in data engineering.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>{children}</body>
    </html>
  );
}
