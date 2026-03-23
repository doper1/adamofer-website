import { ClerkProvider } from '@clerk/nextjs'
import "@/index.css";

export const metadata = {
  title: 'Adam Ofer',
  description: 'DevOps Engineer & Software Developer',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/admin"
      afterSignUpUrl="/"
    >
      <html lang="en">
        <body className="bg-[#030014] min-h-screen text-white font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
