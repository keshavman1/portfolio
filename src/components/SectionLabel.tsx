import type { ReactNode } from 'react'

export function SectionLabel({ children }: { number?: string; children: ReactNode }) {
  return (
    <div className="section-label" data-reveal-heading>
      <span>{children}</span>
    </div>
  )
}
