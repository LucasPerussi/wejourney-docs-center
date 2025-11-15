"use client"
import { useEffect, useState } from "react"
import { Button } from "components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "lib/utils"

type CarouselItem = {
  id: string
  image: string
  title?: string
  description?: string
}

export function Carousel({ items, className, autoPlay = true, interval = 4000 }: {
  items: CarouselItem[]
  className?: string
  autoPlay?: boolean
  interval?: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(t)
  }, [autoPlay, interval, items.length])

  const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const goNext = () => setIndex((i) => (i + 1) % items.length)

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-[var(--border-soft)] dark:bg-[#171717] bg-muted shadow-lg", className)}>
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)`, width: `${items.length * 100}%` }}
      >
        {items.map((item) => (
          <div key={item.id} className="w-full shrink-0">
            <div className="relative h-56 w-full md:h-72 lg:h-80">
              <img src={item.image} alt={item.title ?? "banner"} className="h-full w-full object-cover" />
              {(item.title || item.description) && (
                <div className="absolute inset-x-0 bottom-0">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative p-4 text-white">
                    {item.title && <div className="text-lg font-semibold">{item.title}</div>}
                    {item.description && <div className="text-sm opacity-90">{item.description}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
        <Button variant="ghost" size="icon" onClick={goPrev} className="pointer-events-auto bg-black/20 text-white hover:bg-black/30">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={goNext} className="pointer-events-auto bg-black/20 text-white hover:bg-black/30">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              i === index ? "bg-white" : "bg-white/50 hover:bg-white"
            )}
          />
        ))}
      </div>
    </div>
  )
}