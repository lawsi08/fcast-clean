// src/app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "FCAST - Cost Forecasting Made Simple",
  description: "A SaaS app for cost tracking, forecasting, and planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="container">
          {children}
          <footer className="footer">
            © 2025 FCAST.co.uk. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}