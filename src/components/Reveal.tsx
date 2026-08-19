import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: 54, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}
