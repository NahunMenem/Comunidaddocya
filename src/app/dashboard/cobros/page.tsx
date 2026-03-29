'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Clock, TrendingUp, CalendarCheck } from 'lucide-react'
import type { Stats } from '@/lib/dashboard'

export default function CobrosPage() {
  const [stats, setStats]   = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem('docya_token')
    const s = localStorage.getItem('docya_referente')
    if (!t || !s) return
    const ref = JSON.parse(s)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/referidos/${ref.id}/stats`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setStats(d))
      .finally(() => setLoading(false))
  }, [])

  const cobrado   = (stats?.monto_total_acumulado ?? 0) - (stats?.monto_pendiente ?? 0)
  const pendiente = stats?.monto_pendiente ?? 0
  const total     = stats?.monto_total_acumulado ?? 0
  const pct       = total > 0 ? Math.round((cobrado / total) * 100) : 0

  return (
    <div className="px-5 md:px-8 py-8 md:py-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black mb-1">Cobros</h1>
        <p className="text-slate-400 text-sm">Estado de tus pagos y acreditaciones</p>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse h-24" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">

          {/* Resumen */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5 md:p-6">
              <div className="inline-flex p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-slate-400 text-sm mb-1">Total cobrado</p>
              <p className="text-2xl md:text-3xl font-black text-white">${cobrado.toLocaleString('es-AR')}</p>
            </div>
            <div className="glass rounded-2xl p-5 md:p-6">
              <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-slate-400 text-sm mb-1">Por cobrar</p>
              <p className="text-2xl md:text-3xl font-black text-white">${pendiente.toLocaleString('es-AR')}</p>
            </div>
          </motion.div>

          {/* Barra de progreso */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} className="glass rounded-2xl p-5 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-semibold text-white">Total acumulado</span>
              </div>
              <span className="text-2xl font-black text-white">${total.toLocaleString('es-AR')}</span>
            </div>
            <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>{pct}% cobrado</span>
              <span>{100 - pct}% pendiente</span>
            </div>
          </motion.div>

          {/* Info de pago */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }} className="glass rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Ciclo de pagos</p>
                <p className="text-slate-500 text-xs">Información sobre cuándo recibís tu dinero</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Frecuencia',   value: 'Semanal — todos los viernes' },
                { label: 'Método',       value: 'Transferencia bancaria / billetera virtual' },
                { label: 'Acreditación', value: 'CBU o Alias registrado en tu cuenta' },
                { label: 'Mínimo',       value: 'Sin monto mínimo para retirar' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-slate-200 font-medium text-right max-w-[55%]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      )}
    </div>
  )
}
