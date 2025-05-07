import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "FinanceWalk",
  description: "App de controle de despesas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        <main>

        {children}
        </main>
        <Toaster />

      </body>
    </html>
  );
}
