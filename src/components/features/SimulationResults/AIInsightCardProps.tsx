import 'react-loading-skeleton/dist/skeleton.css'

import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { Button } from '@/components/shared/Button'
import { useInsight } from '@/hooks/useInsight'

import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight, chatHistory, sendMessage } =
    useInsight(simulationId)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  console.log(insight)

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatHistory])

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}
      {!isLoading && insight && !error && <Content insight={insight} />}

      <div className="custom-scrollbar mb-4 flex-1 space-y-4 overflow-y-auto pr-2">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex w-full min-w-0 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`inline-block max-w-[85%] rounded-xl p-3 wrap-break-word whitespace-pre-wrap ${message.role === 'user' ? 'bg-primary text-white shadow-sm' : 'bg-secondary-button text-muted-foreground border-border border text-base leading-relaxed shadow-sm'}`}
            >
              {message.content}
            </div>
          </div>
        ))}

        <div ref={scrollRef} />
      </div>
      <div className="flex gap-2 border-t pt-4">
        <textarea
          className="bg-input ring-primary flex-1 rounded-lg border focus:ring-1"
          placeholder="tire suas dúvidas com o mentor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} variant={'primary'}>
          Enviar
        </Button>
      </div>
    </div>
  )
}
