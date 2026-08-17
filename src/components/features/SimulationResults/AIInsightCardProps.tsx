import 'react-loading-skeleton/dist/skeleton.css'

import { MessageCircle, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

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
    <div className="bg-card text-card-foreground order-2 flex h-full flex-col rounded-2xl border border-transparent p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.05)] lg:order-1 lg:col-span-2 dark:border-white/5 dark:shadow-none">
      {/* Header */}
      <div className="mb-4 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-bold tracking-widest uppercase">
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
          onRetry={() => fetchInsight(simulationId)}
        />
      )}

      <div className="custom-scrollbar mb-6 flex-1 space-y-6 overflow-y-auto pr-2">
        {!isLoading && insight && !error && (
          <div className="pb-4">
            <Content insight={insight} />
          </div>
        )}

        {/* Histórico do Chat */}
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 border-t border-gray-100 pt-6 dark:border-white/10"
          >
            <div className="text-primary flex items-center gap-2 font-medium">
              <MessageCircle className="h-5 w-5" />
              <span>{message.role === 'user' ? 'Você' : 'Resposta da IA'}</span>
            </div>

            <div
              className={`text-base leading-relaxed whitespace-pre-wrap transition-colors ${
                message.role === 'user'
                  ? 'font-foreground font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Área de Input */}
      <div className="flex items-center gap-3 border-t border-transparent pt-4 dark:border-white/10">
        <div className="focus-within:ring-primary focus-within:border-primary flex-1 rounded-full border border-gray-200 bg-white px-6 shadow-sm transition-all focus-within:ring-1 dark:border-white/10 dark:bg-white/5">
          <input
            type="text"
            className="w-full bg-transparent py-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
            placeholder="Quais são os investimentos mais seguros que posso usar para que minha renda aumente?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>

        <button
          onClick={handleSend}
          className="bg-primary hover:bg-primary/90 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-colors"
          aria-label="Enviar mensagem"
        >
          <Send className="ml-1 h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
