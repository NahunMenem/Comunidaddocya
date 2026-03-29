'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Loader2, LogIn, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referidos/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.detail ?? 'Error al iniciar sesión')
        return
      }

      localStorage.setItem('docya_token',    data.access_token)
      localStorage.setItem('docya_referente', JSON.stringify(data.referente))
      router.push('/dashboard')

    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">

        <div className="text-center mb-8">
          <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
            alt="DocYa" width={120} height={40} className="h-10 w-auto mx-auto mb-6 object-contain" unoptimized />
          <h1 className="text-3xl font-black mb-2">Panel de Embajadores</h1>
          <p className="text-slate-400">Ingresá con tu cuenta para ver tus ganancias</p>
        </div>

        <div className="glass rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Contraseña</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} required placeholder="Tu contraseña"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 transition-all pr-12" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </motion.p>
            )}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-base transition-all duration-200 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {loading ? 'Ingresando...' : 'Entrar al panel'}
            </button>
          </form>

          <p className="text-center text-slate-600 text-sm mt-6">
            ¿No tenés cuenta?{' '}
            <a href="/#registro" className="text-teal-500/70 hover:text-teal-400 underline underline-offset-2 transition-colors">
              Registrate como embajador
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
