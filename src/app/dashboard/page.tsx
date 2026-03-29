'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, TrendingUp, DollarSign, Clock,
  Copy, CheckCheck, QrCode, Download, X, Loader2,
} from 'lucide-react'
import type { Referente, Stats } from '@/lib/dashboard'

// ── StatCard ──────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color = 'teal', delay = 0 }: {
  icon: React.ElementType; label: string; value: string
  sub?: string; color?: 'teal' | 'emerald' | 'amber' | 'blue'; delay?: number
}) {
  const c = {
    teal:    'bg-teal-500/10 text-teal-400 border-teal-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }} className="glass rounded-2xl p-5 md:p-6">
      <div className={`inline-flex p-2.5 rounded-xl border mb-4 ${c[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </motion.div>
  )
}

// ── QR Modal ──────────────────────────────────────────────────────
function QRModal({ link, onClose }: { link: string; onClose: () => void }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&color=0f172a&bgcolor=f0fdfa&data=${encodeURIComponent(link)}`

  const download = useCallback(() => {
    const img = imgRef.current
    if (!img) return
    const canvas = document.createElement('canvas')
    canvas.width = 280; canvas.height = 280
    canvas.getContext('2d')!.drawImage(img, 0, 0, 280, 280)
    const a = document.createElement('a')
    a.download = 'qr-referido-docya.png'
    a.href = canvas.toDataURL('image/png')
    a.click()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass rounded-3xl p-8 max-w-sm w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-black mb-1">Tu QR de referido</h2>
        <p className="text-slate-400 text-sm mb-6">Compartilo en redes o imprimilo.</p>
        <div className="flex justify-center mb-6">
          <div className="rounded-2xl overflow-hidden p-3 bg-[#f0fdfa] relative" style={{ width: 304, height: 304 }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={qrUrl} alt="QR" width={280} height={280}
              crossOrigin="anonymous" onLoad={() => setLoaded(true)}
              className={loaded ? 'block' : 'invisible'} style={{ borderRadius: 8 }} />
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 font-mono mb-6 truncate px-2">{link}</p>
        <button onClick={download} disabled={!loaded}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]">
          <Download className="w-4 h-4" /> Descargar PNG
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function PanelPage() {
  const [referente, setReferente] = useState<Referente | null>(null)
  const [stats, setStats]         = useState<Stats | null>(null)
  const [loading, setLoading]     = useState(true)
  const [copied, setCopied]       = useState(false)
  const [showQR, setShowQR]       = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('docya_token')
    const s = localStorage.getItem('docya_referente')
    if (!t || !s) return
    const ref: Referente = JSON.parse(s)
    setReferente(ref)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/referidos/${ref.id}/stats`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setStats(d))
      .finally(() => setLoading(false))
  }, [])

  const copyLink = () => {
    if (!referente) return
    navigator.clipboard.writeText(referente.link_referido)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  if (!referente) return null

  return (
    <div className="px-5 md:px-8 py-8 md:py-10 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black mb-1">
          Hola, {referente.full_name.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-400 text-sm">
          Panel de embajador · Código:{' '}
          <span className="text-teal-400 font-bold">{referente.codigo_referido}</span>
        </p>
      </motion.div>

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-white/5 mb-4" />
              <div className="h-3 w-20 bg-white/5 rounded mb-2" />
              <div className="h-8 w-16 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users}      label="Referidos"        value={String(stats?.total_referidos ?? 0)}                                              sub="Registrados"           color="blue"    delay={0}   />
          <StatCard icon={TrendingUp} label="Consultas"        value={String(stats?.total_consultas_validas ?? 0)}                                      sub="Válidas realizadas"    color="teal"    delay={0.1} />
          <StatCard icon={DollarSign} label="Total acumulado"  value={`$${(stats?.monto_total_acumulado ?? 0).toLocaleString('es-AR')}`}               sub="Ganancias totales"     color="emerald" delay={0.2} />
          <StatCard icon={Clock}      label="Por cobrar"       value={`$${(stats?.monto_pendiente ?? 0).toLocaleString('es-AR')}`}                     sub="Se acredita el viernes" color="amber"  delay={0.3} />
        </div>
      )}

      {/* Link */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }} className="glass rounded-2xl p-5 md:p-6 mb-5">
        <h2 className="text-base font-bold mb-1">Tu link de referido</h2>
        <p className="text-slate-400 text-sm mb-4">
          Ganás <strong className="text-white">${(stats?.precio_por_consulta ?? 1000).toLocaleString('es-AR')}</strong> por cada consulta realizada.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-teal-300 text-sm font-mono truncate">
            {referente.link_referido}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={copyLink}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                       : 'bg-teal-500 hover:bg-teal-600 text-white'}`}>
              {copied ? <><CheckCheck className="w-4 h-4" />¡Copiado!</> : <><Copy className="w-4 h-4" />Copiar</>}
            </button>
            <button onClick={() => setShowQR(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-slate-300 hover:text-white transition-all">
              <QrCode className="w-4 h-4" /> QR
            </button>
          </div>
        </div>
      </motion.div>

      



      <AnimatePresence>
        {showQR && <QRModal link={referente.link_referido} onClose={() => setShowQR(false)} />}
      </AnimatePresence>
    </div>
  )
}
