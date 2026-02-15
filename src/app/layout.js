import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ReduxProvider from "./redux/ReduxProvider";
import { AuthProvider } from "./components/AuthContext";
import AppInit from "./redux/AppInit";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Vocabulary Quiz",
  description: "Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <AppInit />
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
