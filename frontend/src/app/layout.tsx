import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { DarkModeProvider } from '@/contexts/DarkModeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "100 Life Goals",
  description: "Track and achieve your life goals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <AuthProvider>
          <DarkModeProvider>
            {children}
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
