'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, FileText, Shield, AlertTriangle, Scale } from 'lucide-react'
import Reveal from './Reveal'

const sections = [
  {
    number: '1',
    title: 'Objeto',
    icon: FileText,
    content: (
      <p>
        El presente documento regula la participación en el programa de referidos de DocYa, mediante el cual
        los usuarios podrán obtener recompensas económicas por referir nuevos pacientes a la plataforma.
      </p>
    ),
  },
  {
    number: '2',
    title: 'Definiciones',
    icon: FileText,
    content: (
      <ul className="space-y-2">
        <li><span className="text-teal-400 font-semibold">Referente:</span> Usuario registrado que comparte su enlace o código de referido.</li>
        <li><span className="text-teal-400 font-semibold">Referido:</span> Nuevo usuario que se registra en DocYa a través del enlace o código del referente.</li>
        <li><span className="text-teal-400 font-semibold">Consulta válida:</span> Atención médica efectivamente realizada y abonada a través de la plataforma.</li>
      </ul>
    ),
  },
  {
    number: '3',
    title: 'Condiciones del programa',
    icon: Shield,
    content: (
      <ul className="space-y-2">
        <li>El referente recibirá una recompensa de <span className="text-white font-bold">$1.000 ARS</span> por cada consulta válida realizada por un usuario referido.</li>
        <li>La recompensa se generará únicamente cuando:</li>
        <ul className="ml-4 mt-1 space-y-1 text-slate-400">
          <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> El referido se haya registrado correctamente mediante el enlace del referente.</li>
          <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> La consulta haya sido efectivamente realizada.</li>
          <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> El pago haya sido confirmado.</li>
        </ul>
      </ul>
    ),
  },
  {
    number: '4',
    title: 'Duración del beneficio',
    icon: FileText,
    content: (
      <ul className="space-y-2">
        <li>El referente percibirá la recompensa por las consultas realizadas por el referido durante un período de <span className="text-white font-bold">12 (doce) meses</span> contados desde la fecha de registro del referido.</li>
        <li className="text-slate-400">Finalizado dicho período, no se generarán nuevas recompensas por ese referido.</li>
      </ul>
    ),
  },
  {
    number: '5',
    title: 'Liquidación y pagos',
    icon: FileText,
    content: (
      <ul className="space-y-2">
        <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> Las recompensas se acumularán en la cuenta del referente.</li>
        <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> DocYa realizará los pagos de forma semanal o mensual (a definir operativamente).</li>
        <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> Podrán establecerse montos mínimos para el retiro de fondos.</li>
        <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> Los pagos podrán realizarse mediante transferencia bancaria, billeteras virtuales u otros medios definidos por DocYa.</li>
      </ul>
    ),
  },
  {
    number: '6',
    title: 'Prohibiciones y uso indebido',
    icon: AlertTriangle,
    content: (
      <div className="space-y-4">
        <p className="text-white font-semibold">Queda estrictamente prohibido:</p>
        <ul className="space-y-1.5">
          {[
            'Autoreferirse o crear cuentas falsas para generar recompensas.',
            'Utilizar identidades falsas o datos de terceros sin consentimiento.',
            'Realizar prácticas fraudulentas o manipulaciones del sistema.',
            'Generar consultas ficticias o con el único fin de obtener beneficios económicos.',
          ].map((item) => (
            <li key={item} className="flex gap-2 text-slate-400">
              <span className="text-red-400 mt-1 flex-shrink-0">✕</span> {item}
            </li>
          ))}
        </ul>
        <p className="text-white font-semibold mt-4">DocYa se reserva el derecho de:</p>
        <ul className="space-y-1.5">
          {[
            'Retener o cancelar recompensas ante detección de fraude.',
            'Suspender o eliminar cuentas involucradas en conductas indebidas.',
            'Anular referidos que no cumplan con las condiciones.',
          ].map((item) => (
            <li key={item} className="flex gap-2 text-slate-400">
              <span className="text-teal-500 mt-1 flex-shrink-0">›</span> {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: '7',
    title: 'Modificaciones del programa',
    icon: FileText,
    content: (
      <div className="space-y-3">
        <p>DocYa podrá modificar el monto de las recompensas, cambiar las condiciones del programa, o suspenderlo en cualquier momento.</p>
        <p className="text-slate-400">Estas modificaciones no afectarán las recompensas ya generadas hasta la fecha de cambio.</p>
      </div>
    ),
  },
  {
    number: '8',
    title: 'Responsabilidad',
    icon: Shield,
    content: (
      <div className="space-y-2">
        <p>DocYa no garantiza un nivel mínimo de ingresos para el referente ni cantidad de consultas por referido.</p>
        <p className="text-slate-400">El programa es un beneficio opcional sujeto a la actividad real de los usuarios referidos.</p>
      </div>
    ),
  },
  {
    number: '9',
    title: 'Relación entre las partes',
    icon: FileText,
    content: (
      <ul className="space-y-2">
        <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> La participación no implica relación laboral, societaria ni de representación entre DocYa y el referente.</li>
        <li className="flex gap-2"><span className="text-teal-500 mt-1">›</span> El referente actúa de forma independiente.</li>
      </ul>
    ),
  },
  {
    number: '10',
    title: 'Impuestos',
    icon: FileText,
    content: (
      <p>Cada participante será responsable de declarar y abonar los impuestos que pudieran corresponder según la normativa vigente.</p>
    ),
  },
  {
    number: '11',
    title: 'Cancelación de cuentas',
    icon: AlertTriangle,
    content: (
      <p>DocYa podrá suspender o cancelar la cuenta del usuario en caso de incumplimiento de estos términos o ante actividad sospechosa o fraudulenta.</p>
    ),
  },
  {
    number: '12',
    title: 'Aceptación',
    icon: Shield,
    content: (
      <p>Al participar en el programa de referidos, el usuario declara haber leído, comprendido y aceptado los presentes Términos y Condiciones.</p>
    ),
  },
  {
    number: '13',
    title: 'Jurisdicción',
    icon: Scale,
    content: (
      <p>Estos términos se rigen por las leyes de la <span className="text-white font-semibold">República Argentina</span>. Cualquier controversia será sometida a los tribunales competentes de la <span className="text-white font-semibold">Ciudad Autónoma de Buenos Aires</span>.</p>
    ),
  },
]

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: (typeof sections)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = section.icon

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-teal-500/30 bg-teal-500/[0.04]'
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-teal-500/60 w-5 flex-shrink-0">{section.number}.</span>
          <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
          <span className={`font-semibold text-sm md:text-base transition-colors ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {section.title}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-400' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/[0.05] pt-4">
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TermsAndConditions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [accepted, setAccepted] = useState(false)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="terminos" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/[0.04] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5 text-teal-400 text-sm font-bold tracking-widest uppercase">
            <span className="w-8 h-px bg-teal-400/50" />
            Legal
            <span className="w-8 h-px bg-teal-400/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Términos y Condiciones</h2>
          <p className="text-slate-500 text-sm">
            Programa de Referidos – DocYa &nbsp;·&nbsp; Última actualización: Marzo 2025
          </p>
        </Reveal>

        {/* Accordion */}
        <Reveal delay={0.1}>
          <div className="space-y-2 mb-10">
            {sections.map((section, i) => (
              <AccordionItem
                key={section.number}
                section={section}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </Reveal>

        {/* Acceptance box */}
        <Reveal delay={0.15}>
          <div className={`glass rounded-2xl p-6 border transition-all duration-500 ${accepted ? 'border-teal-500/40 bg-teal-500/[0.06]' : 'border-white/[0.07]'}`}>
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${accepted ? 'bg-teal-500 border-teal-500' : 'border-white/20 group-hover:border-teal-500/50'}`}>
                  {accepted && (
                    <motion.svg
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="w-3 h-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </div>
              </div>
              <div>
                <p className={`font-semibold transition-colors ${accepted ? 'text-white' : 'text-slate-300'}`}>
                  He leído y acepto los Términos y Condiciones
                </p>
                <p className="text-slate-500 text-sm mt-0.5">
                  Al registrarme confirmo que comprendo las reglas del programa de referidos de DocYa.
                </p>
              </div>
            </label>

            <AnimatePresence>
              {accepted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-4 pt-4 border-t border-teal-500/20 flex items-center gap-2 text-teal-400 text-sm font-medium"
                >
                  <Shield className="w-4 h-4" />
                  Aceptado — podés continuar con tu registro
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}