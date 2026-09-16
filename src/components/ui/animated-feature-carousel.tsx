"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react"
import { Link } from "react-router-dom"
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Types ---
export interface FeatureCarouselItem {
  id: string
  /** Rótulo curto usado na navegação (ex.: título do projeto) */
  name: string
  eyebrow: string
  title: string
  description: string
  href: string
  /** Primeira imagem é a principal; a segunda (opcional) entra sobreposta */
  images: string[]
  tags?: string[]
  badge?: { label: string; tone: "live" | "soon" }
}

export interface FeatureCarouselLabels {
  cta: string
  previous: string
  next: string
  pause: string
  play: string
  navigation: string
}

interface FeatureCarouselProps {
  items: FeatureCarouselItem[]
  labels: FeatureCarouselLabels
  /** Duração de cada slide em ms */
  interval?: number
  className?: string
}

// --- Constants ---
const EASE = [0.22, 1, 0.36, 1] as const
const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.6 } as const
const SWIPE_THRESHOLD = 50

const BADGE_TONES = {
  live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  soon: "bg-amber-500/15 text-amber-400 border-amber-500/30",
} as const

// Composições alternadas para dar ritmo visual entre os slides
const LAYOUTS = [
  { main: "left-0 top-0 w-[82%]", second: "right-0 bottom-0 w-[52%]", from: -24 },
  { main: "right-0 top-0 w-[82%]", second: "left-0 bottom-0 w-[52%]", from: 24 },
] as const

const textVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.35, ease: EASE },
  }),
}

// --- Hooks ---
/**
 * Ciclo automático baseado em progresso (0→1). Pausa sem perder o tempo
 * decorrido, o que mantém a barra de progresso fluida.
 */
function useAutoCycle(total: number, interval: number, paused: boolean) {
  const [current, setCurrent] = useState(0)
  const progress = useMotionValue(0)

  const goTo = useCallback(
    (index: number) => {
      progress.set(0)
      setCurrent(((index % total) + total) % total)
    },
    [progress, total]
  )

  // O delta do framer-motion é limitado a 40ms/frame; medimos o tempo real
  // (com teto) para o ciclo não atrasar em telas com FPS baixo.
  const lastTime = useRef<number | null>(null)
  useAnimationFrame((time) => {
    const delta = lastTime.current === null ? 0 : Math.min(time - lastTime.current, 1000)
    lastTime.current = time
    if (paused || total < 2) return
    const next = progress.get() + delta / interval
    if (next >= 1) {
      progress.set(0)
      setCurrent((prev) => (prev + 1) % total)
    } else {
      progress.set(next)
    }
  })

  return { current, goTo, progress }
}

function useCanHover() {
  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return canHover
}

// --- Components ---
// A div externa posiciona e reage ao hover (transform do Tailwind);
// a imagem interna recebe o transform da animação do framer-motion.
function StageImage({ src, alt, className, imgClassName, delay = 0, fromX = 0 }: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  delay?: number
  fromX?: number
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className={cn("absolute transition-transform duration-500 ease-out", className)}>
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        initial={{ opacity: 0, x: fromX, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ ...SPRING, delay }}
        className={cn(
          "aspect-[16/10] w-full select-none rounded-xl object-cover object-top",
          "border border-muted/15 bg-background shadow-2xl shadow-black/50",
          imgClassName
        )}
      />
    </div>
  )
}

