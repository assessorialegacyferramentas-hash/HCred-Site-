import React, { useState, useEffect } from 'react';
import { CompanyConfig } from './types';
import Solutions from './components/Syllabus';
import LeadForm from './components/LeadForm';
import Faq from './components/Faq';
import Customizer from './components/Customizer';
import {
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Check,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Menu,
  X,
  Lock,
  ArrowRight,
  Search,
  ShieldAlert,
  FileText,
  BarChart3,
  HelpCircle,
  Settings,
  AlertTriangle,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_CONFIG: CompanyConfig = {
  razaoSocial: 'GRIFOS CAPITAL LTDA',
  cnpj: '31.453.560/0001-25',
  telefone: '(84) 99617-7978',
  emailSac: 'henrique.teixeira.ht77@gmail.com',
  endereco: 'Rua Portelandia',
  numeroRua: '4828',
  cep: '59.088-340',
  cidade: 'Natal',
  estado: 'RN',
  taxaMensalMinima: 1.29,
  prazoMaximoMeses: 240,
  valorMinimoEmprestimo: 5000,
  valorMaximoEmprestimo: 2000000,
};

export default function App() {
  // Load configuration from localstorage or defaults
  const [config, setConfig] = useState<CompanyConfig>(() => {
    const saved = localStorage.getItem('company_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Force update if they were using the old dummy, incomplete or previous placeholder values
        if (
          parsed.cnpj !== '31.453.560/0001-25' ||
          parsed.razaoSocial !== 'GRIFOS CAPITAL LTDA' ||
          parsed.telefone !== '(84) 99617-7978'
        ) {
          return DEFAULT_CONFIG;
        }
        return { ...DEFAULT_CONFIG, ...parsed };
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  // Interactive Raio-X Simulator State
  const [simScore, setSimScore] = useState(680);

  useEffect(() => {
    localStorage.setItem('company_config', JSON.stringify(config));
  }, [config]);

  // Handle showing sticky mobile CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResetConfig = () => {
    if (window.confirm('Tem certeza de que deseja redefinir todas as informações para o padrão?')) {
      setConfig(DEFAULT_CONFIG);
    }
  };

  // Calculations for interactive profile
  const profileIndex = Math.round((simScore / 1000) * 85 + 10);
  const barScore = Math.round(simScore / 10);
  const barHistory = Math.min(95, Math.round(simScore * 0.08 + 15));
  const barRating = Math.min(95, Math.round(simScore * 0.09 + 8));
  const barCapacity = Math.min(95, Math.round(simScore * 0.07 + 24));

  const getScoreBadge = (score: number) => {
    if (score < 400) return { label: 'Atenção Cadastral', color: 'text-red-400 bg-red-950/40 border-red-800/30' };
    if (score < 700) return { label: 'Perfil Moderado', color: 'text-yellow-400 bg-yellow-950/40 border-yellow-800/30' };
    return { label: 'Excelente Perfil', color: 'text-[#01F9F2] bg-[#01F9F2]/10 border-[#01F9F2]/20' };
  };

  const getRecommendedService = (score: number) => {
    if (score < 400) return 'Limpa Nome & Regularização BACEN';
    if (score < 700) return 'Rating Comercial & Raio-X Completo';
    return 'Consulta de Elegibilidade Direta';
  };

  const handleWppDirect = () => {
    const clean = config.telefone.replace(/\D/g, '');
    const cleanPhone = clean.startsWith('55') ? clean : '55' + (clean || '84996177978');
    const text = encodeURIComponent(
      `Olá! Estive analisando meu perfil financeiro no site da HCred (Score Estimado: ${simScore}) e gostaria de agendar meu diagnóstico completo do Raio-X.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#010c28] text-[#eaf1ff] flex flex-col font-sans selection:bg-[#01F9F2] selection:text-[#010c28] antialiased">
      {/* Header / Navigation */}
      <header id="top-header" className="sticky top-0 z-30 bg-[#010c28]/85 backdrop-blur-md border-b border-white/5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <img 
              src="https://i.imgur.com/w2dZvBj.png" 
              alt="HCred" 
              className="h-10 sm:h-11 w-auto object-contain" 
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#diagnostico" className="hover:text-[#01F9F2] transition-colors">
              Raio-X
            </a>
            <a href="#como-funciona" className="hover:text-[#01F9F2] transition-colors">
              Como Funciona
            </a>
            <a href="#solucoes" className="hover:text-[#01F9F2] transition-colors">
              Soluções
            </a>
            <a href="#seguranca" className="hover:text-[#01F9F2] transition-colors">
              Segurança
            </a>
            <a href="#faq" className="hover:text-[#01F9F2] transition-colors">
              Dúvidas
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/hcredhub/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-[#01F9F2] transition-colors font-semibold text-xs border border-white/10 hover:border-[#01F9F2]/30 px-3.5 py-2 rounded-xl bg-white/5 cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-[#01F9F2]" />
              <span>@hcredhub</span>
            </a>
            <a
              href="#analise"
              className="bg-linear-to-r from-[#01F9F2] to-cyan-300 hover:scale-[1.03] text-slate-950 text-xs font-black uppercase py-3 px-6 rounded-xl shadow-lg shadow-cyan-500/10 transition-all cursor-pointer"
            >
              Fazer Análise Grátis
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg md:hidden cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 bg-[#010c28] overflow-hidden shadow-2xl"
            >
              <div className="px-4 py-4 space-y-3.5 flex flex-col font-semibold text-slate-300 text-sm">
                <a
                  href="#diagnostico"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 hover:text-[#01F9F2] border-b border-white/5"
                >
                  Raio-X do Perfil
                </a>
                <a
                  href="#como-funciona"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 hover:text-[#01F9F2] border-b border-white/5"
                >
                  Como Funciona
                </a>
                <a
                  href="#solucoes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 hover:text-[#01F9F2] border-b border-white/5"
                >
                  Nossas Soluções
                </a>
                <a
                  href="#seguranca"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 hover:text-[#01F9F2] border-b border-white/5"
                >
                  Segurança & Riscos
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 hover:text-[#01F9F2] border-b border-white/5"
                >
                  Perguntas Frequentes
                </a>
                <div className="pt-2 space-y-2.5">
                  <a
                    href="#analise"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full block bg-[#01F9F2] text-slate-950 font-black uppercase text-center py-3.5 rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer text-xs"
                  >
                    Fazer Meu Raio-X Agora
                  </a>
                  <a
                    href="https://www.instagram.com/hcredhub/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 font-semibold text-xs py-3 rounded-xl hover:text-[#01F9F2] hover:bg-white/10 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#01F9F2]" />
                    <span>Siga-nos no Instagram @hcredhub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-10 pb-20 md:py-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#0069fe]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#01F9F2]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#01F9F2]/10 text-[#01F9F2] border border-[#01F9F2]/20 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Diagnóstico financeiro responsável • {config.cidade} / {config.estado}
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Antes de tentar crédito de novo,{' '}
                <span className="bg-gradient-to-r from-white via-[#01F9F2] to-cyan-400 bg-clip-text text-transparent">
                  entenda o que está travando você.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                O Raio-X Financeiro da HCred analisa possíveis inconsistências no seu score, histórico bancário, BACEN, rating e capacidade de pagamento para mostrar qual caminho faz mais sentido para o seu cenário.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#analise"
                  className="w-full sm:w-auto text-center bg-[#01F9F2] hover:bg-[#00e5dd] text-slate-950 font-black text-sm uppercase px-8 py-4 rounded-2xl shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Solicitar Meu Raio-X →
                </a>
                <a
                  href="#diagnostico"
                  className="w-full sm:w-auto text-center border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-sm uppercase px-8 py-4 rounded-2xl transition-all"
                >
                  Entender Como Funciona
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs text-slate-400 pt-4">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#01F9F2]" /> Sem promessa no escuro
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#01F9F2]" /> Sujeito à análise
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#01F9F2]" /> Atendimento consultivo
                </span>
              </div>
            </div>

            {/* Hero Right Interactive Dashboard Widget */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 bg-gradient-to-b from-white/8 to-white/3 p-6 rounded-3xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xs"
              >
                {/* Glowing subtle radial */}
                <div className="absolute top-0 right-0 bg-[#01F9F2]/5 w-40 h-40 rounded-full blur-2xl pointer-events-none" />

                {/* Dashboard top header */}
                <div className="flex items-center justify-between gap-4 mb-5 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#01F9F2]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                      ANÁLISE_SECURE_CLIENT
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#01F9F2] font-black uppercase tracking-wider bg-[#01F9F2]/10 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#01F9F2] animate-pulse" />
                    Análise Segura Ativa
                  </span>
                </div>

                {/* Score slider control inside dashboard */}
                <div className="mb-6 p-3.5 bg-slate-950/40 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      Ajuste seu score estimado:
                    </span>
                    <span className="font-mono font-bold text-[#01F9F2] text-sm">
                      {simScore} Pts
                    </span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={990}
                    step={10}
                    value={simScore}
                    onChange={(e) => setSimScore(Number(e.target.value))}
                    className="w-full accent-[#01F9F2] h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                    <span>Mín: 150</span>
                    <span>Mod: 550</span>
                    <span>Máx: 990</span>
                  </div>
                </div>

                {/* Interactive Score Card */}
                <div className="space-y-5 bg-slate-950/50 p-5 rounded-2xl border border-white/5 relative">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                        Visão Geral do Perfil
                      </span>
                      <div className="text-4xl sm:text-5xl font-display font-black text-white leading-none">
                        {profileIndex}%
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">
                        Índice ilustrativo de análise
                      </span>
                    </div>

                    {/* Ring score graphic */}
                    <div className="relative w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center border border-white/5 shadow-inner shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          className="stroke-slate-800"
                          strokeWidth="5"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          className="stroke-[#01F9F2] transition-all duration-300"
                          strokeWidth="5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 32}
                          strokeDashoffset={2 * Math.PI * 32 * (1 - profileIndex / 100)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                          Raio-X
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Status bar rating badge */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                    <span className="text-slate-400">Classificação:</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${getScoreBadge(simScore).color}`}>
                      {getScoreBadge(simScore).label}
                    </span>
                  </div>

                  {/* Micro simulated progress bars */}
                  <div className="space-y-2 pt-1">
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Fator Score:</span>
                        <span className="font-mono font-bold text-white">{barScore}/100</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#01F9F2]"
                          animate={{ width: `${barScore}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Histórico Bancário:</span>
                        <span className="font-mono font-bold text-white">{barHistory}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-500"
                          animate={{ width: `${barHistory}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Rating Interno:</span>
                        <span className="font-mono font-bold text-white">{barRating}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-cyan-500"
                          animate={{ width: `${barRating}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Capacidade Renda:</span>
                        <span className="font-mono font-bold text-white">{barCapacity}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500"
                          animate={{ width: `${barCapacity}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive recommended service notice */}
                <div className="mt-4 p-3.5 bg-slate-900/60 rounded-xl border border-white/5 flex gap-3 items-start">
                  <div className="p-1 bg-[#01F9F2]/10 text-[#01F9F2] rounded-lg shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-snug">Solução Indicada:</h5>
                    <p className="text-[11px] text-slate-300 font-semibold leading-normal mt-0.5">
                      {getRecommendedService(simScore)}
                    </p>
                  </div>
                </div>

                {/* Dashboard bottom cta */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Sem garantias pré-aprovadas no escuro.
                  </span>
                  <button
                    onClick={handleWppDirect}
                    className="bg-[#0069fe] hover:bg-[#1746ea] text-white text-[10px] font-extrabold uppercase py-2 px-4 rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Agendar Análise
                  </button>
                </div>
              </motion.div>

              {/* Info Cards (positioned cleanly below the dashboard widget) */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Info Card A */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xs p-3.5 rounded-2xl shadow-lg"
                >
                  <strong className="block text-white text-xs font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#01F9F2]" />
                    Clareza antes da solução
                  </strong>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Diagnóstico qualificado para guiar suas próximas decisões financeiras com transparência.
                  </p>
                </motion.div>

                {/* Info Card B */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xs p-3.5 rounded-2xl shadow-lg"
                >
                  <strong className="block text-[#01F9F2] text-xs font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#01F9F2]" />
                    Sem aprovação no escuro
                  </strong>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    As condições dependem única e exclusivamente da análise cadastral regulamentada.
                  </p>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* METRICS STRIP SECTION */}
      <section className="bg-slate-950/40 border-y border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1 */}
            <div className="flex gap-4 items-start p-4 border-b sm:border-b-0 sm:border-r border-white/5 last:border-0">
              <div className="p-2.5 bg-[#01F9F2]/10 text-[#01F9F2] rounded-xl font-bold font-display text-sm">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Diagnóstico</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Realizado antes de indicar qualquer tipo de empréstimo ou serviço.
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex gap-4 items-start p-4 border-b sm:border-b-0 lg:border-r border-white/5 last:border-0">
              <div className="p-2.5 bg-[#01F9F2]/10 text-[#01F9F2] rounded-xl font-bold font-display text-sm">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Clareza</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Para que você entenda de fato quais pendências barram seu score.
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex gap-4 items-start p-4 border-b sm:border-b-0 sm:border-r border-white/5 last:border-0">
              <div className="p-2.5 bg-[#01F9F2]/10 text-[#01F9F2] rounded-xl font-bold font-display text-sm">
                03
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Segurança</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Compromisso total de ética, sem falsas promessas de aprovação.
                </p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex gap-4 items-start p-4 last:border-0">
              <div className="p-2.5 bg-[#01F9F2]/10 text-[#01F9F2] rounded-xl font-bold font-display text-sm">
                04
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Direção</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O plano financeiro e soluções que melhor se adequam ao seu perfil.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* "NOME LIMPO NÃO SIGNIFICA CRÉDITO APROVADO" SECTION */}
      <section id="diagnostico" className="py-20 bg-[#010c28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs font-bold text-[#01F9F2] uppercase tracking-widest bg-[#01F9F2]/10 border border-[#01F9F2]/20 px-3.5 py-1.5 rounded-full mb-2">
              O problema pode estar além do nome
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mt-2">
              Nome limpo não significa crédito aprovado.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Bancos e instituições analisam diversos fatores complexos além da inadimplência direta. Tentar crédito repetidamente sem entender esse cenário gera novas negativas e mais frustração.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-linear-to-b from-white/7 to-white/3 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-[#01F9F2]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#01F9F2]/10 text-[#01F9F2] rounded-2xl flex items-center justify-center font-display font-extrabold text-lg border border-[#01F9F2]/10 mb-5">
                01
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#01F9F2] transition-colors">
                Histórico Bancário
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Registros antigos de renegociações, descontos concedidos em liquidações de contratos e atrasos sazonais ficam anotados no histórico interno das instituições por anos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-linear-to-b from-white/7 to-white/3 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-[#01F9F2]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#01F9F2]/10 text-[#01F9F2] rounded-2xl flex items-center justify-center font-display font-extrabold text-lg border border-[#01F9F2]/10 mb-5">
                02
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#01F9F2] transition-colors">
                Score e Rating Interno
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                As pontuações públicas de mercado são apenas uma referência básica. Cada credor desenvolve seu próprio algoritmo de classificação de risco (Rating de A a H).
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-linear-to-b from-white/7 to-white/3 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-[#01F9F2]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#01F9F2]/10 text-[#01F9F2] rounded-2xl flex items-center justify-center font-display font-extrabold text-lg border border-[#01F9F2]/10 mb-5">
                03
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#01F9F2] transition-colors">
                Capacidade de Pagamento
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                O comprometimento aparente de renda, cruzamento de dados cadastrais inconsistentes e falta de comprovação técnica adequada barram solicitações nos sistemas automáticos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* "COMO FUNCIONA" SECTION */}
      <section id="como-funciona" className="py-20 bg-slate-950/35 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#01F9F2] uppercase tracking-widest block">
                Etapas do Atendimento
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                Primeiro a gente entende. Depois, orienta.
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                A HCred não oferece ou empurra pacotes comerciais no escuro. Todo o nosso fluxo baseia-se em entender profundamente sua situação cadastral e orientar um plano técnico estruturado e viável.
              </p>

              {/* Checklist points */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3 items-start">
                  <div className="p-1 bg-[#01F9F2]/10 text-[#01F9F2] rounded-md text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm text-slate-200">
                    Mapeamento detalhado de inconsistências ocultas.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-1 bg-[#01F9F2]/10 text-[#01F9F2] rounded-md text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm text-slate-200">
                    Relatório transparente do score, histórico bancário e apontamentos.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-1 bg-[#01F9F2]/10 text-[#01F9F2] rounded-md text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm text-slate-200">
                    Orientação idônea sem qualquer tipo de cobrança abusiva antecipada.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-1 bg-[#01F9F2]/10 text-[#01F9F2] rounded-md text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm text-slate-200">
                    Direcionamento apenas para soluções perfeitamente regulamentadas.
                  </p>
                </div>
              </div>

              {/* Corporate disclaimer card */}
              <div className="bg-[#0b1220]/80 border border-white/10 p-5 rounded-2xl flex gap-4 items-center">
                <div className="p-3.5 bg-slate-950 text-[#01F9F2] rounded-xl border border-white/5 shadow-inner">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Correspondente Banco Central</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Atuação autorizada sob intermediação formal de <strong className="text-white">{config.razaoSocial}</strong> (CNPJ: {config.cnpj}), garantindo segurança jurídica.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side steps timeline */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Step 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-[#071838]/50 border border-white/10 rounded-2xl">
                <div className="sm:col-span-2 flex justify-center sm:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0069fe] to-[#01F9F2] text-slate-950 font-display font-extrabold flex items-center justify-center text-lg">
                    1
                  </div>
                </div>
                <div className="sm:col-span-10 text-center sm:text-left space-y-0.5">
                  <h4 className="font-bold text-white text-sm">Você Solicita a Análise</h4>
                  <p className="text-xs text-slate-400">
                    Preenche seus dados básicos de perfil com segurança e descreve brevemente seus objetivos cadastrais.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-[#071838]/50 border border-white/10 rounded-2xl">
                <div className="sm:col-span-2 flex justify-center sm:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0069fe] to-[#01F9F2] text-slate-950 font-display font-extrabold flex items-center justify-center text-lg">
                    2
                  </div>
                </div>
                <div className="sm:col-span-10 text-center sm:text-left space-y-0.5">
                  <h4 className="font-bold text-white text-sm">O Time Qualifica o Cenário</h4>
                  <p className="text-xs text-slate-400">
                    Nossa equipe de suporte técnico e consultoria verifica preliminarmente as informações que impedem seu rating.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-[#071838]/50 border border-white/10 rounded-2xl">
                <div className="sm:col-span-2 flex justify-center sm:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0069fe] to-[#01F9F2] text-slate-950 font-display font-extrabold flex items-center justify-center text-lg">
                    3
                  </div>
                </div>
                <div className="sm:col-span-10 text-center sm:text-left space-y-0.5">
                  <h4 className="font-bold text-white text-sm">O Raio-X é Realizado</h4>
                  <p className="text-xs text-slate-400">
                    Mapeamos de ponta a ponta as divergências e as possíveis restrições internas ocultas no mercado bancário.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-[#071838]/50 border border-[#01F9F2]/20 rounded-2xl">
                <div className="sm:col-span-2 flex justify-center sm:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-[#01F9F2] text-slate-950 font-display font-black flex items-center justify-center text-lg shadow-md shadow-cyan-500/10">
                    4
                  </div>
                </div>
                <div className="sm:col-span-10 text-center sm:text-left space-y-0.5">
                  <h4 className="font-bold text-white text-sm">Você Recebe a Direção</h4>
                  <p className="text-xs text-slate-400">
                    Apresentamos o relatório e a orientação sobre quais linhas de regularização ou crédito fazem sentido.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section id="solucoes" className="py-20 bg-[#010c28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs font-bold text-[#01F9F2] uppercase tracking-widest bg-[#01F9F2]/10 border border-[#01F9F2]/20 px-3.5 py-1.5 rounded-full mb-2">
              Hub de Soluções Financeiras
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mt-2">
              Um diagnóstico. Diferentes caminhos possíveis.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Depois de entender o cenário real do seu perfil, a HCred avalia qual frente ou produto do mercado faz sentido para o seu momento. A indicação responsável nunca é feita sem análise técnica prévia.
            </p>
          </div>

          {/* Solutions interactive cards component */}
          <Solutions />

        </div>
      </section>

      {/* COMPLIANCE / SECURITY STATEMENT SECTION */}
      <section id="seguranca" className="py-16 bg-slate-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#071838]/70 border border-[#01F9F2]/20 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#01F9F2] uppercase tracking-widest block bg-[#01F9F2]/10 border border-[#01F9F2]/20 px-3 py-1 rounded-full w-fit">
                  Segurança & Transparência
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                  O que a HCred nunca promete.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Trabalhamos com conformidade jurídica e respeito ao consumidor. Nenhuma assessoria financeira idônea e séria no Brasil pode garantir a aprovação ou liberação de empréstimos sem avaliação de risco. Por isso, somos totalmente transparentes:
                </p>
              </div>

              <div className="lg:col-span-5 bg-slate-950/50 p-6 rounded-2xl border border-white/5">
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-[#01F9F2] font-black">×</span>
                    <span>Crédito garantido ou aprovado sem análise cadastral.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-[#01F9F2] font-black">×</span>
                    <span>Liberação financeira instantânea sem assinatura legal.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-[#01F9F2] font-black">×</span>
                    <span>Limpeza de nome com promessa de resultado garantido.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-[#01F9F2] font-black">×</span>
                    <span>Apagar ou liquidar dívidas do histórico sem o pagamento.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-[#01F9F2] font-black">×</span>
                    <span>Cobrança de taxas de liberação, tarifas ou depósitos prévios.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* REGULATORY NOTICE BOX */}
      <section className="py-12 bg-[#010c28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0b1220] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-3 max-w-3xl text-center md:text-left">
              <span className="text-xs font-bold text-[#01F9F2] uppercase tracking-widest block">
                Atuação Regulamentada
              </span>
              <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                Intermediação Legal Correspondente Bancário
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A {config.razaoSocial} é autorizada pelo Banco Central do Brasil como correspondente bancário regulamentado sob Resolução CMN nº 4.935/2021. Realizamos simulações e diagnósticos cadastrais gratuitos, sendo remunerados unicamente pelas instituições parceiras na consolidação das operações financeiras.
              </p>
              <div className="p-4 bg-[#01F9F2]/5 border border-[#01F9F2]/20 rounded-xl text-slate-200 text-xs text-left">
                ⚠️ <strong>ALERTA DE SEGURANÇA:</strong> Desconfie imediatamente de intermediários que exigem qualquer transferência pix, depósitos bancários de custas cartorárias ou seguros de crédito. Cobrança de qualquer taxa antecipada é crime e configura golpe!
              </div>
            </div>

            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="w-32 h-32 rounded-full border-2 border-slate-800 bg-slate-950 flex flex-col items-center justify-center p-3 text-center shadow-lg border-cyan-500/20">
                <ShieldCheck className="w-8 h-8 text-[#01F9F2] mb-1 animate-pulse" />
                <span className="font-display font-black text-sm text-white tracking-tight">BCB</span>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">Regulamentado</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold font-mono mt-2">Resolução 4.935/21</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-950/35 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs font-bold text-[#01F9F2] uppercase tracking-widest bg-[#01F9F2]/10 border border-[#01F9F2]/20 px-3.5 py-1.5 rounded-full mb-2">
              Dúvidas Frequentes
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2">
              Informação clara antes de qualquer decisão.
            </h2>
            <p className="text-slate-400 text-sm">
              Entenda os principais tópicos regulamentares, processuais e de segurança levantados por nossos clientes.
            </p>
          </div>

          <Faq config={config} />

        </div>
      </section>

      {/* LEAD SECTION (FORMULÁRIO DE ANÁLISE) */}
      <section id="analise" className="py-20 bg-[#010c28] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy side */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold text-[#01F9F2] uppercase tracking-widest block">
                Comece pelo diagnóstico
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
                Descubra o que pode estar travando seu crédito.
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Preencha as informações básicas no formulário ao lado. Nossa equipe consultiva entrará em contato com você via WhatsApp para realizar sua triagem segura e orientar seu diagnóstico cadastral completo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
                <div className="flex gap-2.5 items-start">
                  <div className="p-1 text-[#01F9F2] bg-[#01F9F2]/10 rounded-md text-xs font-black shrink-0">✓</div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Atendimento consultivo</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">Sem robôs. Suporte humanizado focado em te guiar de verdade.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="p-1 text-[#01F9F2] bg-[#01F9F2]/10 rounded-md text-xs font-black shrink-0">✓</div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Explicação clara</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">Total transparência sobre os fatores e travas mapeadas no perfil.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="p-1 text-[#01F9F2] bg-[#01F9F2]/10 rounded-md text-xs font-black shrink-0">✓</div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Ética total</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">Não cobramos e nunca solicitamos depósitos prévios de liberação.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="p-1 text-[#01F9F2] bg-[#01F9F2]/10 rounded-md text-xs font-black shrink-0">✓</div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Processo Digital</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">Análise rápida no conforto da sua casa, direto pelo WhatsApp.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-6">
              <LeadForm config={config} title="Solicitar Raio-X de Crédito" />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="main-footer" className="bg-[#001426] text-slate-300 pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left side info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="https://i.imgur.com/w2dZvBj.png" 
                  alt="HCred" 
                  className="h-8 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2 pt-2 text-xs text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#01F9F2] shrink-0 mt-0.5" />
                  <span>
                    <strong>Sede Presencial:</strong> Rua Portelandia, 4828 - Neopolis - Natal/RN - CEP: 59.088-340
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#01F9F2] shrink-0 mt-0.5" />
                  <div>
                    <span className="block"><strong>WhatsApp Principal:</strong> {config.telefone}</span>
                    <span className="block text-[11px] text-slate-500">Contato Secundário: (84) 8807-4698</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#01F9F2] shrink-0" />
                  <span><strong>E-mail de Suporte / SAC:</strong> {config.emailSac}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-[#01F9F2] shrink-0" />
                  <span>
                    <strong>Instagram Oficial:</strong>{' '}
                    <a
                      href="https://www.instagram.com/hcredhub/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#01F9F2] transition-colors"
                    >
                      @hcredhub
                    </a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=${(() => {
                    const clean = config.telefone.replace(/\D/g, '');
                    return clean.startsWith('55') ? clean : '55' + clean;
                  })()}&text=${encodeURIComponent('Olá! Acessei o site da HCred e gostaria de solicitar meu diagnóstico do Raio-X.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366]/10 hover:border-[#25D366]/30 text-slate-400 hover:text-[#25D366] transition-all cursor-pointer"
                  title="Falar no WhatsApp"
                >
                  <Phone className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://www.instagram.com/hcredhub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d62976]/10 hover:border-[#d62976]/30 text-slate-400 hover:text-[#d62976] transition-all cursor-pointer"
                  title="Siga-nos no Instagram"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Middle links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 border-b border-white/5 pb-2">
                Nossos Serviços
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#solucoes" className="hover:text-[#01F9F2] transition-colors">Raio-X Financeiro</a></li>
                <li><a href="#solucoes" className="hover:text-[#01F9F2] transition-colors">Limpa Nome</a></li>
                <li><a href="#solucoes" className="hover:text-[#01F9F2] transition-colors">Regularização BACEN</a></li>
                <li><a href="#solucoes" className="hover:text-[#01F9F2] transition-colors">Rating Comercial</a></li>
                <li><a href="#solucoes" className="hover:text-[#01F9F2] transition-colors">Recuperação Tributária</a></li>
                <li><a href="#solucoes" className="hover:text-[#01F9F2] transition-colors">Consulta Elegibilidade</a></li>
              </ul>
            </div>

            {/* Right side Corporate details */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 border-b border-white/5 pb-2">
                Dados Corporativos
              </h4>
              <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                <p>
                  <strong>Razão Social:</strong><br />
                  <span className="text-white font-medium">{config.razaoSocial}</span>
                </p>
                <p>
                  <strong>CNPJ:</strong><br />
                  <span className="font-mono text-white">{config.cnpj}</span>
                </p>
                <p>
                  <strong>Sede Presencial:</strong><br />
                  <span className="text-white">Rua Portelandia, 4828 - Neopolis - Natal/RN - CEP: 59.088-340</span>
                </p>
              </div>
            </div>

          </div>

          {/* Legal / Copyright disclaimer */}
          <div className="pt-8 border-t border-white/5 text-center text-[10px] text-slate-500 leading-relaxed space-y-2.5">
            <p>
              Copyright © {new Date().getFullYear()} {config.razaoSocial}. Todos os direitos reservados.
            </p>
            <p className="max-w-4xl mx-auto">
              A HCred (operada sob intermediação de {config.razaoSocial}, CNPJ: {config.cnpj}) não é uma instituição financeira, mas sim um Correspondente Bancário em estrita conformidade com as diretrizes da Resolução CMN nº 4.935/2021 do Banco Central do Brasil. Todo diagnóstico e análises efetuados no portal são ilustrativos e consultivos, não constituindo de forma alguma promessa ou aprovação de crédito garantida. As taxas iniciais, montantes e prazos variam de acordo com as diretrizes de avaliação de risco das instituições bancárias credenciadas de mercado parceiras.
            </p>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP CTA FOR DESKTOP & MOBILE */}
      <a
        href={`https://api.whatsapp.com/send?phone=${(() => {
          const clean = config.telefone.replace(/\D/g, '');
          return clean.startsWith('55') ? clean : '55' + clean;
        })()}&text=${encodeURIComponent('Olá! Acessei o site da HCred e gostaria de solicitar meu diagnóstico do Raio-X Financeiro.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] hover:scale-108 text-white p-4 rounded-full shadow-2xl transition-all flex items-center justify-center animate-bounce group"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute right-full mr-3 bg-[#010c28] text-white text-xs font-extrabold py-1.5 px-3 rounded-lg border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Falar no WhatsApp
        </span>
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.764.001-2.605-1.012-5.054-2.861-6.903C16.368 2.09 13.92 1.078 11.31 1.078c-5.405 0-9.807 4.385-9.809 9.768-.001 1.9.49 3.75 1.42 5.368l-.955 3.486 3.58-.938z" />
        </svg>
      </a>

      {/* MOBILE PERSISTENT BOTTOM STICKY BAR CTA */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="md:hidden fixed bottom-4 left-4 right-4 z-30 shadow-2xl"
          >
            <a
              href="#analise"
              className="w-full block text-center bg-[#01F9F2] text-slate-950 font-black text-xs uppercase py-4 rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              Solicitar Meu Raio-X Grátis →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN CUSTOMIZER COMPONENT */}
      <Customizer
        config={config}
        onChange={setConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
