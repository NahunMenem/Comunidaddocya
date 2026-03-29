'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, CheckCheck, QrCode, X, Download, Loader2, Share2 } from 'lucide-react'
import type { Referente } from '@/lib/dashboard'

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

const SOCIAL_ASSETS = [
  {
    id: 'flyer1',
    label: 'Flyer para redes',
    hint: 'Ideal para stories de Instagram y WhatsApp',
    url: 'https://res.cloudinary.com/dqsacd9ez/image/upload/v1774746718/Dise%C3%B1o_sin_t%C3%ADtulo_27_ccfdfm.png',
    filename: 'docya-flyer-referidos.png',
  },
  {
    id: 'flyer2',
    label: '¡pedí un médico!',
    hint: 'Flyer comparativo ideal para Facebook y WhatsApp',
    url: 'https://res.cloudinary.com/dqsacd9ez/image/upload/v1774749421/Ped%C3%ADs_sushi._Ped%C3%ADs_supermercado._Ped%C3%ADs_taxi._tqdsxq.jpg',
    filename: 'docya-pedis-sushi.jpg',
  },
  {
    id: 'flyer3',
    label: '¿Necesitás certificado médico YA?',
    hint: 'Ideal para stories y estados de WhatsApp',
    url: 'https://res.cloudinary.com/dqsacd9ez/image/upload/v1774749989/Necesitas_certificado_m%C3%A9dico_YA_exl8bk.png',
    filename: 'docya-certificado-medico.png',
  },
]

async function downloadAsset(url: string, filename: string) {
  const res = await fetch(url)
  const blob = await res.blob()
  const href = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  a.click()
  URL.revokeObjectURL(href)
}

export default function MiLinkPage() {
  const [referente, setReferente]         = useState<Referente | null>(null)
  const [copied, setCopied]               = useState(false)
  const [showQR, setShowQR]               = useState(false)
  const [canShare, setCanShare]           = useState(false)
  const [downloading, setDownloading]     = useState<string | null>(null)

  useEffect(() => {
    const s = localStorage.getItem('docya_referente')
    if (s) setReferente(JSON.parse(s))
    setCanShare(!!navigator.share)
  }, [])

  const copyLink = () => {
    if (!referente) return
    navigator.clipboard.writeText(referente.link_referido)
    setCopied(true); setTimeout(() => setCopied(false), 2500)
  }

  const share = async () => {
    if (!referente || !navigator.share) return
    await navigator.share({
      title: 'DocYa — Médicos a domicilio',
      text: `Usá mi código ${referente.codigo_referido} en DocYa y pedí un médico a casa cuando lo necesites.`,
      url: referente.link_referido,
    })
  }

  if (!referente) return null

  return (
    <div className="px-5 md:px-8 py-8 md:py-10 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black mb-1">Mi Link</h1>
        <p className="text-slate-400 text-sm">Herramientas para compartir y difundir tu código</p>
      </motion.div>

      <div className="space-y-4">
        {/* Link display */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }} className="glass rounded-2xl p-5 md:p-6">
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-3">Tu link personalizado</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-teal-300 font-mono text-sm break-all">
              {referente.link_referido}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={copyLink}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                         : 'bg-teal-500 hover:bg-teal-600 text-white'}`}>
                {copied ? <><CheckCheck className="w-4 h-4" />¡Copiado!</> : <><Copy className="w-4 h-4" />Copiar</>}
              </button>
              {canShare && (
                <button onClick={share}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-slate-300 hover:text-white transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* QR */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }} className="glass rounded-2xl p-5 md:p-6">
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-3">Código QR</p>
          <p className="text-slate-400 text-sm mb-5">
            Ideal para Instagram Stories, imprimir en flyers o compartir por WhatsApp.
          </p>
          <button onClick={() => setShowQR(true)}
            className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-slate-200 hover:text-white font-semibold text-sm transition-all duration-200">
            <QrCode className="w-5 h-5 text-teal-400" />
            Ver y descargar QR
          </button>
        </motion.div>



        {/* Material para redes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} className="glass rounded-2xl p-5 md:p-6">
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-4">Material para redes sociales</p>
          <p className="text-slate-400 text-sm mb-5">Descargá el flyer oficial y compartilo en tus historias o grupos. ¡No olvides ponerle tu QR personalizado y tu link! 🔗✨</p>
          <div className="space-y-3">
            {SOCIAL_ASSETS.map(asset => (
              <div key={asset.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                {/* Preview */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt={asset.label}
                  className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{asset.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{asset.hint}</p>
                </div>
                <button
                  disabled={downloading === asset.id}
                  onClick={async () => {
                    setDownloading(asset.id)
                    try { await downloadAsset(asset.url, asset.filename) }
                    finally { setDownloading(null) }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-semibold text-sm transition-all flex-shrink-0">
                  {downloading === asset.id
                    ? <><Loader2 className="w-4 h-4 animate-spin" />Descargando…</>
                    : <><Download className="w-4 h-4" />Descargar</>}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} className="glass rounded-2xl p-5 md:p-6">
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-4">Tips para difundir</p>
          <div className="space-y-3">
            {[
              { emoji: '📱', text: 'Compartí tu link en stories de Instagram y TikTok' },
              { emoji: '💬', text: 'Envialo por WhatsApp a tus grupos familiares y de amigos' },
              { emoji: '🖨️', text: 'Imprimí el QR y pegalo en negocios o lugares con mucho tráfico' },
              { emoji: '📧', text: 'Incluilo en tu firma de email o bio de redes sociales' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-start gap-3 text-sm">
                <span className="text-lg leading-snug">{emoji}</span>
                <span className="text-slate-400 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showQR && <QRModal link={referente.link_referido} onClose={() => setShowQR(false)} />}
      </AnimatePresence>
    </div>
  )
}
