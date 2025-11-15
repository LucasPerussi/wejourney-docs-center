"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Library, BookOpen, Package, FileText, ChevronDown, Sun, Moon, Monitor, Activity, Menu, X } from "lucide-react"
import { Button } from "components/ui/button"
import { cn } from "lib/utils"
import { CommandTrigger } from "components/ui/command"

const links = [
  { href: "/", label: "Início", icon: Library },
  { href: "/docs", label: "Docs", icon: BookOpen },
  { href: "/releases", label: "Releases", icon: Package },
  { href: "/status", label: "Status", icon: Activity },
  { href: "/blog", label: "Blog", icon: FileText },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [query, setQuery] = useState("")
  const optionsRef = useRef<HTMLDivElement | null>(null)
  const themeRef = useRef<HTMLDivElement | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        optionsRef.current && !optionsRef.current.contains(e.target as Node) &&
        themeRef.current && !themeRef.current.contains(e.target as Node)
      ) {
        setOptionsOpen(false)
        setThemeOpen(false)
      }
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  const applyTheme = (t: "light" | "dark" | "system") => {
    const root = document.documentElement
    if (t === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", prefersDark)
      localStorage.setItem("theme", "system")
      setThemeOpen(false)
      return
    }
    root.classList.toggle("dark", t === "dark")
    localStorage.setItem("theme", t)
    setThemeOpen(false)
  }

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (saved) applyTheme(saved)
  }, [])

  return (
    <header className="border-b border-[var(--border-soft)] bg-background">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="https://wetalkassetsstorage.blob.core.windows.net/wetalk-public-assets/assets/logo-branca-2.png?si=teste&spr=https&sv=2024-11-04&sr=c&sig=Q0kGZDFtgx%2ByubNFOGM4WHYZLV%2FFZsRBHXXlqQZ19No%3D" alt="Logo WeJourney (dark)" className="hidden h-7 w-auto dark:block" />
          <img src="https://wetalkassetsstorage.blob.core.windows.net/wetalk-public-assets/assets/logo-preta-2.png?si=teste&spr=https&sv=2024-11-04&sr=c&sig=Q0kGZDFtgx%2ByubNFOGM4WHYZLV%2FFZsRBHXXlqQZ19No%3D" alt="Logo WeJourney (light)" className="block h-7 w-auto dark:hidden" />
          <span className="text-lg font-bold">Central WeJourney</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">

          <div className="relative" ref={optionsRef}>
            <Button variant="ghost" className="gap-2 border border-[var(--border-soft)] dark:bg-[#171717] bg-muted" onClick={() => setOptionsOpen((v) => !v)}>
              <ChevronDown className="h-4 w-4 text-foreground" />
              <span>Opções</span>
            </Button>
            {optionsOpen && (
              <div className="absolute right-0 z-50 mt-2 w-52 rounded-md border border-[var(--border-soft)] dark:bg-[#171717] bg-background p-2 shadow-md">
                {links.map(({ href, label, icon: Icon }) => (
                  <Link key={`opt-${href}`} href={href} className="flex items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => setOptionsOpen(false)}>
                    <Icon className="h-4 w-4 text-foreground" />
                    <span>{label}</span>
                  </Link>
                ))}
                <a href="https://wejourney.com.br" target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent">
                  <Library className="h-4 w-4 text-foreground" />
                  <span>Sistema Principal</span>
                </a>
              </div>
            )}
          </div>

          <div className="relative" ref={themeRef}>
            <Button variant="ghost" className="gap-2 border border-[var(--border-soft)] dark:bg-[#171717] bg-muted" onClick={() => setThemeOpen((v) => !v)}>
              <Sun className="h-4 w-4 text-foreground" />
              <span>Tema</span>
            </Button>
            {themeOpen && (
              <div className="absolute right-0 z-50 mt-2 w-44 rounded-md border border-[var(--border-soft)] dark:bg-[#171717] bg-background p-2 shadow-md">
                <button className="flex w-full items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => applyTheme("light")}> 
                  <Sun className="h-4 w-4 text-foreground" /> Claro
                </button>
                <button className="flex w-full items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => applyTheme("dark")}> 
                  <Moon className="h-4 w-4 text-foreground" /> Escuro
                </button>
                <button className="flex w-full items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => applyTheme("system")}> 
                  <Monitor className="h-4 w-4 text-foreground" /> Sistema
                </button>
              </div>
            )}
          </div>

          <CommandTrigger />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            aria-label="Abrir Menu"
            className="gap-2 border border-[var(--border-soft)] dark:bg-[#171717] bg-muted"
            onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v) }}
          >
            {mobileOpen ? <X className="h-4 w-4 text-foreground" /> : <Menu className="h-4 w-4 text-foreground" />}
            <span>Menu</span>
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <>
        <div className="fixed inset-0 z-40" onClick={() => setMobileOpen(false)} />
        <div ref={mobileRef} className="md:hidden fixed top-14 left-0 right-0 z-50" onClick={(e) => e.stopPropagation()}>
          <div className="mx-4 rounded-md border border-[var(--border-soft)] bg-background p-2 shadow-lg dark:bg-[#171717]">
            <div className="grid gap-2">
              {links.map(({ href, label, icon: Icon }) => (
                <Link key={`m-${href}`} href={href} className="flex items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => setMobileOpen(false)}>
                  <Icon className="h-4 w-4 text-foreground" />
                  <span>{label}</span>
                </Link>
              ))}
              <div className="grid gap-2">
                <button className="flex w-full items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => applyTheme("light")}> 
                  <Sun className="h-4 w-4 text-foreground" /> Claro
                </button>
                <button className="flex w-full items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => applyTheme("dark")}> 
                  <Moon className="h-4 w-4 text-foreground" /> Escuro
                </button>
                <button className="flex w-full items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent" onClick={() => applyTheme("system")}> 
                  <Monitor className="h-4 w-4 text-foreground" /> Sistema
                </button>
              </div>
              <div className="px-2">
                <CommandTrigger />
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </header>
  )
}