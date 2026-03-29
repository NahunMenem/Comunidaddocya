import { UserPlus, Share2, DollarSign } from 'lucide-react'
import Reveal from './Reveal'

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Te registrás',
    desc: 'Completás el formulario y creás tu cuenta en segundos. Es totalmente gratis.',
  },
  {
    icon: Share2,
    number: '02',
    title: 'Compartís',
    desc: 'Obtenés un link y QR único para compartir en tus redes o con conocidos.',
  },
  {
    icon: DollarSign,
    number: '03',
    title: 'Ganás dinero',
    desc: 'Por cada consulta realizada usando tu enlace, recibís $1.000 asegurados.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Cómo funciona</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Es simple, rápido y 100% transparente.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-12 left-[calc(16.6%+2rem)] right-[calc(16.6%+2rem)] h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.number} delay={i * 0.12}>
                <div className="glass rounded-2xl p-8 group hover:border-teal-500/20 hover:-translate-y-2 transition-all duration-400 cursor-default relative overflow-hidden">
                  {/* Large background number */}
                  <span className="absolute -top-3 -right-1 text-[7rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
                    {step.number}
                  </span>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}