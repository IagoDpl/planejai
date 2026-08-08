import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()

  const [simulations, setSimulations] = useState<SimulationRecord[]>(() =>
    getAllSimulations(),
  )

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-start gap-6 px-6 py-10">
      <PageHero
        title="Histórico de simulações"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />

      {simulations.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-20 text-center">
          <p className="text-muted-foreground">Nenhuma simulação encontrada.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Criar primeira simulação
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-6">
          {simulations.map((item) => {
            const amount = Number(item.goalAmount.replace(/\D/g, '')) / 100
            const deadline = Number(item.goalDeadline)
            const monthlySavings = (amount / deadline).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })

            const creationDate = item.createdAt
              ? new Date(item.createdAt)
              : new Date()
            const formattedDate = creationDate.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })

            return (
              <div
                key={item.id}
                className="bg-card border-border h-434px w-354px relative mx-auto flex flex-none flex-col items-start gap-6 rounded-[22px] border p-8 shadow-[4px_4px_18px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.01] md:mx-0 md:h-auto md:w-full md:flex-row md:items-center md:justify-between md:shadow-lg"
              >
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]">
                  <Goal size={26} className="text-primary" />
                </div>

                <div className="flex w-full flex-col gap-1 text-left md:w-auto md:flex-1">
                  <h3 className="text-foreground truncate text-base leading-tight font-semibold">
                    {item.goalName}
                  </h3>
                  <span className="text-muted-foreground text-sm leading-tight font-normal">
                    {formattedDate}
                  </span>
                </div>

                <div className="flex w-full flex-col items-start gap-4 text-left md:w-auto md:flex-1 md:flex-row md:items-center md:justify-around">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                      Custo da meta
                    </span>
                    <p className="text-foreground text-base font-semibold">
                      R$ {item.goalAmount}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                      Prazo
                    </span>
                    <p className="text-foreground text-base font-semibold">
                      {item.goalDeadline} meses
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                      Economia mensal
                    </span>
                    <p className="text-foreground text-base font-semibold">
                      R$ {monthlySavings}
                    </p>
                  </div>
                </div>

                <div className="border-border w-full border-t md:h-10 md:w-px md:border-t-0 md:border-l" />

                <div className="flex w-full shrink-0 items-center justify-between gap-4 md:w-auto md:justify-end md:gap-6">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-2 text-xs font-medium text-red-500 transition-opacity hover:opacity-70"
                  >
                    <Trash2 size={20} />
                    <span className="md:hidden">Excluir</span>
                  </button>

                  <div className="border-border h-8 border-l md:hidden" />

                  <button
                    onClick={() => navigate(`/resultado/${item.id}`)}
                    className="border-border bg-secondary-button text-foreground hover:bg-foreground hover:text-background flex h-8 items-center justify-center gap-2 rounded-2xl border px-4 transition-all"
                  >
                    <ExternalLink size={16} />
                    <span className="text-xs font-normal whitespace-nowrap">
                      Ver detalhes
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
