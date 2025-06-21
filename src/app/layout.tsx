// app/layout.tsx

import { ReduxProvider } from "@/utils/reduxWrapper";
import "./globals.css";

export const metadata = {
  title: "Crypto Dashboard",
  description: "Task using CoinCap API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
