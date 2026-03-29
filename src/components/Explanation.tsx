import Reveal from './Reveal'

export default function Explanation() {
  return (
    <section className="relative z-20 -mt-12 px-6 pb-4">
      <Reveal>
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-14 text-center">
          <div className="inline-flex items-center gap-2 mb-5 text-teal-400 text-sm font-bold tracking-widest uppercase">
            <span className="w-8 h-px bg-teal-400/50" />
            La plataforma
            <span className="w-8 h-px bg-teal-400/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-5">¿Qué es DocYa?</h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-4">
            DocYa es una app donde las personas pueden pedir un{' '}
            <strong className="text-white">médico a domicilio</strong> como si fuera un Uber.
          </p>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            Vos recomendás la app, y cada vez que alguien que invitaste usa DocYa,{' '}
            <strong className="text-white">
              ganás $1.000 por cada consulta durante 12 meses
            </strong>.
          </p>
        </div>
      </Reveal>
    </section>
  )
}