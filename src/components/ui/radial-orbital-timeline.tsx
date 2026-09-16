"use client"

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent,
} from "react"
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion"
import { Building2, Calendar, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Types ---
export interface OrbitalTimelineItem {
  id: string
  /** Rótulo curto exibido abaixo do nó da órbita */
  label: string
  title: string
  subtitle: string
  date: string
  content: string
  icon: ElementType
  status: "current" | "completed"
}

export interface OrbitalTimelineLabels {
  region: string
  current: string
  completed: string
  previous: string
  next: string
  pause: string
  play: string
}

interface RadialOrbitalTimelineProps {
  items: OrbitalTimelineItem[]
  labels: OrbitalTimelineLabels
  /** Velocidade da rotação automática em graus por segundo */
  speed?: number
  className?: string
}

// --- Constants ---
const NODE_SIZE = 48
const TOP_ANGLE = -90
const EASE = [0.22, 1, 0.36, 1] as const
const HOLD_AFTER_SELECT = 2500

const STATUS_STYLES = {
  current: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  completed: "border-muted/20 bg-muted/10 text-muted",
} as const

// --- Hooks ---
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, width] as const
}

// --- Components ---
function OrbitNode({ item, index, total, rotation, radius, selected, onSelect, onKeyDown, buttonRef, panelId }: {
  item: OrbitalTimelineItem
  index: number
  total: number
  rotation: MotionValue<number>
  radius: MotionValue<number>
  selected: boolean
  onSelect: () => void
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void
  buttonRef: (el: HTMLButtonElement | null) => void
  panelId: string
}) {
  const offset = (index / total) * 360
  const x = useTransform([rotation, radius], ([r, rad]: number[]) => rad * Math.cos(((r + offset) * Math.PI) / 180))
  const y = useTransform([rotation, radius], ([r, rad]: number[]) => rad * Math.sin(((r + offset) * Math.PI) / 180))
  // Profundidade: 1 no topo da órbita, 0 na base
  const depth = useTransform(rotation, (r) => (1 - Math.sin(((r + offset) * Math.PI) / 180)) / 2)
  const opacity = useTransform(depth, (d) => 0.55 + 0.45 * d)
  const zIndex = useTransform(depth, (d) => Math.round(10 + 10 * d))
  const Icon = item.icon

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x,
        y,
        zIndex: selected ? 30 : zIndex,
        opacity: selected ? 1 : opacity,
        marginLeft: -NODE_SIZE / 2,
        marginTop: -NODE_SIZE / 2,
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        role="tab"
        aria-selected={selected}
        aria-controls={panelId}
        tabIndex={selected ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        className="group relative flex flex-col items-center rounded-full focus:outline-none"
      >
        {/* Halo */}
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,111,235,0.35)_0%,transparent_70%)] transition-opacity duration-500",
            selected ? "opacity-100 motion-safe:animate-pulse" : "opacity-0 group-hover:opacity-60"
          )}
        />
        <span
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
            "group-focus-visible:ring-2 group-focus-visible:ring-primary-light group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
            selected
              ? "scale-110 border-primary-light bg-primary text-on-primary shadow-[0_0_24px_rgba(31,111,235,0.55)]"
              : "border-muted/30 bg-surface text-muted group-hover:border-primary/60 group-hover:text-text"
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span
          className={cn(
            "mt-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide transition-colors duration-300",
            selected ? "bg-background/80 text-text" : "text-muted group-hover:text-text"
          )}
        >
          {item.label}
        </span>
      </button>
    </motion.div>
  )
}

function PanelContent({ item, index, total, labels }: {
  item: OrbitalTimelineItem
  index: number
  total: number
  labels: OrbitalTimelineLabels
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
          STATUS_STYLES[item.status]
        )}>
          {item.status === "current" && (
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          )}
          {item.status === "current" ? labels.current : labels.completed}
        </span>
        <span className="text-xs font-semibold tabular-nums text-muted">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary-light">
        <Calendar className="h-4 w-4" aria-hidden />
        {item.date}
      </span>

      <div>
        <h3 className="text-2xl font-bold text-text">{item.title}</h3>
        <p className="mt-1 flex items-start gap-2 text-lg font-medium text-muted">
          <Building2 className="mt-1.5 h-4 w-4 shrink-0 text-primary-light" aria-hidden />
          {item.subtitle}
        </p>
      </div>

      <p className="leading-relaxed text-muted">{item.content}</p>
    </div>
  )
}

