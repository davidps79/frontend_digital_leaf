import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import StoreProvider from "./StoreProvider";
import SideCart from "./SideCart";
import AlertDialogProvider from "./AlertDialogProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Leaf",
  description: "Su biblioteca digital de confianza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className + " flex flex-col items-center h-full min-h-screen"}>
        <AlertDialogProvider>
          <StoreProvider>
            <main className="max-w-7xl pt-24 w-full h-fit">
              <Navbar />
              {children}
            </main>
            <SideCart />
          </StoreProvider>
        </AlertDialogProvider>
      </body>
    </html>
  );
}
