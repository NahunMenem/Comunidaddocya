'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      
      {/* Radial background mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#0f2744]/80 blur-[140px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-[2px] uppercase bg-teal-500/10 border border-teal-500/25 text-teal-400"
        >
          Nuevo Programa de Referidos
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          Ganá dinero<br />
          recomendando{' '}
          <span className="text-teal-400 relative">
            salud real
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                d="M2 9C50 3 100 1 150 5C200 9 250 7 298 3"
                stroke="#14b8a6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          Sumate a la comunidad DocYa y ganá{' '}
          <strong className="text-white font-bold">$1.000</strong> por cada
          consulta realizada por tus referidos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href="#registro"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] hover:-translate-y-1 group"
          >
            Quiero empezar a ganar
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Floating stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-14"
        >
          {[
            { label: '100% gratis', icon: '✦' },
            { label: 'Pagos semanales', icon: '✦' },
            { label: 'Sin límite de ganancias', icon: '✦' },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-2 text-sm text-slate-400 px-4 py-2 rounded-full glass border-white/[0.06]"
            >
              <span className="text-teal-400 text-xs">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}