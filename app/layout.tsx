import type React from "react"
import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const firaCode = Fira_Code({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Terminal Portfolio",
  description: "An interactive terminal-style portfolio showcasing my skills and projects",
  keywords: ["portfolio", "developer", "terminal", "interactive", "retro", "futuristic"],
  authors: [{ name: "Shivananda Reddy Kankanala" }],
  openGraph: {
    title: "Terminal Portfolio",
    description: "An interactive terminal-style portfolio showcasing my skills and projects",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={firaCode.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
