"use client"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"

type Service = { key: string; name: string; status: "operacional" | "degradado" | "indisponível"; uptime?: number }
type Incident = { title: string; date: string; impact: "baixo" | "médio" | "alto"; description: string }

const initialServices: Service[] = [
  { key: "api", name: "API", status: "operacional", uptime: 99.95 },
  { key: "auth", name: "Autenticação", status: "operacional", uptime: 99.9 },
  { key: "emails", name: "Envio de Emails", status: "operacional", uptime: 99.8 },
  { key: "notifications", name: "Notificações", status: "operacional", uptime: 99.85 },
  { key: "monitoring", name: "Monitoramento", status: "operacional", uptime: 99.9 },
  { key: "ims", name: "Sistema de Gerenciamento Interno", status: "operacional", uptime: 99.7 },
  { key: "main", name: "Sistema Principal", status: "operacional", uptime: 99.9 },
  { key: "sales", name: "Sistema de Vendas", status: "operacional", uptime: 99.75 },
  { key: "portal", name: "Portal Wetalk", status: "operacional", uptime: 99.8 },
  { key: "support", name: "Serviço de Suporte", status: "operacional", uptime: 99.9 },
]

const incidents: Incident[] = [
  { title: "Latência elevada na API", date: "2025-11-13", impact: "médio", description: "Aumento de latência em endpoints críticos por 20 minutos." },
  { title: "Intermitência no banco", date: "2025-11-11", impact: "alto", description: "Falhas de conexão ocasionais mitigadas com failover." },
]

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [lastCheck, setLastCheck] = useState<string>("")

  useEffect(() => {
    const check = async () => {
      const update = async (key: string, status: Service["status"]) => {
        setServices((prev) => prev.map((s) => (s.key === key ? { ...s, status } : s)))
      }
      try {
        const res = await fetch("https://api.wetalkit.com.br/contents/all-public", { cache: "no-store" })
        await update("api", res.ok ? "operacional" : "indisponível")
      } catch {
        await update("api", "indisponível")
      }
      setLastCheck(new Date().toLocaleString())
    }
    check()
  }, [])

  const overall = useMemo(() => {
    const bad = services.find((s) => s.status !== "operacional")
    return bad ? "Alguns serviços com problemas" : "Todos os serviços operacionais"
  }, [services])

  const badgeVariant = (status: Service["status"]) => {
    if (status === "operacional") return "success"
    if (status === "degradado") return "warning"
    return "destructive"
  }

  const impactBadge = (impact: Incident["impact"]) => {
    if (impact === "baixo") return "default"
    if (impact === "médio") return "warning"
    return "destructive"
  }

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight">Status de Serviço</h1>
      <p className="text-muted-foreground">{overall}</p>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((s) => (
          <Card key={s.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{s.name}</span>
                <Badge variant={badgeVariant(s.status) as any}>{s.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Uptime 30 dias</div>
              <div className="text-2xl font-semibold">{s.uptime ?? 99.9}%</div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="mt-4 text-xs text-muted-foreground">Última verificação: {lastCheck || "verificando..."}</div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Incidentes recentes</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {incidents.map((i, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{i.title}</span>
                  <Badge variant={impactBadge(i.impact) as any} className="capitalize">{i.impact}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{i.date}</div>
                <div className="mt-1 text-sm">{i.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}