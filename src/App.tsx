import React, { useState, useEffect, useRef } from 'react'
import Button from './generated/Button'
import ProductCard from './generated/ProductCard'
import Input from './generated/Input'
import NavItem from './generated/NavItem'
import Toast from './generated/Toast'
import './App.css'

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, duration = 1200 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(ease * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, duration])
  return <span ref={ref}>{val}</span>
}

// ── Reveal on scroll ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── Terminal error block ──────────────────────────────────────────────────────
function TerminalError({ lines }: { lines: { type: 'error'|'hint'|'code'|'blank'; text: string }[] }) {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-title">framelab compile</span>
      </div>
      <div className="terminal-body">
        {lines.map((l, i) => (
          <div key={i} className={`terminal-line terminal-${l.type}`}>
            {l.type === 'error' && <span className="terminal-prefix">✗ </span>}
            {l.type === 'hint'  && <span className="terminal-prefix">  </span>}
            {l.text}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Code panel ────────────────────────────────────────────────────────────────
function CodePanel({ label, lang, children }: {
  label: string; lang: string; children: string
}) {
  return (
    <div className="code-panel">
      <div className="code-panel-header">
        <span className="code-panel-lang">{lang}</span>
        <span className="code-panel-label">{label}</span>
      </div>
      <pre className="code-panel-body"><code>{children}</code></pre>
    </div>
  )
}

// ── Feature pill ─────────────────────────────────────────────────────────────
function Feature({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <div>
        <div className="feature-title">{title}</div>
        <div className="feature-body">{body}</div>
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState<'framelab'|'react'|'css'>('framelab')
  const [lastIntent, setLastIntent] = useState<string | null>(null)

  const framelabCode = `component AddToCart(product: Product) {
  surface {
    fill:    token(surface.raised)
    radius:  token(radius.button)
    padding: token(space.inset.sm)

    state hover  { depth: 2 }
    state active { scale: 0.98 }
    state disabled { opacity: 0.4 }
  }

  tap "Add to Cart" → addToCart(@product) as primary
}`

  const reactCode = `export default function AddToCart({ product }: Props) {
  const [hovered, setHovered] = useState(false)
  const [active, setActive]   = useState(false)

  return (
    <button
      className={clsx(
        styles.surface,
        hovered  && styles.surfaceHover,
        active   && styles.surfaceActive,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={() => addToCart(product)}
      aria-label="Add to cart"
    >
      Add to Cart
    </button>
  )
}`

  const cssCode = `.surface {
  background: var(--surface-raised);
  border-radius: var(--radius-button);
  padding: var(--space-inset-sm);
  transition: box-shadow 120ms ease,
              transform  120ms ease;
}
.surfaceHover  { box-shadow: var(--depth-2); }
.surfaceActive { transform: scale(0.98); }
.surfaceDisabled { opacity: 0.4; }`

  return (
    <div className="page">

      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <span className="nav-logo-text">FRAMELAB</span>
            <span className="nav-tag">v0.1</span>
          </div>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#solution">Solution</a>
            <a href="#constraints">Constraints</a>
            <a href="#pipeline">Pipeline</a>
          </div>
          <a href="#pipeline" className="nav-cta">See the compiler →</a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="container">
          <Reveal>
            <div className="hero-eyebrow">Design-first language</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="hero-title">
              Write design intent.<br />
              <span className="hero-title-accent">Get production UI.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">
              FRAMELAB compiles <code>.fl</code> files into React components with
              tokens, states, accessibility, and motion — automatically enforced.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-actions">
              <a href="#solution" className="btn-primary">See it in action</a>
              <a href="#constraints" className="btn-ghost">Design system teams →</a>
            </div>
          </Reveal>
          <Reveal delay={320} className="hero-component-wrap">
            <div className="hero-component-label">
              <span className="live-dot" /> Live — emitted from <code>src/framelab/demo.fl</code>
            </div>
            <div className="hero-stage">
              <ProductCard
                titleText="Oak Frame Chair"
                categoryText="Living room"
                priceText="$248"
                href="#product-card"
                slots={{
                  thumbnail: <div className="demo-thumbnail" />,
                  actions: <span className="demo-pill">Ships in 2 days</span>,
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-dogfood" id="dogfood">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow">Compiler dogfood</div>
            <h2 className="section-title">Five real demo components now ship from <code>demo.fl</code>.</h2>
            <p className="section-sub">
              The demo now builds Button, ProductCard, Input, NavItem, and Toast through the compiler CLI.
              Motion still warns for Toast, and the emitted subset stays explicit rather than hiding unsupported behavior.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="dogfood-nav">
              <NavItem
                labelText="Overview"
                href="#solution"
                slots={{ icon: <span className="demo-nav-icon" /> }}
              />
              <NavItem
                emphasis="current"
                labelText="Compiler"
                href="#pipeline"
                slots={{ icon: <span className="demo-nav-icon demo-nav-icon-active" />, badge: <span className="demo-nav-badge">Live</span> }}
              />
              <NavItem
                emphasis="suppressed"
                labelText="Warnings"
                href="#dogfood"
                slots={{ icon: <span className="demo-nav-icon" />, badge: <span className="demo-nav-badge demo-nav-badge-muted">1</span> }}
              />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="dogfood-grid">
              <ProductCard
                titleText="FrameLab Compiler Tee"
                categoryText="Demo merchandise"
                priceText="$32"
                href="#product-demo"
                slots={{
                  thumbnail: <div className="demo-thumbnail demo-thumbnail-shirt" />,
                  actions: <span className="demo-pill">Built from slots</span>,
                }}
              />

              <div className="dogfood-column">
                <Input
                  tone="danger"
                  labelText="Email address"
                  valueText="compiler@framelab.dev"
                  hintText="Current emitter renders a presentational field, not a native input control."
                />

                <div className="dogfood-actions">
                  <Button
                    labelText="Run compiler"
                    onIntent={setLastIntent}
                  />
                  <Button
                    tone="ghost"
                    labelText="Preview output"
                    onIntent={setLastIntent}
                  />
                </div>

                <Toast
                  tone="warning"
                  messageText="Toast motion still emits a warning in the current React subset."
                  onIntent={setLastIntent}
                  slots={{
                    icon: <span className="demo-toast-icon" />,
                    action: <span className="demo-toast-action">Dismiss</span>,
                  }}
                />

                <div className="dogfood-log">
                  <span className="dogfood-log-label">Last emitted intent</span>
                  <code>{lastIntent ?? 'none yet'}</code>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────── */}
      <section className="section section-problem" id="problem">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow">The problem</div>
            <h2 className="section-title">Every design system<br />eventually drifts.</h2>
            <p className="section-sub">
              You spend months building tokens, components, and guidelines.
              Then the codebase ignores them.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="drift-pipeline">
              {[
                { icon: '🎨', label: 'Design', sub: 'Figma, tokens, guidelines' },
                { icon: '📄', label: 'Specs', sub: 'Written docs, Notion pages' },
                { icon: '💻', label: 'Handwritten code', sub: 'Developers interpret manually' },
                { icon: '💥', label: 'Drift', sub: 'System intent is lost', bad: true },
              ].map((step, i) => (
                <div key={i} className="drift-step-wrap">
                  <div className={`drift-step ${step.bad ? 'drift-step-bad' : ''}`}>
                    <div className="drift-step-icon">{step.icon}</div>
                    <div className="drift-step-label">{step.label}</div>
                    <div className="drift-step-sub">{step.sub}</div>
                  </div>
                  {i < 3 && <div className="drift-arrow">↓</div>}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="problems-grid">
              {[
                ['🎨', 'Token violations', 'Hardcoded colors, magic spacing numbers instead of design tokens.'],
                ['📐', 'Spacing drift', 'padding: 14px when the system defines 12 or 16. Nothing in between.'],
                ['🕳️', 'Missing states', 'Hover works. Loading never got built. Error was forgotten entirely.'],
                ['♿', 'Accessibility gaps', 'aria-label, role, focus management — added as afterthoughts, if at all.'],
                ['🔀', 'Team divergence', 'Three teams. Three versions of the same card component.'],
                ['📚', 'Docs as rules', 'Guidelines nobody reads. Nothing machine-enforceable.'],
              ].map(([icon, title, body]) => (
                <div key={title} className="problem-card">
                  <span className="problem-icon">{icon}</span>
                  <div className="problem-title">{title}</div>
                  <div className="problem-body">{body}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Solution / Before & After ─────────────────────────── */}
      <section className="section section-solution" id="solution">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow">The solution</div>
            <h2 className="section-title">Design intent becomes<br />executable.</h2>
            <p className="section-sub">
              FRAMELAB is a declarative language where layout, tokens, states,
              and accessibility are first-class concepts — not CSS you write by hand.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="before-after">
              <div className="ba-side ba-before">
                <div className="ba-label ba-label-bad">✗ Without FRAMELAB</div>
                <pre className="ba-code"><code>{`<button class="bg-blue-600
  hover:bg-blue-700
  px-4 py-2 rounded-md
  text-white font-medium">
  Add to Cart
</button>`}</code></pre>
                <div className="ba-issues">
                  {[
                    'Hardcoded styles — tokens not enforced',
                    'Hover managed manually in markup',
                    'No loading, error, or disabled state',
                    'No accessible label on the button',
                    'Impossible to lint or compile-check',
                  ].map(t => <div key={t} className="ba-issue">✗ {t}</div>)}
                </div>
              </div>

              <div className="ba-divider">
                <div className="ba-divider-line" />
                <div className="ba-divider-badge">vs</div>
                <div className="ba-divider-line" />
              </div>

              <div className="ba-side ba-after">
                <div className="ba-label ba-label-good">✓ With FRAMELAB</div>
                <pre className="ba-code"><code>{`tap "Add to Cart"
  → addToCart(@product)
  as primary`}</code></pre>
                <div className="ba-issues">
                  {[
                    'token(color.action.primary) — enforced',
                    'All states declared, all states compiled',
                    'aria-label inferred from context',
                    'Hover, active, disabled — zero boilerplate',
                    'Compiler rejects token violations',
                  ].map(t => <div key={t} className="ba-win">✓ {t}</div>)}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Code tab viewer */}
          <Reveal delay={150}>
            <p className="section-sub" style={{ marginTop: '64px' }}>
              One component. The compiler writes everything below.
            </p>
            <div className="tab-viewer">
              <div className="tab-bar">
                {(['framelab','react','css'] as const).map(t => (
                  <button
                    key={t}
                    className={`tab-btn ${tab === t ? 'tab-btn-active' : ''}`}
                    onClick={() => setTab(t)}
                  >
                    {t === 'framelab' ? '📝 component.fl'
                   : t === 'react' ? '⚛️  AddToCart.tsx'
                   :                 '🎨 AddToCart.module.css'}
                  </button>
                ))}
              </div>
              <pre className="tab-code"><code>
                {tab === 'framelab' ? framelabCode
               : tab === 'react' ? reactCode
               : cssCode}
              </code></pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Constraints ───────────────────────────────────────── */}
      <section className="section section-constraints" id="constraints">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow constraints-eyebrow">For design system teams</div>
            <h2 className="section-title section-title-light">
              Your design system becomes<br />
              <span className="accent-underline">enforceable infrastructure.</span>
            </h2>
            <p className="section-sub section-sub-light">
              Today a design system is documentation. With FRAMELAB, it's
              compile-time rules. The wrong thing cannot be built and merged.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="constraints-grid">
              <div className="constraints-left">
                <CodePanel label="constraints.fl" lang="framelab">
{`constraints {

  // No magic numbers anywhere
  forbid hardcoded: color
  forbid hardcoded: spacing
  forbid hardcoded: radius

  // Text must use text tokens
  require token(color.text.*)
    on: all text nodes

  // Structural rules
  forbid nesting: Card inside Card
  forbid nesting: Modal inside Modal

  // A11y rules
  require accessible label
    on: all intent nodes

}`}
                </CodePanel>
              </div>

              <div className="constraints-right">
                <div className="constraint-example">
                  <div className="ce-label">Someone writes this:</div>
                  <pre className="ce-code"><code>{`surface {
  fill: #FF0000  // ← hardcoded color
}`}</code></pre>
                </div>

                <div className="constraint-arrow">↓</div>

                <TerminalError lines={[
                  { type: 'code',  text: '$ framelab build' },
                  { type: 'blank', text: '' },
                  { type: 'error', text: 'FRAMELAB_TOK_001  Hardcoded color value \'#FF0000\'' },
                  { type: 'hint',  text: '  components/Button.fl:4:10' },
                  { type: 'hint',  text: '  Use token(color.*) instead.' },
                  { type: 'blank', text: '' },
                  { type: 'error', text: '1 error. Build failed.' },
                ]} />

                <div className="constraint-result">
                  The PR fails before the violation reaches review.
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="pitch-block">
              <div className="pitch-quote">
                "Design system rules are now compile-time errors,
                not Notion pages."
              </div>
              <div className="pitch-body">
                FRAMELAB ships with a constraint DSL. Design system teams write the rules once.
                Every engineer on every team gets them enforced automatically —
                in CI, in their editor, before anything merges.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AI section ────────────────────────────────────────── */}
      <section className="section section-ai">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow">AI + FRAMELAB</div>
            <h2 className="section-title">
              AI generates UI.<br />FRAMELAB keeps it compliant.
            </h2>
            <p className="section-sub">
              AI can write UI faster than any developer. But it produces
              random spacing, hardcoded colors, and missing states.
              FRAMELAB is the guardrail layer.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="ai-pipeline">
              {[
                { label: 'AI', sub: 'generates .fl', icon: '🤖' },
                { label: 'FRAMELAB compiler', sub: 'enforces constraints', icon: '⚙️', accent: true },
                { label: 'React output', sub: 'design-system compliant', icon: '✅' },
              ].map((s, i) => (
                <div key={i} className="ai-pipeline-wrap">
                  <div className={`ai-step ${s.accent ? 'ai-step-accent' : ''}`}>
                    <div className="ai-step-icon">{s.icon}</div>
                    <div className="ai-step-label">{s.label}</div>
                    <div className="ai-step-sub">{s.sub}</div>
                  </div>
                  {i < 2 && <div className="ai-arrow">→</div>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pipeline ──────────────────────────────────────────── */}
      <section className="section section-pipeline" id="pipeline">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow">The compiler</div>
            <h2 className="section-title">A real pipeline, not magic.</h2>
            <p className="section-sub">
              FRAMELAB is a fully implemented compiler. Every step is inspectable.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="pipeline-steps">
                {[
                { n:'1', label:'demo.fl',            sub:'Five demo components',             active:true  },
                { n:'2', label:'tokenize()',         sub:'120 tokens, source locations'              },
                { n:'3', label:'parse()',            sub:'ComponentDecl AST'                         },
                { n:'4', label:'lint()',             sub:'Constraint rules checked'                  },
                { n:'5', label:'emit()',             sub:'React artifacts in src/generated', active:true  },
              ].map((s, i) => (
                <div key={i} className="ps-wrap">
                  <div className={`ps-step ${s.active ? 'ps-step-active' : ''}`}>
                    <div className="ps-num">{s.n}</div>
                    <div className="ps-info">
                      <div className="ps-label">{s.label}</div>
                      <div className="ps-sub">{s.sub}</div>
                    </div>
                  </div>
                  {i < 4 && <div className="ps-arrow">↓</div>}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="live-output">
              <div className="live-output-label">
                <span className="live-dot" />
                Live compiled output — generated components from <code>demo.fl</code>
              </div>
              <div className="live-stage">
                <div className="live-stage-stack">
                  <Button labelText="Compiler ready" tone="danger" onIntent={setLastIntent} />
                  <Toast
                    messageText="Dogfood build completed through the CLI."
                    slots={{ icon: <span className="demo-toast-icon demo-toast-icon-success" /> }}
                    onIntent={setLastIntent}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="section section-features">
        <div className="container">
          <Reveal>
            <div className="section-eyebrow">What the compiler handles</div>
            <h2 className="section-title">Zero boilerplate.<br />All enforced.</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="features-grid">
              <Feature icon="🎨" title="Design tokens"
                body="token(color.text.primary) compiles to var(--color-text-primary). Change the token once, update everywhere. Hardcoded values are a compile error." />
              <Feature icon="✋" title="States"
                body="Declare state hover { depth: 4 } and get :hover CSS + useState wired automatically. Loading, error, disabled — all handled." />
              <Feature icon="♿" title="Accessibility"
                body="text as heading level: 2 emits <h2>. Roles, aria-labels, focus management, and keyboard nav come from the spec, not afterthoughts." />
              <Feature icon="🌙" title="Reduced motion"
                body="Every motion block auto-generates a prefers-reduced-motion media query. It's not optional — it's built into the language." />
              <Feature icon="📐" title="Layout"
                body="stack(direction: vertical) compiles to display:flex. grid { columns: auto-fill } compiles to a fluid tile grid. No CSS to write." />
              <Feature icon="🔌" title="Reactive signals"
                body="createSignal, createMemo, createEffect. Zero-dependency reactive runtime. Bindings compile directly — no useState hunting." />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="section section-stats">
        <div className="container">
          <Reveal>
            <div className="stats-grid">
              {[
                { n: 45,  label: 'tokens produced',    sub: 'from demo.fl' },
                { n: 38,  label: 'assertions passed',  sub: 'full pipeline test' },
                { n: 11,  label: 'files emitted',      sub: '5 components + CSS' },
                { n: 1,   label: 'warnings',           sub: 'toast motion unsupported' },
              ].map(s => (
                <div key={s.label} className="stat">
                  <div className="stat-number"><Counter to={s.n} /></div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">FRAMELAB</span>
          <span className="footer-copy">v0.1 · Built with ChatGPT + Claude · Design-first UI language</span>
        </div>
      </footer>

    </div>
  )
}