function Spotlight({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const background = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(31,111,235,0.14), transparent 70%)`
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background }}
    />
  )
}

function StepsNav({ items, current, progress, onChange }: {
  items: FeatureCarouselItem[]
  current: number
  progress: MotionValue<number>
  onChange: (index: number) => void
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(e: KeyboardEvent<HTMLOListElement>) {
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: items.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    const index = (keys[e.key] + items.length) % items.length
    onChange(index)
    refs.current[index]?.focus()
  }

  return (
    <ol className="flex flex-wrap items-center justify-center gap-2" onKeyDown={handleKeyDown}>
      {items.map((item, index) => {
        const isCurrent = current === index
        return (
          <li key={item.id}>
            <button
              ref={(el) => { refs.current[index] = el }}
              type="button"
              tabIndex={isCurrent ? 0 : -1}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`${index + 1}. ${item.name}`}
              onClick={() => onChange(index)}
              className={cn(
                "relative flex min-h-11 min-w-11 items-center justify-center gap-2 overflow-hidden rounded-full px-3.5 text-sm font-medium",
                "transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isCurrent
                  ? "bg-primary/15 text-text ring-1 ring-inset ring-primary/40"
                  : "bg-surface text-muted hover:bg-surface/70 hover:text-text"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300",
                  isCurrent ? "bg-primary text-on-primary" : "bg-background/60"
                )}
              >
                {index + 1}
              </span>
              <span className="hidden max-w-[10rem] truncate md:inline">{item.name}</span>
              {isCurrent && (
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary-light"
                  style={{ scaleX: progress }}
                />
              )}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

export function FeatureCarousel({ items, labels, interval = 6000, className }: FeatureCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.35 })
  const prefersReducedMotion = useReducedMotion()
  const canHover = useCanHover()

  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const paused = userPaused || hovered || focused || !inView || !!prefersReducedMotion

  const { current, goTo, progress } = useAutoCycle(items.length, interval, paused)
  const item = items[current]
  const layout = LAYOUTS[current % LAYOUTS.length]

  // Spotlight que segue o cursor (apenas dispositivos com hover real)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLElement>) {
    if (!canHover) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Swipe horizontal no mobile; bloqueia o clique do link se houve arraste
  const swipeStart = useRef<number | null>(null)
  const swiped = useRef(false)
  function handlePointerDown(e: PointerEvent) {
    swipeStart.current = e.clientX
    swiped.current = false
  }
  function handlePointerUp(e: PointerEvent) {
    if (swipeStart.current === null) return
    const dx = e.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      swiped.current = true
      goTo(current + (dx < 0 ? 1 : -1))
    }
  }

  if (!item) return null

  const controlButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-muted/15 bg-surface text-muted transition-colors duration-200 hover:border-primary/40 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.navigation}
        className={cn("mx-auto flex w-full max-w-6xl flex-col gap-8", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
        }}
      >
        <Link
          to={item.href}
          aria-label={`${item.title} — ${labels.cta}`}
          onClick={(e) => {
            if (swiped.current) e.preventDefault()
          }}
          onMouseMove={handleMouseMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { swipeStart.current = null }}
          draggable={false}
          className={cn(
            "group relative block cursor-pointer touch-pan-y overflow-hidden rounded-3xl",
            "border border-muted/15 bg-surface/60 backdrop-blur-sm",
            "shadow-[0_0_40px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-300",
            "hover:border-primary/40 hover:shadow-[0_0_40px_rgba(31,111,235,0.15)]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          )}
        >
          <Spotlight x={mouseX} y={mouseY} />

          <div
            aria-live={paused ? "polite" : "off"}
            className="relative z-10 grid gap-8 p-6 sm:p-8 md:min-h-[420px] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-10 md:p-10"
          >
            {/* Texto */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                className="flex flex-col gap-4"
              >
                <motion.div custom={0} variants={textVariants} className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-light">
                    {item.eyebrow}
                  </span>
                  {item.badge && (
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider",
                      BADGE_TONES[item.badge.tone]
                    )}>
                      {item.badge.tone === "live" && (
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      )}
                      {item.badge.label}
                    </span>
                  )}
                </motion.div>

                <motion.h3
                  custom={1}
                  variants={textVariants}
                  className="text-2xl font-bold tracking-tight text-text transition-colors duration-300 group-hover:text-primary-light md:text-3xl"
                >
                  {item.title}
                </motion.h3>

                <motion.p custom={2} variants={textVariants} className="line-clamp-4 text-base leading-relaxed text-muted">
                  {item.description}
                </motion.p>

                {item.tags && item.tags.length > 0 && (
                  <motion.ul custom={3} variants={textVariants} className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-muted/15 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted">
                        {tag}
                      </li>
                    ))}
                  </motion.ul>
                )}

                <motion.span
                  custom={4}
                  variants={textVariants}
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors duration-300 group-hover:bg-primary-hover"
                >
                  {labels.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.span>
              </motion.div>
            </AnimatePresence>

            {/* Palco das imagens — proporção fixa evita layout shift */}
            <div className="relative aspect-[16/11] w-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={item.id}
                  className="absolute inset-0"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <StageImage
                    src={item.images[0]}
                    alt={item.title}
                    fromX={layout.from}
                    className={cn(
                      item.images[1] ? layout.main : "inset-x-0 top-1/2 w-full -translate-y-1/2",
                      "group-hover:scale-[1.02]"
                    )}
                  />
                  {item.images[1] && (
                    <StageImage
                      src={item.images[1]}
                      alt=""
                      delay={0.08}
                      fromX={-layout.from}
                      className={cn(layout.second, "group-hover:-translate-y-1.5")}
                      imgClassName="ring-4 ring-background/80"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Link>

        {/* Controles */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <StepsNav items={items} current={current} progress={progress} onChange={goTo} />
          <div className="flex items-center gap-2">
            <button type="button" className={controlButton} aria-label={labels.previous} onClick={() => goTo(current - 1)}>
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
            <button type="button" className={controlButton} aria-label={labels.next} onClick={() => goTo(current + 1)}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
