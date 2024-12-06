
import "./globals.css";
// Componentes creados
import Navbar from "@/components/commons/Navbar.jsx";
import Footer from "@/components/commons/Footer";
import SessionAuthProvider from "@/components/contextAuth/SessionAuthProvider";

export const metadata = {
  title: "Hotel Kristal",
  description: "Hotel Kristal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SessionAuthProvider>
          {/* Componente Navbar */}
          <Navbar />
          <main className="max-w-[1280px] mx-auto">
            {children}</main>
          {/* Componente Footer */}
          <Footer />
        </SessionAuthProvider>
      </body>
    </html>
  );
}
