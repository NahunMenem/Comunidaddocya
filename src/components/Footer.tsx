import Image from 'next/image'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black/30 border-t border-white/[0.05] mt-10 pt-24 pb-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            No necesitás vender nada.
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto mb-10">
            Solo compartir una solución rápida y segura que la gente realmente
            necesita.
          </p>
          <a
            href="#registro"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] hover:-translate-y-1"
          >
            Empezar ahora
          </a>
        </Reveal>

        <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col items-center gap-4">
          <Image
            src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
            alt="DocYa"
            width={80}
            height={24}
            className="h-6 w-auto opacity-30 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-500 object-contain"
            unoptimized
          />
          <p className="text-slate-600 text-sm">
            © 2026 DocYa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}