// src/app/layout.tsx
import { TaskProvider } from "@/lib/TaskContext"; 
import { ThemeProvider } from "@/components/ThemeProvider"; // Pastikan sudah buat file ini
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Tambahkan suppressHydrationWarning agar tidak error saat perpindahan tema
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* ThemeProvider harus membungkus semuanya agar class "dark" bisa masuk ke tag HTML/Body */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TaskProvider>
            
            <Navbar />
            
            <main className="min-h-screen">
              {children}
            </main>
            
            <Footer />

          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}