import Login from "@/components/Login/Login";
import "./globals.css";
import Providers from "./providers";

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
            <Login />
            {children}
            </Providers>
        </div>
      </body>
    </html>
  );
}
