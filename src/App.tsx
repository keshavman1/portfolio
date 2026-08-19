import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { FluidCanvas } from './components/FluidCanvas'
import { IntroLoader } from './components/IntroLoader'
import { Reveal } from './components/Reveal'
import { SectionLabel } from './components/SectionLabel'
import { ProjectVisual } from './components/ProjectVisual'
import { SkillGraph } from './components/SkillGraph'
import { CustomCursor } from './components/CustomCursor'
import { experience, projects, site } from './data/site'

import './styles.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const root = useRef<HTMLDivElement | null>(null)
  const [introDone, setIntroDone] = useState(false)

  const navItems = useMemo(
    () => [
      ['Work', '#work'],
      ['Experience', '#experience'],
      ['Contact', '#contact'],
    ],
    [],
  )

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      syncTouch: true,
    })

    const ctx = gsap.context(() => {
      /* ─────────────────────────────────────
         HERO ENTRY
      ───────────────────────────────────── */

      const heroTl = gsap.timeline({
        paused: true,
      })

      heroTl
        .from('.topbar', {
          y: -20,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0)

        .from(
          '.hero-role-display, .hero-name',
          {
            y: 26,
            opacity: 0,
            filter: 'blur(7px)',
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'filter',
          },
          0.08,
        )

        .from(
          '.hero-title-line',
          {
            yPercent: 120,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 1.15,
            stagger: 0.14,
            ease: 'power4.out',
            clearProps: 'filter',
          },
          0.18,
        )

        .from(
          '.hero-subline p',
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          0.65,
        )

        .from(
          '.hero-actions a',
          {
            y: 16,
            opacity: 0,
            scale: 0.97,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.72,
        )

        .from(
          '.hero-bottom-rule',
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.9,
            ease: 'power3.out',
          },
          0.82,
        )

      /* ─────────────────────────────────────
         SECTION HEADINGS
      ───────────────────────────────────── */

      gsap
        .utils
        .toArray<HTMLElement>(
          '.section-label, .stack-head h2, .experience-row h3, .project-copy h3, .contact-copy h2',
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            {
              y: 54,
              opacity: 0,
              clipPath: 'inset(0 0 100% 0)',
              filter: 'blur(6px)',
            },
            {
              y: 0,
              opacity: 1,
              clipPath: 'inset(0 0 0% 0)',
              filter: 'blur(0px)',
              duration: 0.95,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
                once: true,
              },
            },
          )
        })

      /* ─────────────────────────────────────
         BODY TEXT REVEALS
      ───────────────────────────────────── */

      gsap
        .utils
        .toArray<HTMLElement>(
          [
            '.stack-head p',
            '.experience-period',
            '.experience-role',
            '.experience-row p',
            '.project-kicker',
            '.project-copy p',
            '.contact-copy .eyebrow',
            '.contact-link',
          ].join(','),
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            {
              y: 24,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 91%',
                once: true,
              },
            },
          )
        })

      /* ─────────────────────────────────────
         METRIC / TAG / LIST ANIMATIONS
      ───────────────────────────────────── */

      gsap
        .utils
        .toArray<HTMLElement>(
          '.metric, .experience-row li, .tag-row span',
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            {
              y: 22,
              opacity: 0,
              scale: 0.97,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 94%',
                once: true,
              },
            },
          )
        })

      /* ─────────────────────────────────────
         VISUAL REVEALS
      ───────────────────────────────────── */

      gsap
        .utils
        .toArray<HTMLElement>(
          '.project-visual-wrap, .skill-graph',
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            {
              y: 34,
              opacity: 0,
              scale: 0.975,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 89%',
                once: true,
              },
            },
          )
        })

      /* ─────────────────────────────────────
         HERO PARALLAX
      ───────────────────────────────────── */

      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,

        onUpdate: (self) => {
          gsap.to('.hero-copy', {
            y: self.progress * -38,
            overwrite: true,
            duration: 0.2,
          })

          gsap.to('.hero-role-display', {
            y: self.progress * -12,
            overwrite: true,
            duration: 0.2,
          })
        },
      })

      /* ─────────────────────────────────────
         PARALLAX ELEMENTS
      ───────────────────────────────────── */

      gsap
        .utils
        .toArray<HTMLElement>('[data-parallax]')
        .forEach((el) => {
          const amount = Number(
            el.dataset.parallax ?? 0,
          )

          gsap.to(el, {
            yPercent: amount,
            ease: 'none',

            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })

      /* ─────────────────────────────────────
         CURSOR MAGNETIC HOVER
      ───────────────────────────────────── */

      gsap
        .utils
        .toArray<HTMLElement>(
          '[data-magnetic]',
        )
        .forEach((el) => {
          const move = (event: MouseEvent) => {
            const rect = el.getBoundingClientRect()

            const x =
              event.clientX -
              (rect.left + rect.width / 2)

            const y =
              event.clientY -
              (rect.top + rect.height / 2)

            gsap.to(el, {
              x: x * 0.08,
              y: y * 0.08,
              duration: 0.45,
              ease: 'power3.out',
            })
          }

          const reset = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.45)',
            })
          }

          el.addEventListener(
            'mousemove',
            move,
          )

          el.addEventListener(
            'mouseleave',
            reset,
          )

          return () => {
            el.removeEventListener(
              'mousemove',
              move,
            )

            el.removeEventListener(
              'mouseleave',
              reset,
            )
          }
        })

      /* ─────────────────────────────────────
         START HERO AFTER INTRO
      ───────────────────────────────────── */

      const revealHero = () => {
        heroTl.play(0)
      }

      window.addEventListener(
        'portfolio:intro-done',
        revealHero,
      )

      return () => {
        window.removeEventListener(
          'portfolio:intro-done',
          revealHero,
        )
      }
    }, root)

    /* ─────────────────────────────────────
       LENIS LOOP
    ───────────────────────────────────── */

    let raf = 0

    const loop = (time: number) => {
      lenis.raf(time)
      ScrollTrigger.update()
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={root}
      className="site-shell"
    >
      {!introDone && (
        <IntroLoader
          onDone={() => {
            setIntroDone(true)

            window.dispatchEvent(
              new Event(
                'portfolio:intro-done',
              ),
            )
          }}
        />
      )}

      {introDone && <CustomCursor />}

      <div
        className="grain"
        aria-hidden="true"
      />

      <div className="scroll-progress" />

      {/* ─────────────────────────────────────
          HEADER
      ───────────────────────────────────── */}

      <header className="topbar">
        <a
          className="brand"
          data-cursor="TOP"
          data-magnetic
          href="#top"
        >
          KSHV<span>.</span>
        </a>

        <nav>
          {navItems.map(
            ([label, href]) => (
              <a
                key={href}
                href={href}
                data-magnetic
              >
                {label}
              </a>
            ),
          )}
        </nav>

        <a
          className="availability"
          data-cursor="MAIL"
          data-magnetic
          href={`mailto:${site.email}`}
        >
          <span className="status-dot" />
          <span className="availability-label">
            Available
          </span>
        </a>
      </header>

      <main id="top">
        {/* ─────────────────────────────────────
            HERO
        ───────────────────────────────────── */}

        <section className="hero section">
          {introDone && <FluidCanvas />}

          <div className="hero-overlay" />

          <div className="hero-copy">
            <div className="hero-role-display">
              {site.role}
            </div>

            <div className="hero-name">
              {site.name}
            </div>

            <div className="hero-line-mask">
              <div className="hero-title-line title-sans">
                Building <em>ideas</em> into
              </div>
            </div>

            <div className="hero-line-mask">
              <div className="hero-title-line hero-main-word">
                software{' '}
                <span className="hero-asterisk">
                  ✳
                </span>
              </div>
            </div>
          </div>

          <div className="hero-subline">
            <div>
              <p>
                <span className="hero-quote-mark">
                  ✳
                </span>

                {site.intro}
              </p>

              <div className="hero-actions">
                <a
                  className="resume-download"
                  data-cursor="RESUME"
                  data-magnetic
                  href="/Keshav_Mantry_Resume.pdf"
                  download
                >
                  Download resume
                  <span>↓</span>
                </a>

                <a
                  className="hero-work-link"
                  data-cursor="WORK"
                  data-magnetic
                  href="#work"
                >
                  View my work
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hero-bottom-rule" />
        </section>

        {/* ─────────────────────────────────────
            TOOLKIT
        ───────────────────────────────────── */}

        <section className="section stack-section">
          <SectionLabel number="01">
            The toolkit
          </SectionLabel>

       
         <SkillGraph />
        </section>

        {/* ─────────────────────────────────────
            EXPERIENCE
        ───────────────────────────────────── */}

        <section
          className="section dark-section"
          id="experience"
        >
          <SectionLabel number="02">
            Experience
          </SectionLabel>

          <div className="experience-list">
            {experience.map(
              (item) => (
                <Reveal
                  className="experience-row"
                  key={item.company}
                >
                  <div className="experience-period">
                    {item.period}
                  </div>

                  <div>
                    <h3>
                      {item.company}
                    </h3>

                    <div className="experience-role">
                      {item.role} · {item.type}
                    </div>

                    <p>
                      {item.summary}
                    </p>

                    <ul>
                      {item.bullets.map(
                        (bullet) => (
                          <li key={bullet}>
                            {bullet}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </section>

        {/* ─────────────────────────────────────
            WORK
        ───────────────────────────────────── */}

        <section
          className="section work-section"
          id="work"
        >
          <SectionLabel number="03">
            Selected work
          </SectionLabel>

          <div className="project-list">
            {projects.map(
              (project) => (
                <Reveal
                  className="project-row"
                  key={project.title}
                >
                  <div
                    className="project-visual-wrap"
                    data-hover-card
                  >
                    <ProjectVisual
                      kind={
                        project.accent as
                          | 'architecture'
                          | 'ai'
                      }
                    />
                  </div>

                  <div className="project-copy">
                    <div className="project-kicker">
                      {project.kicker}
                    </div>

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.description}
                    </p>

                    <div className="tag-row">
                      {project.tags.map(
                        (tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        ),
                      )}
                    </div>

                    <a
                      className="project-github"
                      data-cursor="GITHUB"
                      data-magnetic
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                      <span>↗</span>
                    </a>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </section>

        {/* ─────────────────────────────────────
            CONTACT
        ───────────────────────────────────── */}

        <section
          className="section contact-section"
          id="contact"
        >
          <SectionLabel number="04">
            Contact
          </SectionLabel>

          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">
                Have an idea?
              </p>

              <h2>
                Let's build
                <br />
                <em>
                  something useful.
                </em>
              </h2>

              <a
                className="contact-link"
                data-cursor="MAIL"
                data-magnetic
                href={`mailto:${site.email}`}
              >
                {site.email} ↗
              </a>
            </div>

            <div
              className="contact-field"
              data-parallax="-8"
              aria-hidden="true"
            >
              <span>BUILD</span>
              <span>SHIP</span>
              <span>SCALE</span>
            </div>
          </div>

          <footer>
            <span>
              © {new Date().getFullYear()} Keshav Mantry
            </span>

            <div>
              <a href={site.linkedin}>
                LinkedIn
              </a>

              <a href={site.github}>
                GitHub
              </a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App