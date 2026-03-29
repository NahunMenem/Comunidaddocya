'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from './Reveal'

function AnimatedNumber({ target, started }: { target: number; started: boolean }) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return

    const duration = 1800
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started, target])

  return (
    <span>
      ${value.toLocaleString('es-AR')}
    </span>
  )
}

const rows = [
  { label: '10 consultas', target: 10000, highlight: false },
  { label: '50 consultas', target: 50000, highlight: true },
  { label: '100 consultas', target: 100000, highlight: false, master: true },
]

export default function Earnings() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Hacé circular tu influencia
          </h2>
          <p className="text-slate-400 text-lg">
            Mirá lo que podés generar compartiendo salud.
          </p>
        </Reveal>

        <Reveal>
          <div className="max-w-lg mx-auto glass rounded-3xl overflow-hidden">
            {rows.map((row, i) => (
              <div
                key={row.target}
                className={`flex justify-between items-center px-8 py-6 ${
                  i < rows.length - 1 ? 'border-b border-white/[0.06]' : ''
                } ${row.master ? 'bg-teal-500/10' : row.highlight ? 'bg-white/[0.02]' : ''}`}
              >
                <span className={`text-base font-medium ${row.master ? 'text-white font-bold' : 'text-slate-300'}`}>
                  {row.label} =
                </span>
                <motion.span
                  className={`font-black tabular-nums ${
                    row.master ? 'text-3xl text-teal-400' : 'text-2xl text-white'
                  }`}
                >
                  <AnimatedNumber target={row.target} started={inView} />
                </motion.span>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-slate-500 text-sm">
            El potencial es infinito. Vos ponés la meta.
          </p>
        </Reveal>
      </div>
    </section>
  )
}