// src/app/layout.tsx
import { TaskProvider } from "@/lib/TaskContext"; // 1. Impor penyedia datanya
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* --- AWAL BUNGKUSAN --- */}
        <TaskProvider>
          
          <Navbar />
          
          <main className="min-h-screen">
            {children} {/* Ini adalah halaman (Beranda/Dashboard) yang kamu buka */}
          </main>
          
          <Footer />

        </TaskProvider>
        {/* --- AKHIR BUNGKUSAN --- */}
      </body>
    </html>
  );
}