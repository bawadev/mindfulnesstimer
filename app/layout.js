import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavBar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mindfulness Timer",
  description: "Mindfulness and Emotion tracker",

};

export default function RootLayout({ children }) {
  return ( 
    <html lang="en">
      
      <body className={inter.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
