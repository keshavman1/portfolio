import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const GREETINGS = [
  'नमस्ते',
  'Hello',
  'Hola',
  'Bonjour',
  'Ciao',
  'こんにちは',
]

const FINAL_MESSAGE = 'आपका स्वागत है'

const TIMING = {
  greetingStep: 0.62,
  greetingIn: 0.42,
  greetingHold: 0.18,
  greetingOut: 0.25,
  finalGap: 0.12,
  finalIn: 0.55,
  finalHold: 2,
  finalOut: 0.35,
  exitDelay: 0.12,
  exitDuration: 0.82,
}

const greetingsDuration =
  GREETINGS.length * TIMING.greetingStep

const finalStart =
  greetingsDuration + TIMING.finalGap

const finalEnd =
  finalStart +
  TIMING.finalIn +
  TIMING.finalHold +
  TIMING.finalOut

const loaderExitStart = finalEnd + TIMING.exitDelay

function renderLetters(text: string, keyPrefix: string) {
  // Array.from() splits Devanagari combining marks away from their base
  // characters, which makes browsers render an unwanted dotted circle.
  // Grapheme segmentation keeps each visible Unicode cluster together.
  const segments =
    typeof Intl !== 'undefined' && 'Segmenter' in Intl
      ? Array.from(
          new Intl.Segmenter('hi', {
            granularity: 'grapheme',
          }).segment(text),
          ({ segment }) => segment,
        )
      : Array.from(text)

  return segments.map((segment, index) => (
    <span
      className="intro-loader-letter"
      key={`${keyPrefix}-${index}`}
      aria-hidden="true"
    >
      {segment === ' ' ? '\u00A0' : segment}
    </span>
  ))
}

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const counterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.intro-loader')
    if (!root) {
      return
    }

    const state = { value: 0 }
    const greetingNodes = gsap.utils.toArray<HTMLElement>(
      '.intro-loader-greeting',
    )
    const finalMessage = document.querySelector<HTMLElement>(
      '.intro-loader-final',
    )

    if (!finalMessage || greetingNodes.length !== GREETINGS.length) {
      return
    }

    const timeline = gsap.timeline({
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(
            Math.round(state.value),
          ).padStart(2, '0')
        }
      },
      onComplete: () => {
        root.style.pointerEvents = 'none'
        onDone()
      },
    })

    gsap.set('.intro-loader-bar', {
      scaleX: 0,
      transformOrigin: 'left center',
    })

    gsap.set(counterRef.current, {
      y: 0,
    })

    gsap.set(greetingNodes, {
      autoAlpha: 0,
      y: 34,
      scale: 0.985,
      filter: 'blur(1.5px)',
      backgroundPosition: '130% 0',
    })

    gsap.set(
      greetingNodes.flatMap((node) =>
        Array.from(node.querySelectorAll<HTMLElement>('.intro-loader-letter')),
      ),
      {
        autoAlpha: 0,
        yPercent: 115,
        rotateX: -18,
      },
    )

    gsap.set(finalMessage, {
      autoAlpha: 0,
      y: 38,
      scale: 0.985,
      filter: 'blur(1.5px)',
      backgroundPosition: '130% 0',
    })

    gsap.set(
      Array.from(
        finalMessage.querySelectorAll<HTMLElement>('.intro-loader-letter'),
      ),
      {
        autoAlpha: 0,
        yPercent: 115,
        rotateX: -18,
      },
    )

    const greetingLetters = greetingNodes.map((node) =>
      Array.from(
        node.querySelectorAll<HTMLElement>('.intro-loader-letter'),
      ),
    )

    GREETINGS.forEach((_, index) => {
      const node = greetingNodes[index]
      const letters = greetingLetters[index]
      const start = index * TIMING.greetingStep

      timeline
        .set(
          node,
          {
            backgroundPosition: '130% 0',
          },
          start,
        )
        .to(
          node,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: TIMING.greetingIn,
            ease: 'power4.out',
          },
          start,
        )
        .to(
          letters,
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.34,
            stagger: 0.032,
            ease: 'power4.out',
          },
          start + 0.025,
        )
        .to(
          node,
          {
            backgroundPosition: '-20% 0',
            duration: 0.72,
            ease: 'none',
          },
          start + 0.02,
        )
        .to(
          node,
          {
            y: -28,
            autoAlpha: 0,
            scale: 1.01,
            filter: 'blur(0.8px)',
            duration: TIMING.greetingOut,
            ease: 'power2.inOut',
          },
          start + TIMING.greetingIn + TIMING.greetingHold,
        )
        .to(
          letters,
          {
            autoAlpha: 0,
            yPercent: -45,
            rotateX: 14,
            duration: 0.2,
            stagger: 0.018,
            ease: 'power2.in',
          },
          start + TIMING.greetingIn + TIMING.greetingHold,
        )
    })

    const finalLetters = Array.from(
      finalMessage.querySelectorAll<HTMLElement>('.intro-loader-letter'),
    )

    timeline
      .set(
        finalMessage,
        {
          backgroundPosition: '130% 0',
        },
        finalStart,
      )
      .to(
        finalMessage,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: TIMING.finalIn,
          ease: 'power4.out',
        },
        finalStart,
      )
      .to(
        finalLetters,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.48,
          stagger: 0.045,
          ease: 'power4.out',
        },
        finalStart + 0.035,
      )
      .to(
        finalMessage,
        {
          backgroundPosition: '-20% 0',
          duration: 0.9,
          ease: 'none',
        },
        finalStart + 0.02,
      )
      .to(
        finalMessage,
        {
          scale: 1.012,
          duration: TIMING.finalHold,
          ease: 'sine.inOut',
        },
        finalStart + TIMING.finalIn,
      )
      .to(
        finalMessage,
        {
          autoAlpha: 0,
          y: -18,
          scale: 1.02,
          filter: 'blur(0.8px)',
          duration: TIMING.finalOut,
          ease: 'power2.inOut',
        },
        finalStart + TIMING.finalIn + TIMING.finalHold,
      )
      .to(
        '.intro-loader-bar',
        {
          scaleX: 1,
          duration: finalStart + TIMING.finalIn,
          ease: 'none',
        },
        0,
      )

    timeline
      .to(
        state,
        {
          value: 90,
          duration: finalStart,
          ease: 'none',
        },
        0,
      )
      .to(
        state,
        {
          value: 100,
          duration: TIMING.finalIn,
          ease: 'power2.out',
        },
        finalStart,
      )
      .to(
        counterRef.current,
        {
          y: -8,
          duration: 0.32,
          ease: 'power2.out',
        },
        finalStart,
      )
      .to(
        '.intro-loader',
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: TIMING.exitDuration,
          ease: 'power4.inOut',
        },
        loaderExitStart,
      )

    return () => {
      timeline.kill()
    }
  }, [onDone])

  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-loader-top">
        <span>KM.</span>
        <span>PORTFOLIO / 2026</span>
      </div>

      <div className="intro-loader-center">
        <div className="intro-loader-greeting-wrap">
          {GREETINGS.map((text, index) => (
            <span
              className="intro-loader-greeting"
              key={`${text}-${index}`}
            >
              {renderLetters(text, `greeting-${index}`)}
            </span>
          ))}

          <span className="intro-loader-final">
            {renderLetters(FINAL_MESSAGE, 'final')}
          </span>
        </div>
      </div>

      <div className="intro-loader-counter">
        <div
          ref={counterRef}
          className="intro-loader-number"
        >
          00
        </div>

        <div className="intro-loader-word">KESHAV MANTRY</div>
      </div>

      <div className="intro-loader-bottom">
        <span>LOADING EXPERIENCE</span>

        <div className="intro-loader-track">
          <div className="intro-loader-bar" />
        </div>

        <span>100</span>
      </div>
    </div>
  )
}