export default function RadialOrbitalTimeline({ items, labels, speed = 6, className }: RadialOrbitalTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [orbitRef, orbitWidth] = useElementWidth<HTMLDivElement>()
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(rootRef, { amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  const [selected, setSelected] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const paused = userPaused || hovered || focused || !inView || !!prefersReducedMotion

  // Nó selecionado começa no topo da órbita
  const rotation = useMotionValue(TOP_ANGLE)
  const radius = useMotionValue(0)
  useEffect(() => {
    // Espaço reservado para o nó e o rótulo abaixo dele
    radius.set(Math.max(0, orbitWidth / 2 - NODE_SIZE))
  }, [orbitWidth, radius])

  // Rotação contínua com tempo real (o delta do framer é limitado a 40ms/frame)
  const lastTime = useRef<number | null>(null)
  const spinTo = useRef<AnimationPlaybackControls | null>(null)
  // Após uma seleção manual, o nó fica parado no topo por um instante
  const holdUntil = useRef(0)
  useAnimationFrame((time) => {
    const delta = lastTime.current === null ? 0 : Math.min(time - lastTime.current, 1000)
    lastTime.current = time
    if (paused || spinTo.current || performance.now() < holdUntil.current) return
    rotation.set(rotation.get() + (delta / 1000) * speed)
  })

  function select(index: number) {
    const next = (index + items.length) % items.length
    setSelected(next)

    // Gira pelo menor caminho até o nó escolhido ficar no topo
    const current = rotation.get()
    const desired = TOP_ANGLE - (next / items.length) * 360
    const diff = ((((desired - current) % 360) + 540) % 360) - 180
    spinTo.current?.stop()
    if (prefersReducedMotion) {
      rotation.set(current + diff)
      spinTo.current = null
      return
    }
    spinTo.current = animate(rotation, current + diff, {
      type: "spring",
      stiffness: 70,
      damping: 18,
      onComplete: () => {
        spinTo.current = null
        holdUntil.current = performance.now() + HOLD_AFTER_SELECT
      },
    })
  }

  useEffect(() => () => spinTo.current?.stop(), [])

  function handleNodeKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = {
      ArrowRight: selected + 1,
      ArrowDown: selected + 1,
      ArrowLeft: selected - 1,
      ArrowUp: selected - 1,
      Home: 0,
      End: items.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    const index = (keys[e.key] + items.length) % items.length
    select(index)
    nodeRefs.current[index]?.focus()
  }

  const item = items[selected]
  if (!item) return null
  const panelId = "orbital-timeline-panel"
  const ItemIcon = item.icon

  const controlButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-muted/15 bg-surface text-muted transition-colors duration-200 hover:border-primary/40 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        role="region"
        aria-label={labels.region}
        className={cn("grid items-center gap-6 lg:grid-cols-2 lg:gap-16", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
        }}
      >
        {/* Órbita */}
        <div ref={orbitRef} className="relative mx-auto aspect-square w-full max-w-[420px]" role="tablist" aria-orientation="horizontal">
          {/* Anéis */}
          <div aria-hidden className="absolute inset-[48px] rounded-full border border-muted/15" />
          <div aria-hidden className="absolute inset-[22%] rounded-full border border-dashed border-primary/20 motion-safe:animate-[spin_60s_linear_infinite]" />
          <div aria-hidden className="absolute inset-[48px] rounded-full bg-[radial-gradient(circle,rgba(31,111,235,0.10)_0%,transparent_65%)]" />

          {/* Núcleo */}
          <div aria-hidden className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="absolute h-20 w-20 rounded-full border border-primary-light/25 motion-safe:animate-ping [animation-duration:2.4s]" />
            <span className="absolute h-24 w-24 rounded-full border border-primary/15 motion-safe:animate-ping [animation-delay:0.8s] [animation-duration:2.4s]" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-light via-primary to-primary-hover shadow-[0_0_40px_rgba(31,111,235,0.45)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                  className="text-on-primary"
                >
                  <ItemIcon className="h-6 w-6" />
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          {orbitWidth > 0 &&
            items.map((node, index) => (
              <OrbitNode
                key={node.id}
                item={node}
                index={index}
                total={items.length}
                rotation={rotation}
                radius={radius}
                selected={index === selected}
                onSelect={() => select(index)}
                onKeyDown={handleNodeKeyDown}
                buttonRef={(el) => { nodeRefs.current[index] = el }}
                panelId={panelId}
              />
            ))}
        </div>

        {/* Painel de detalhes */}
        <div className="flex flex-col gap-6">
          <div
            id={panelId}
            role="tabpanel"
            aria-live="polite"
            className="glass relative overflow-hidden rounded-2xl p-6 md:p-8"
          >
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            {/* Todas as etapas empilhadas e invisíveis reservam a altura da maior,
                evitando que o painel e os controles "pulem" na troca */}
            <div className="grid">
              {items.map((entry, index) => (
                <div key={entry.id} aria-hidden className="invisible [grid-area:1/1]">
                  <PanelContent item={entry} index={index} total={items.length} labels={labels} />
                </div>
              ))}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="[grid-area:1/1]"
                >
                  <PanelContent item={item} index={selected} total={items.length} labels={labels} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-2 lg:justify-start">
            <button type="button" className={controlButton} aria-label={labels.previous} onClick={() => select(selected - 1)}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            {!prefersReducedMotion && (
              <button
                type="button"
                className={controlButton}
                aria-label={userPaused ? labels.play : labels.pause}
                aria-pressed={userPaused}
                onClick={() => setUserPaused((p) => !p)}
              >
                {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
            <button type="button" className={controlButton} aria-label={labels.next} onClick={() => select(selected + 1)}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
