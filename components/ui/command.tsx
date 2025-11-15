"use client"
import * as React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "lib/utils"
import { BookOpen, Package, FileText, Activity, Newspaper, Globe, X, Search } from "lucide-react"
import { news } from "../../app/noticias/data"
import { fetchBlogPosts, type BlogPost } from "lib/blog"

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-lg text-popover-foreground shadow-md",
      "dark:bg-[#171717] bg-popover",
      className
    )}
    {...props}
  />
))
Command.displayName = "Command"

export function CommandDialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v: boolean) => void; children: React.ReactNode }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onOpenChange])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md" onClick={() => onOpenChange(false)}>
      <div className="pointer-events-none fixed inset-0 flex items-start justify-center p-4">
        <div className="pointer-events-auto w-full max-w-2xl overflow-hidden rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className={cn("w-full", "dark:bg-[#171717] bg-popover")}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export function CommandInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "flex h-11 w-full items-center border-b border-[var(--border-soft)] px-3 text-sm outline-none",
        "placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        props.className
      )}
    />
  )
}

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[320px] overflow-y-auto p-2", className)}
    {...props}
  />
))
CommandList.displayName = "CommandList"

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("px-4 py-6 text-sm text-muted-foreground", className)}
    {...props}
  />
))
CommandEmpty.displayName = "CommandEmpty"

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("overflow-hidden rounded-md", className)}
    {...props}
  />
))
CommandGroup.displayName = "CommandGroup"

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm",
      "aria-selected:bg-accent aria-selected:text-accent-foreground",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = "CommandItem"

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("my-2 h-px w-full bg-[var(--border-soft)]", className)}
    {...props}
  />
))
CommandSeparator.displayName = "CommandSeparator"

export function CommandShortcut({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-auto text-xs text-muted-foreground">{children}</span>
  )
}

export function CommandTrigger() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    let ignore = false
    const load = async () => {
      const p = await fetchBlogPosts()
      if (!ignore) setPosts(p)
    }
    load()
    return () => { ignore = true }
  }, [])

  const navigate = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const filteredPosts = posts.filter(
    (p) => p.title.toLowerCase().includes(value.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(value.toLowerCase()))
  )
  const filteredNews = news.filter(
    (n) => n.title.toLowerCase().includes(value.toLowerCase()) || n.tags.some((t) => t.toLowerCase().includes(value.toLowerCase()))
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn("h-9 rounded-md border px-3 text-sm", "border-[var(--border-soft)] dark:bg-[#171717] bg-muted hover:bg-accent flex items-center gap-2")}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Buscar...</span>
        <kbd className="ml-auto bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <div className="flex items-center gap-2">
            <CommandInput autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type a command or search..." className="dark:bg-[#171717] bg-background" />
            <button className="m-2 rounded-md p-1 hover:bg-accent" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => navigate("/docs")}><BookOpen className="mr-2 h-4 w-4" />Documentation</CommandItem>
              <CommandItem onSelect={() => navigate("/blog")}><FileText className="mr-2 h-4 w-4" />Blog</CommandItem>
              <CommandItem onSelect={() => navigate("/releases")}><Package className="mr-2 h-4 w-4" />Release Notes</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => navigate("/status")}>
                <Activity className="mr-2 h-4 w-4" />Status
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => { window.open("https://wejourney.com.br", "_blank", "noopener,noreferrer"); setOpen(false) }}>
                <Globe className="mr-2 h-4 w-4" />System
                <CommandShortcut>⌘G</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}