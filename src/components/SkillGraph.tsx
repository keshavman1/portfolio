import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const skills = [
  { name: 'Java', value: 94 },
  { name: 'Spring Boot', value: 92 },
  { name: 'Microservices', value: 88 },
  { name: 'REST APIs', value: 86 },
  { name: 'SQL', value: 82 },
  { name: 'Kafka', value: 72 },
  { name: 'AWS', value: 70 },
  { name: 'React', value: 68 },
  { name: 'Node.js', value: 66 },
  { name: 'TypeScript', value: 60 },
]

const cx = 50
const cy = 50
const radius = 34

function point(index: number, value = 100) {
  const angle = -Math.PI / 2 + (index / skills.length) * Math.PI * 2
  const r = radius * (value / 100)
  return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]
}

export function SkillGraph() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to('.skill-node-dot', {
        opacity: 0.35,
        scale: 0.65,
        duration: 1.3,
        stagger: { each: 0.15, repeat: -1, yoyo: true },
        ease: 'sine.inOut',
      })
      gsap.to('.skill-radar-area', {
        opacity: 0.8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const outline = skills.map((_, i) => point(i, 100).join(',')).join(' ')
  const data = skills.map((skill, i) => point(i, skill.value).join(',')).join(' ')

  return (
    <div ref={ref} className="skill-graph" aria-label="Core technology stack visualization">
      <div className="skill-graph-grid" />
      <svg viewBox="0 0 100 100" role="img">
        <defs>
          <linearGradient id="skillRadarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.035)" />
          </linearGradient>
          <filter id="skillGlow">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon
            key={scale}
            className="skill-grid-ring"
            points={skills.map((_, i) => point(i, 100 * scale).join(',')).join(' ')}
          />
        ))}

        {skills.map((_, i) => {
          const [x, y] = point(i, 100)
          return <line key={i} className="skill-axis" x1="50" y1="50" x2={x} y2={y} />
        })}

        <polygon className="skill-radar-area" points={data} fill="url(#skillRadarGradient)" />
        <polygon className="skill-radar-line" points={data} filter="url(#skillGlow)" />

        {skills.map((skill, i) => {
          const [x, y] = point(i, 100)
          return (
            <g key={skill.name}>
              <circle className="skill-node-dot" cx={x} cy={y} r="1.55" />
              <text
                className="skill-label"
                x={x + (x >= 50 ? 2.4 : -2.4)}
                y={y + (y >= 50 ? 3.1 : -2.2)}
                textAnchor={x >= 50 ? 'start' : 'end'}
              >
                {skill.name}
              </text>
            </g>
          )
        })}
        <circle className="skill-core" cx="50" cy="50" r="3.2" />
        <circle className="skill-core-pulse" cx="50" cy="50" r="3.2" />
      </svg>

      <div className="skill-graph-center">
        <span>CORE</span>
        <strong>STACK</strong>
      </div>
      <div className="skill-graph-caption">10 technologies · backend led · full-stack capable</div>
    </div>
  )
}
