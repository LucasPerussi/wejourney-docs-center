"use client"
import { useState } from "react"
import { releases } from "./data"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"

export default function ReleasesPage() {
  const [selected, setSelected] = useState(releases[0])

  return (
    <div className="grid min-h-screen grid-cols-12">
      <aside className="col-span-12 border-b bg-muted/30 p-4 md:col-span-3 md:border-b-0 md:border-r border-[var(--border-soft)]">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Versões</h2>
        <div className="space-y-2">
          {releases.map((r) => (
            <button
              key={r.version}
              onClick={() => setSelected(r)}
              className={
                selected.version === r.version
                  ? "w-full rounded-md bg-background px-3 py-2 text-left text-sm shadow"
                  : "w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
              }
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.version}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="col-span-12 p-6 md:col-span-9">
        <div className="mb-4 flex items-center gap-2">
          <Badge>Release Notes</Badge>
          <h1 className="text-2xl font-bold tracking-tight">{selected.version}</h1>
          <span className="text-sm text-muted-foreground">{selected.date}</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Alterações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {selected.changes.map((c, i) => (
                <li key={i} className="rounded-md border border-[var(--border-soft)] p-3">
                  <div className="text-sm">
                    <span className="font-semibold">{c.area}:</span> {c.description}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}