import "./globals.css";
import { VibeProvider } from "@/context/VibeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatBot from "@/components/AIChatBot";

export const metadata = {
  title: "AstroClub — Smart Digital Ecosystem for Club Management",
  description:
    "A centralized, automated platform with event management, real-time notifications, attendance tracking, and performance analytics to improve efficiency and student engagement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-vibe="chill">
      <body>
        <VibeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AIChatBot />
        </VibeProvider>
      </body>
    </html>
  );
}
