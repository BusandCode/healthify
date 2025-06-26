import { Sora } from 'next/font/google';
import "./globals.css";




const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: "Healthify",
  description: "Developed by BusandCode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
         className={`${sora.className}`}
      >
        
        {children}
      </body>
    </html>
  );
}
