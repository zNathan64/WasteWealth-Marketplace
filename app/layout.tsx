import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WasteWealth - Smart Waste-to-Wealth Marketplace",
  description: "Transform waste into wealth while fighting climate change through our sustainable marketplace",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} storageKey="wastewealth-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
