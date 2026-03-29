import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import Reveal from "./Reveal"

export default function DashboardPreview() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* TITULO */}
        <Reveal className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black">
            Seguimiento real de tus ganancias
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
            Desde tu panel vas a poder ver exactamente cuántas personas invitaste,
            cuántas consultas realizaron y cuánto dinero generaste.
          </p>
        </Reveal>

        {/* SCREENSHOT */}
        <Reveal>
          <div className="glass rounded-3xl p-4 md:p-6 border border-white/10 shadow-2xl">
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774398561/Captura_de_pantalla_2026-03-24_212822_jzwtgw.png"
              alt="Dashboard DocYa"
              width={1200}
              height={700}
              className="rounded-2xl w-full h-auto"
            />
          </div>
        </Reveal>

        {/* BENEFICIOS */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-all">
              <CheckCircle2 className="mx-auto text-[#14B8A6] mb-3" />
              <h3 className="font-bold text-lg mb-2">
                Referidos en tiempo real
              </h3>
              <p className="text-slate-400 text-sm">
                Visualizá cuántas personas se registraron con tu link.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-all">
              <CheckCircle2 className="mx-auto text-[#14B8A6] mb-3" />
              <h3 className="font-bold text-lg mb-2">
                Consultas generadas
              </h3>
              <p className="text-slate-400 text-sm">
                Sabé cuántas consultas hicieron tus referidos.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-all">
              <CheckCircle2 className="mx-auto text-[#14B8A6] mb-3" />
              <h3 className="font-bold text-lg mb-2">
                Ganancias acumuladas
              </h3>
              <p className="text-slate-400 text-sm">
                Todo lo que generaste listo para cobrar.
              </p>
            </div>
          </Reveal>

        </div>

        {/* FRASE FUERTE */}
        <Reveal delay={0.4} className="text-center mt-14">
          <p className="text-xl text-white font-semibold">
            No es promesa. Es seguimiento real de tus resultados.
          </p>
          <p className="text-slate-400 mt-2">
            En DocYa podés ver exactamente cuánto estás generando.
          </p>
        </Reveal>

      </div>
    </section>
  )
}