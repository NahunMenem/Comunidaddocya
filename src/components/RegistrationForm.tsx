'use client'

import { useState, FormEvent } from 'react'
import { Lock, CheckCircle, Loader2 } from 'lucide-react'
import Reveal from './Reveal'

type Status = 'idle' | 'loading' | 'success'

export default function RegistrationForm() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status !== 'idle') return

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data = {
      full_name: formData.get('full_name'),
      dni: formData.get('dni'),
      telefono: formData.get('telefono'),
      email: formData.get('email'),
      password: formData.get('password'),
      cbu_alias: formData.get('cbu_alias'),
      tipo: formData.get('tipo'),
      acepto_condiciones: true
    }

    try {
      setStatus('loading')

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referidos/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Error en registro')
      }

      setStatus('success')

      setTimeout(() => {
        setStatus('idle')
        form.reset()
      }, 4000)

    } catch (err: any) {
      alert(err.message)
      setStatus('idle')
    }
  }

  return (
    <section id="registro" className="py-28 px-6 relative">
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-3">Empezá hoy mismo</h2>
          <p className="text-slate-400 text-lg">
            Completá tus datos para obtener tu link de referidos
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Nombre completo
                </label>
                <input
                  name="full_name"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all font-body"
                />
              </div>

              {/* DNI + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">DNI</label>
                  <input
                    name="dni"
                    type="number"
                    placeholder="Sin puntos ni espacios"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">
                    Teléfono (WhatsApp)
                  </label>
                  <input
                    name="telefono"
                    type="tel"
                    placeholder="Ej: 1123456789"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Contraseña
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                />
              </div>

              {/* CBU */}
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Alias o CBU (Para recibir tus pagos)
                </label>
                <input
                  name="cbu_alias"
                  type="text"
                  placeholder="Ej: docya.pagos.ok"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                />
              </div>

              {/* Type select */}
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  ¿Cómo te considerás?
                </label>
                <select
                  name="tipo"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all appearance-none"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" disabled className="bg-[#0c1a2e]">
                    Seleccioná una opción
                  </option>
                  <option value="influencer" className="bg-[#0c1a2e]">
                    Influencer / Creador de contenido
                  </option>
                  <option value="embajador" className="bg-[#0c1a2e]">
                    Embajador (Tengo una gran red de contactos)
                  </option>
                  <option value="paciente" className="bg-[#0c1a2e]">
                    Paciente feliz (Quiero recomendar a mis amigos)
                  </option>
                  <option value="partner" className="bg-[#0c1a2e]">
                    Partner / Empresa
                  </option>
                </select>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-500 mt-2 ${
                  status === 'success'
                    ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                    : status === 'loading'
                    ? 'bg-teal-500/70 cursor-not-allowed'
                    : 'bg-teal-500 hover:bg-teal-600 hover:shadow-[0_0_30px_rgba(20,184,166,0.45)] hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer'
                } text-white`}
              >
                {status === 'loading' && (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
                {status === 'success' && (
                  <CheckCircle className="w-5 h-5" />
                )}
                {status === 'idle' && 'Quiero sumarme a la comunidad'}
                {status === 'loading' && 'Procesando...'}
                {status === 'success' && '¡Registro Exitoso!'}
              </button>

              <p className="text-center text-slate-500 text-sm flex items-center justify-center gap-2 pt-1">
                <Lock className="w-3.5 h-3.5" />
                Tus datos están seguros y encriptados
              </p>
              <p className="text-center text-slate-600 text-xs">
                Al registrarte aceptás nuestros{' '}
                <a href="#terminos" className="text-teal-500/70 hover:text-teal-400 underline underline-offset-2 transition-colors">
                  Términos y Condiciones
                </a>
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}