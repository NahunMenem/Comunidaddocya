import {
  Link2,
  BarChart2,
  CalendarCheck,
  Infinity,
  FileText,
  Pill,
  Home,
  MapPinned,
} from "lucide-react"
import Reveal from "./Reveal"

const benefits = [
  {
    icon: Link2,
    title: "Link y QR propio",
    desc: "Vas a tener tu enlace y QR personalizado para compartir DocYa en redes, WhatsApp, flyers o con tus contactos.",
  },
  {
    icon: BarChart2,
    title: "Panel transparente",
    desc: "Seguí en tiempo real tus referidos, sus consultas realizadas y el dinero acumulado por cobrar.",
  },
  {
    icon: CalendarCheck,
    title: "Pagos mensuales",
    desc: "Recibí tus comisiones de forma clara y ordenada, con seguimiento de todo lo generado.",
  },
  {
    icon: Infinity,
    title: "Sin límite",
    desc: "Cuantas más personas invitás, más consultas pueden generarse y más dinero podés ganar.",
  },
  {
    icon: FileText,
    title: "Certificados médicos",
    desc: "Uno de los beneficios más fuertes de DocYa: desde la app un médico puede emitir un certificado sin que la persona tenga que salir de su casa.",
  },
  {
    icon: Pill,
    title: "Recetas médicas",
    desc: "El profesional también puede indicar recetas médicas, haciendo que la experiencia sea mucho más útil y completa para el paciente.",
  },
  {
    icon: Home,
    title: "Atención en domicilio",
    desc: "DocYa permite resolver síntomas, controles o molestias desde casa, evitando traslados y esperas innecesarias.",
  },
  {
    icon: MapPinned,
    title: "Seguimiento en tiempo real",
    desc: "El paciente puede ver en el mapa cuándo llega el médico, como en una app de movilidad.",
  },
]

export default function Benefits() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/[0.04] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Beneficios de ser embajador DocYa
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            No solo ganás dinero recomendando la app. También tenés argumentos
            reales para compartir una solución de salud que resuelve problemas
            concretos de la gente, como atención médica en casa, certificados,
            recetas y seguimiento en tiempo real.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-7 group hover:border-teal-500/20 hover:-translate-y-1 transition-all duration-300 cursor-default h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>

                  <h4 className="font-bold text-base mb-3 text-white">
                    {b.title}
                  </h4>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="text-center mt-14">
          <p className="text-xl font-semibold text-white">
            DocYa no es solo una app para referir.
          </p>
          <p className="text-slate-400 mt-3 max-w-3xl mx-auto leading-relaxed">
            Es una solución fácil de recomendar porque la gente entiende rápido
            su valor: pedir un médico a domicilio, obtener certificados o recetas
            y resolver una necesidad real sin moverse de su casa.
          </p>
        </Reveal>
      </div>
    </section>
  )
}