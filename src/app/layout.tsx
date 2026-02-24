// src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import { TaskProvider } from "@/lib/TaskContext"; 
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <TaskProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </TaskProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}