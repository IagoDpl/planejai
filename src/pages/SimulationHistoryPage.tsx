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
    <main className="max-w-1280px mx-auto flex min-h-screen w-full flex-col items-start gap-6 px-6 py-10">
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
        <div className="flex w-full flex-wrap justify-center gap-8 md:justify-start">
          {simulations.map((item) => {
            const amount = Number(item.goalAmount.replace(/\D/g, '')) / 100
            const deadline = Number(item.goalDeadline)
            const monthlySavings = (amount / deadline).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })

            return (
              <div
                key={item.id}
                style={{ width: 354, height: 434, borderRadius: 22 }}
                className="bg-card border-border relative flex shrink-0 flex-col gap-6 border p-8 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <div
                  style={{ width: 40, height: 40, borderRadius: 10.67 }}
                  className="bg-primary/10 flex shrink-0 items-center justify-center"
                >
                  <Goal size={26} className="text-primary" />
                </div>

                <div
                  style={{ width: 190, height: 40 }}
                  className="flex flex-col justify-center gap-1"
                >
                  <h3 className="text-foreground truncate text-base leading-tight font-semibold">
                    {item.goalName}
                  </h3>
                  <span className="text-muted-foreground text-sm leading-tight font-normal">
                    06/08/2026
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  <div
                    style={{ width: 190, height: 38 }}
                    className="flex flex-col justify-center gap-1"
                  >
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                      Custo da meta
                    </span>
                    <p className="text-foreground text-base font-semibold">
                      R$ {item.goalAmount}
                    </p>
                  </div>

                  <div
                    style={{ width: 190, height: 38 }}
                    className="flex flex-col justify-center gap-1"
                  >
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                      Prazo
                    </span>
                    <p className="text-foreground text-base font-semibold">
                      {item.goalDeadline} meses
                    </p>
                  </div>

                  <div
                    style={{ width: 190, height: 38 }}
                    className="flex flex-col justify-center gap-1"
                  >
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                      Economia mensal
                    </span>
                    <p className="text-foreground text-base font-semibold">
                      R$ {monthlySavings}
                    </p>
                  </div>
                </div>

                <div
                  style={{ width: 290 }}
                  className="border-border mt-auto h-0 self-center border-t"
                />

                <div
                  style={{ width: 290, height: 32 }}
                  className="flex items-center justify-between self-center"
                >
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-2 text-xs font-medium text-red-500 transition-opacity hover:opacity-70"
                  >
                    <Trash2 size={20} />
                    <span>Excluir</span>
                  </button>

                  <div className="border-border h-8 border-l" />

                  <button
                    onClick={() => navigate(`/resultado/${item.id}`)}
                    style={{ width: 128, height: 32, borderRadius: 16 }}
                    className="border-foreground dark:border-primary-foreground text-foreground hover:bg-foreground hover:text-background flex items-center justify-center gap-2 border transition-all"
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
