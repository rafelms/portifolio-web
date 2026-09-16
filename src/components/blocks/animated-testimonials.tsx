// animated-testimonials.tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
  className?: string
}

export function AnimatedTestimonials({
  title = "Avaliações do Projeto",
  subtitle = "Veja o impacto e o feedback de quem utiliza esta solução no dia a dia.",
  badgeText = "Aprovado por Clientes",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Tecnologias e Parceiros Envolvidos",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)
    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) return null

  return (
    <section ref={sectionRef} id="testimonials" className={`py-24 overflow-hidden bg-transparent ${className || ""}`}>
      <div className="px-4 md:px-6">
        <motion.div initial="hidden" animate={controls} variants={containerVariants} className="grid grid-cols-1 gap-16 w-full md:grid-cols-2 lg:gap-24">
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary-light border border-primary/20">
                  <Star className="mr-1 h-3.5 w-3.5 fill-primary-light"/>
                  <span>{badgeText}</span>
                </div>
              )}
              <h2 className="text-3xl font-bold tracking-tighter text-text sm:text-4xl md:text-5xl">{title}</h2>
              <p className="max-w-[600px] text-muted md:text-xl/relaxed">{subtitle}</p>
              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-10 bg-primary" : "w-2.5 bg-muted/25"
                    }`}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative h-full w-full">
            <div className="grid grid-cols-1 grid-rows-1">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="col-start-1 row-start-1 w-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 100,
                    scale: activeIndex === index ? 1 : 0.9,
                    pointerEvents: activeIndex === index ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ zIndex: activeIndex === index ? 10 : 0 }}
                >
                  <div className="bg-surface/80 border border-muted/15 shadow-[0_0_20px_rgba(212,212,212,0.06)] backdrop-blur-sm rounded-xl p-6 md:p-8 h-full flex flex-col">
                    <div className="mb-4 md:mb-6 flex gap-2">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <Star className="h-4 w-4 md:h-5 md:w-5 fill-primary-light text-primary-light" key={i}/>
                      ))}
                    </div>
                    <div className="relative mb-4 md:mb-6 flex-1">
                      <Quote className="absolute -top-2 -left-2 h-6 w-6 md:h-8 md:w-8 text-primary/30 rotate-180"/>
                      <p className="relative z-10 text-base md:text-lg font-medium leading-relaxed text-text">"{testimonial.content}"</p>
                    </div>
                    <Separator className="my-4"/>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12 border-primary/50">
                        <AvatarImage alt={testimonial.name} src={testimonial.avatar}/>
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-text text-sm md:text-base">{testimonial.name}</h3>
                        <p className="text-xs md:text-sm text-muted">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-primary/10 blur-xl pointer-events-none"></div>
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-primary/10 blur-xl pointer-events-none"></div>
          </motion.div>
        </motion.div>

        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate={controls} className="mt-24 text-center">
            <h3 className="text-sm font-medium text-muted mb-8">{trustedCompaniesTitle}</h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company) => (
                <div key={company} className="text-2xl font-semibold text-muted/60">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}