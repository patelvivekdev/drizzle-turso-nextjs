import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { NavItem } from '@/components/nav-item'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import MobileNav from '@/components/mobile-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drizzle Turso Nextjs',
  description: 'Drizzle Turso Nextjs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="lg:grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-5">
                  <Link className="flex items-center gap-2 font-semibold" href="/">
                    <span className="">Drizzle Turso Nextjs</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <nav className="grid items-start px-4 text-sm font-medium">
                    <NavItem href="/">Home</NavItem>
                    <NavItem href="/users">Users</NavItem>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
                <Link className="flex items-center gap-2 font-semibold lg:hidden" href="/">
                  {/* <Logo /> */}
                  <span className="">Drizzle Turso Nextjs</span>
                </Link>
                <div className="flex flex-row gap-2">
                  <ThemeToggle />
                  <MobileNav />
                </div>
              </header>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
