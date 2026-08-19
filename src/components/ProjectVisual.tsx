export function ProjectVisual({ kind }: { kind: 'architecture' | 'ai' | 'realtime' }) {
  const art = kind === 'ai' ? '/cogniscript-art.png' : kind === 'architecture' ? '/splitwise-art.png' : null

  if (art) {
    return (
      <div className={`project-visual project-visual-image project-visual-${kind}`}>
        <img src={art} alt={kind === 'ai' ? 'Abstract AI assessment interface visual' : 'Abstract expense sharing architecture visual'} />
        <div className="project-visual-glow" aria-hidden="true" />
        <div className="project-visual-scan" aria-hidden="true" />
      </div>
    )
  }

  return <div className="project-visual project-visual-realtime"><div className="signal signal-a"/><div className="signal signal-b"/><div className="signal signal-c"/><div className="node">LIVE</div></div>
}
