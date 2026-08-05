import { Goal, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  // Pegamos as funções que criamos no hook
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()

  // Estado para armazenar as simulações na tela
  const [simulations, setSimulations] = useState<SimulationRecord[]>(() => {
    const data = getAllSimulations()
    return data
  })

  const handleDelete = (id: string) => {
    deleteSimulation(id) // Apaga do banco (localStorage)
    setSimulations((prev) => prev.filter((item) => item.id !== id)) // Atualiza a tela com a nova lista
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <PageHero title="Histórico" subtitle="Suas metas salvas" />

      <div className="flex flex-col gap-4">
        {simulations.map((item) => (
          <div
            key={item.id}
            className="bg-card border-border hover:border-primary/30 rounded-24px flex flex-col border p-5 shadow-sm transition-all"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="bg-primary/10 rounded-xl p-3">
                <Goal size={24} className="text-primary" />
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-muted-foreground p-1 transition-colors hover:text-red-500"
                aria-label="Excluir simulação"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-1 text-muted-foreground mt-1 truncate font-bold">
                {item.goalName}
              </h3>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <div>
                <span className="text-10px text-muted-foreground font-bold uppercase">
                  custo da meta
                </span>
                <p className="text-foreground text-sm font-semibold">
                  R$ {item.goalAmount}
                </p>
              </div>
              <div>
                <span className="text-10px text-muted-foreground font-bold uppercase">
                  Prazo
                </span>
                <p className="text-foreground text-sm font-semibold">
                  {item.goalDeadline} meses
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="rounded-x1 w-full justify-center py-6 font-bold"
              onClick={() => navigate(`/resultado/${item.id}`)}
            >
              Ver Detalhes
            </Button>
          </div>
        ))}
      </div>
    </main>
  )
}
