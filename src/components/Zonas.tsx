'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Reveal from './Reveal'

const MapLeaflet = dynamic(() => import('./MapLeaflet'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%' }} className="flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
    </div>
  ),
})

type Zona = { id: number; nombre: string; detalle: string }

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Zonas() {
  const [activas, setActivas] = useState<Zona[]>([])
  const [proximas, setProximas] = useState<Zona[]>([])

  useEffect(() => {
    fetch(`${API_URL}/zonas-cobertura`)
      .then((r) => r.json())
      .then((data) => {
        setActivas(data.activas ?? [])
        setProximas(data.proximas ?? [])
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 text-teal-400 text-sm font-bold tracking-widest uppercase">
            <span className="w-8 h-px bg-teal-400/50" />
            Cobertura
            <span className="w-8 h-px bg-teal-400/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Dónde estamos disponibles
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Hoy operamos en Buenos Aires y alrededores. Estamos creciendo rápido.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <div className="glass rounded-3xl overflow-hidden" style={{ height: '420px' }}>
              <MapLeaflet />
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
                  </span>
                  <h3 className="text-sm font-bold text-teal-400 tracking-widest uppercase">Disponible ahora</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activas.map((z) => (
                    <div key={z.id} className="flex items-start gap-3 p-3 rounded-xl bg-teal-500/5 border border-teal-500/15">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-white text-sm">{z.nombre}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{z.detalle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-500 border-dashed" />
                  <h3 className="text-sm font-bold text-slate-500 tracking-widest uppercase">Próximamente</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {proximas.map((z) => (
                    <div key={z.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-400 text-sm">{z.nombre}</p>
                        <p className="text-slate-600 text-xs mt-0.5">{z.detalle}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-xs mt-4 pt-4 border-t border-white/[0.05]">
                  ¿Querés que lleguemos a tu ciudad?{' '}
                  <a href="#registro" className="text-teal-500/60 hover:text-teal-400 underline underline-offset-2 transition-colors">
                    Registrate como embajador
                  </a>{' '}
                  y ayudanos a crecer.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
