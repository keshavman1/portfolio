import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type TrailPoint = {
  x: number
  y: number
  element: HTMLDivElement | null
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null)
  const ring = useRef<HTMLDivElement | null>(null)
  const label = useRef<HTMLDivElement | null>(null)
  const fxLayer = useRef<HTMLDivElement | null>(null)

  const trail = useRef<TrailPoint[]>([])

  useEffect(() => {
    const finePointer =
      window.matchMedia('(pointer: fine)').matches

    if (!finePointer) return

    /*
     * More particles + longer spacing
     * = more visible cursor trail.
     */
    const particles = Array.from(
      { length: 14 },
      (_, index) => {
        const element = document.createElement('div')

        element.className =
          'cursor-trail-particle'

        element.style.setProperty(
          '--delay',
          `${index * 0.03}s`,
        )

        fxLayer.current?.appendChild(element)

        return {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          element,
        }
      },
    )

    trail.current = particles

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2

    let x = tx
    let y = ty

    let frame = 0

    const onMove = (event: MouseEvent) => {
      tx = event.clientX
      ty = event.clientY

      document.documentElement.style.setProperty(
        '--cursor-x',
        `${tx}px`,
      )

      document.documentElement.style.setProperty(
        '--cursor-y',
        `${ty}px`,
      )
    }

    const onOver = (event: Event) => {
      const target =
        event.target as HTMLElement | null

      const interactive =
        target?.closest(
          'a, button, [data-cursor], [data-hover-card]',
        )

      if (!interactive) return

      const text =
        interactive.getAttribute('data-cursor') ||
        (interactive.hasAttribute('data-hover-card')
          ? 'VIEW'
          : 'MOVE')

      ring.current?.classList.add(
        'cursor-active',
      )

      label.current?.classList.add(
        'cursor-label-active',
      )

      if (label.current) {
        label.current.textContent = text
      }
    }

    const onOut = (event: Event) => {
      const target =
        event.target as HTMLElement | null

      if (
        !target?.closest(
          'a, button, [data-cursor], [data-hover-card]',
        )
      ) {
        return
      }

      ring.current?.classList.remove(
        'cursor-active',
      )

      label.current?.classList.remove(
        'cursor-label-active',
      )
    }

    const createClickWave = (event: MouseEvent) => {
      if (!fxLayer.current) return

      const wave = document.createElement('div')

      wave.className =
        'cursor-click-wave'

      wave.style.left =
        `${event.clientX}px`

      wave.style.top =
        `${event.clientY}px`

      fxLayer.current.appendChild(wave)

      gsap.fromTo(
        wave,
        {
          xPercent: -50,
          yPercent: -50,
          scale: 0.15,
          opacity: 0.85,
        },
        {
          xPercent: -50,
          yPercent: -50,
          scale: 2.2,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          onComplete: () => {
            wave.remove()
          },
        },
      )

      const pulse =
        document.createElement('div')

      pulse.className =
        'cursor-click-pulse'

      pulse.style.left =
        `${event.clientX}px`

      pulse.style.top =
        `${event.clientY}px`

      fxLayer.current.appendChild(pulse)

      gsap.fromTo(
        pulse,
        {
          xPercent: -50,
          yPercent: -50,
          scale: 0.35,
          opacity: 0.65,
        },
        {
          xPercent: -50,
          yPercent: -50,
          scale: 1.3,
          opacity: 0,
          duration: 0.48,
          ease: 'power2.out',
          onComplete: () => {
            pulse.remove()
          },
        },
      )
    }

    const render = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16

      if (dot.current) {
        dot.current.style.transform =
          `translate3d(${tx}px, ${ty}px, 0)`
      }

      if (ring.current) {
        ring.current.style.transform =
          `translate3d(${x}px, ${y}px, 0)`
      }

      if (label.current) {
        label.current.style.transform =
          `translate3d(${x + 20}px, ${y + 20}px, 0)`
      }

      /*
       * Slower interpolation gives the trail
       * more length and more visible separation.
       */
      let previousX = x
      let previousY = y

      trail.current.forEach(
        (particle, index) => {
          const easing =
            0.19 - index * 0.008

          particle.x +=
            (previousX - particle.x) *
            Math.max(easing, 0.08)

          particle.y +=
            (previousY - particle.y) *
            Math.max(easing, 0.08)

          previousX = particle.x
          previousY = particle.y

          if (particle.element) {
            const scale =
              1.08 - index * 0.045

            const opacity =
              0.48 - index * 0.026

            particle.element.style.transform =
              `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${Math.max(scale, 0.42)})`

            particle.element.style.opacity =
              `${Math.max(opacity, 0.08)}`
          }
        },
      )

      frame = requestAnimationFrame(render)
    }

    document.addEventListener(
      'mousemove',
      onMove,
    )

    document.addEventListener(
      'mouseover',
      onOver,
    )

    document.addEventListener(
      'mouseout',
      onOut,
    )

    document.addEventListener(
      'click',
      createClickWave,
    )

    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)

      document.removeEventListener(
        'mousemove',
        onMove,
      )

      document.removeEventListener(
        'mouseover',
        onOver,
      )

      document.removeEventListener(
        'mouseout',
        onOut,
      )

      document.removeEventListener(
        'click',
        createClickWave,
      )

      particles.forEach((particle) => {
        particle.element?.remove()
      })
    }
  }, [])

  return (
    <div
      className="custom-cursor"
      aria-hidden="true"
    >
      <div
        ref={fxLayer}
        className="cursor-fx-layer"
      />

      <div
        ref={dot}
        className="cursor-dot"
      />

      <div
        ref={ring}
        className="cursor-ring"
      />

      <div
        ref={label}
        className="cursor-label"
      >
        MOVE
      </div>
    </div>
  )
}