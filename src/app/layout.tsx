import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProviderWrapper from "@/lib/sessionProvider";
import getCurrentUser from "@/components/currentUser/currentUser";
import ThemeProviders from "@/lib/themeProvider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "This is thread clone inspired by it",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
};

interface rootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: rootLayoutProps) {
  const session = await getCurrentUser();

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={false}
        className={`overflow-y-scroll dark:bg-[#101010] ${inter.className}`}
      >
        <SessionProviderWrapper customSession={session}>
          <ThemeProviders>
            {session && <Header />}
            <div className="w-screen max-w-xl mx-auto px-4 md:px-0">
              {children}
            </div>
            <Footer image={session?.image!} username={session?.username!} />
          </ThemeProviders>
        </SessionProviderWrapper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
