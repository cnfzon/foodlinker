import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar';
import { AuthProvider } from '@/contexts/AuthContext';

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-tc",
});

export const metadata: Metadata = {
  title: "FoodLinker - 連結美食與愛心",
  description: "FoodLinker 是一個連結餐廳與慈善機構的平台，讓剩食不再浪費，讓愛心得以傳遞。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={notoSansTC.variable}>
      <body className={notoSansTC.className}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
/*export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body style={{ backgroundColor: '#F0FAF4', minHeight: '100vh', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}*/

