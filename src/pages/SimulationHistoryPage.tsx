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

      <div className="flex flex-col gap-6">
        {simulations.map((item) => (
          // O 'key' é obrigatório no React para ele saber qual item é qual
          <div
            key={item.id}
            className="bg-card·rounded-xl·border·p-4·shadow-sm"
          >
            <h3 className="font-bold">{item.goalName}</h3>
            <p>Valor: R$ {item.goalAmount}</p>

            <div className="mt-4 flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/resultado/${item.id}`)}
              >
                Ver Detalhes
              </Button>
              <Button variant="ghost" onClick={() => handleDelete(item.id)}>
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
