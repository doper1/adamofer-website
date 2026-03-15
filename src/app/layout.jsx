import { ClerkProvider } from '@clerk/nextjs'
import "@/index.css";

export const metadata = {
  title: 'Adam Ofer | Portfolio',
  description: 'DevOps Engineer & Software Developer',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#030014] min-h-screen text-white font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
