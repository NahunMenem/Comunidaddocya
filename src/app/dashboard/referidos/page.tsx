'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Loader2 } from 'lucide-react'
import { fmt, fmtDate, initials, type Referido } from '@/lib/dashboard'

function EstadoBadge({ estado }: { estado: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pendiente:    { label: 'Por cobrar',   cls: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
    pagado:       { label: 'Cobrada',      cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
    anulado:      { label: 'Anulada',      cls: 'bg-red-500/15 text-red-400 border-red-500/25' },
    sin_consulta: { label: 'Sin consulta', cls: 'bg-slate-500/15 text-slate-400 border-slate-500/25' },
  }
  const { label, cls } = map[estado] ?? map['sin_consulta']
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

export default function ReferidosPage() {
  const [data, setData]     = useState<Referido[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t   = localStorage.getItem('docya_token')
    const s   = localStorage.getItem('docya_referente')
    if (!t || !s) return
    const ref = JSON.parse(s)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/referidos/${ref.id}/mis-referidos`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then(r => r.ok ? r.json() : { referidos: [] })
      .then(d => setData(d.referidos ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="px-5 md:px-8 py-8 md:py-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black mb-1">Mis Referidos</h1>
        <p className="text-slate-400 text-sm">Pacientes que se registraron usando tu código</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="glass rounded-2xl p-5 md:p-6">

        {/* Table header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-slate-400 text-sm">En tiempo real</span>
          </div>
          {!loading && (
            <span className="text-xs text-slate-500 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.06]">
              {data.length} {data.length === 1 ? 'referido' : 'referidos'}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 text-teal-400 animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-14 h-14 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 font-semibold text-lg">Todavía no tenés referidos</p>
            <p className="text-slate-600 text-sm mt-2">Compartí tu link o QR para empezar a ganar</p>
          </div>
        ) : (
          /* Desktop table */
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['PACIENTE / REFERIDO', 'ÚLTIMA CONSULTA', 'VENCIMIENTO', 'MONTO GANADO', 'ESTADO'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-slate-500 tracking-wider pb-4 pr-6 last:pr-0">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((r, i) => (
                    <motion.tr key={r.paciente_uuid}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pr-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/25 flex items-center justify-center text-teal-300 text-xs font-bold flex-shrink-0">
                            {initials(r.full_name)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{r.full_name}</p>
                            <p className="text-slate-500 text-xs">{r.localidad}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-6 text-slate-300">{fmt(r.ultima_consulta)}</td>
                      <td className="py-4 pr-6 text-slate-400 text-xs">{fmtDate(r.vence_en)}</td>
                      <td className="py-4 pr-6 font-bold text-white">
                        {r.monto_total > 0
                          ? `$${r.monto_total.toLocaleString('es-AR')}`
                          : <span className="text-slate-600 font-normal">—</span>}
                      </td>
                      <td className="py-4"><EstadoBadge estado={r.estado_pago} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {data.map((r, i) => (
                <motion.div key={r.paciente_uuid}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/25 flex items-center justify-center text-teal-300 text-xs font-bold flex-shrink-0">
                      {initials(r.full_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{r.full_name}</p>
                      <p className="text-slate-500 text-xs">{r.localidad}</p>
                    </div>
                    <EstadoBadge estado={r.estado_pago} />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500 mb-0.5">Consulta</p>
                      <p className="text-slate-300">{fmt(r.ultima_consulta)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-0.5">Vence</p>
                      <p className="text-slate-400">{fmtDate(r.vence_en)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-0.5">Ganado</p>
                      <p className="font-bold text-white">
                        {r.monto_total > 0 ? `$${r.monto_total.toLocaleString('es-AR')}` : '—'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
