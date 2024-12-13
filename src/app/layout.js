
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
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="font-sans antialiased">
        <SessionAuthProvider>
          <div className="relative min-h-screen">
            <Navbar />
            <main className="pb-24">{children}</main>
            <div className="absolute bottom-0 w-full">
              <Footer />
            </div>
          </div>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
