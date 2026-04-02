import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summarist: Book Summaries & Audio Insights",
  description: "Browse and listen to concise book summaries with premium audio content and personalized access.",
  icons: { icon: "/assets/logo - Copy.png" },
};

import Login from "@/components/Login/Login";
import "./globals.css";
import Providers from "./providers";
import MobileMenuModal from "@/components/MobileMenuModal/MobileMenuModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper wrapper__full">
          <Providers>
            <MobileMenuModal />
            <Login />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
