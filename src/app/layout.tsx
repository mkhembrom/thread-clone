import "./globals.css";
import type { Metadata } from "next";
import SessionProviderWrapper from "@/lib/sessionProvider";
import getCurrentUser from "@/components/currentUser/currentUser";
import ThemeProviders from "@/lib/themeProvider";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dns from "node:dns";
import ClientComponent from "@/lib/clientComponent";
import Header from "@/components/header/header";
import MainLayout from "./(MainLayout)/layout";
dns.setDefaultResultOrder("ipv4first");

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
        className={`overflow-y-scroll dark:bg-[#101010]`}
      >
        <SessionProviderWrapper customSession={session}>
          <ThemeProviders>
            <ClientComponent>
              {session ? <Header currentUser={session} /> : null}

              <div className="w-screen max-w-xl mx-auto px-4 md:px-0">
                {children}
              </div>
              <Footer image={session?.image!} username={session?.username!} />
            </ClientComponent>
            <SpeedInsights />
          </ThemeProviders>
        </SessionProviderWrapper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
