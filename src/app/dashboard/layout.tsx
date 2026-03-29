'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3, Users, DollarSign, LinkIcon,
  LogOut, ChevronRight, Menu, X, Loader2,
} from 'lucide-react'

interface Referente {
  id: string
  full_name: string
  email: string
  tipo: string
  codigo_referido: string
  link_referido: string
}

const NAV = [
  { icon: BarChart3,  label: 'Mi Panel',      href: '/dashboard'         },
  { icon: Users,      label: 'Mis Referidos',  href: '/dashboard/referidos' },
  { icon: DollarSign, label: 'Cobros',         href: '/dashboard/cobros'    },
  { icon: LinkIcon,   label: 'Mi Link',        href: '/dashboard/link'      },
]

const TIPO_LABEL: Record<string, string> = {
  influencer: 'Influencer',
  embajador:  'Embajador',
  paciente:   'Paciente Feliz',
  partner:    'Partner',
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [referente, setReferente] = useState<Referente | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('docya_token')
    const s = localStorage.getItem('docya_referente')
    if (!t || !s) { router.replace('/login'); return }
    setReferente(JSON.parse(s))
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  if (!referente) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
    </div>
  )

  const ini = initials(referente.full_name)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-6 mb-2">
        <Image
          src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
          alt="DocYa" width={100} height={32}
          className="h-8 w-auto object-contain" unoptimized
        />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {NAV.map(({ icon: Icon, label, href }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-teal-500/10 text-white border border-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-teal-400' : 'text-slate-500'}`} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 text-teal-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer usuario */}
      <div className="px-3 py-4 border-t border-white/[0.06] mt-auto">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {ini}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{referente.full_name}</p>
            <p className="text-xs text-slate-500 truncate">{TIPO_LABEL[referente.tipo] ?? referente.tipo}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200">
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-64 flex-shrink-0 flex-col border-r border-white/[0.06] bg-black/20 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#0c1a2e] border-r border-white/[0.08] flex flex-col md:hidden"
            >
              <button onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b border-white/[0.06] bg-black/20 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.05] text-slate-300 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Image
            src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
            alt="DocYa" width={80} height={26} className="h-7 w-auto object-contain" unoptimized
          />
          <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">
            {ini}
          </div>
        </div>

        {/* Background glow */}
        <div className="fixed top-0 right-0 w-[600px] h-[500px] bg-teal-500/[0.07] blur-[140px] rounded-full pointer-events-none" />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto relative z-10">
          {/* Pass referente via context-like prop — pages read from localStorage directly */}
          {children}
        </main>
      </div>
    </div>
  )
}
