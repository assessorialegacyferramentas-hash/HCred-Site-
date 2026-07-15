import React, { useState } from 'react';
import { Search, ShieldAlert, FileText, BarChart3, Receipt, CheckSquare, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SolutionItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  icon: React.ReactNode;
}

export default function Solutions() {
  const solutions: SolutionItem[] = [
    {
      id: 'raio-x',
      tag: 'Produto de entrada',
      title: 'Raio-X Financeiro',
      description: 'Diagnóstico para identificar possíveis travas em score, BACEN, rating, histórico e capacidade de pagamento.',
      longDescription: 'É a nossa ferramenta de diagnóstico proprietária. Analisamos detalhadamente todos os pontos cadastrais, históricos e de classificação que o mercado de crédito consulta de forma automatizada sobre você ou seu negócio.',
      benefits: [
        'Análise de consultas excessivas ao seu CPF/CNPJ',
        'Leitura minuciosa da sua capacidade de pagamento aparente',
        'Identificação de possíveis discrepâncias cadastrais',
        'Orientação consultiva sobre o que de fato está impedindo seu crédito',
      ],
      icon: <Search className="w-6 h-6 text-[#01F9F2]" />,
    },
    {
      id: 'limpa-nome',
      tag: 'Pessoa física',
      title: 'Limpa Nome',
      description: 'Análise de apontamentos e busca do caminho adequado para regularização, quando houver possibilidade.',
      longDescription: 'Ter restrições ativas é o principal impeditivo do mercado. Avaliamos detalhadamente os seus apontamentos em cartórios e bureaus de crédito, buscando soluções legais e eficientes para reabilitar seu CPF comercialmente.',
      benefits: [
        'Diagnóstico de dívidas ativas em órgãos de proteção',
        'Estratégias de negociação direta com descontos expressivos',
        'Orientação de direitos do consumidor e reabilitação legal',
        'Apoio consultivo em todo o processo de limpeza cadastral',
      ],
      icon: <ShieldAlert className="w-6 h-6 text-[#01F9F2]" />,
    },
    {
      id: 'regularizacao-bacen',
      tag: 'Sistema financeiro',
      title: 'Regularização BACEN',
      description: 'Avaliação de dados bancários que podem precisar de correção ou regularização. Não representa quitação de dívida.',
      longDescription: 'O Sistema de Informações de Crédito (SCR) do Banco Central registra todas as operações financeiras superiores a R$ 200. Mesmo contas em dia ou quitadas com desconto podem ter restrições internas registradas lá.',
      benefits: [
        'Mapeamento completo do seu SCR e prejuízos reportados',
        'Identificação de apontamentos indevidos por bancos',
        'Orientação para reverter "restrições internas/veladas"',
        'Auxílio de transparência em conformidade regulatória do BCB',
      ],
      icon: <FileText className="w-6 h-6 text-[#01F9F2]" />,
    },
    {
      id: 'rating-comercial',
      tag: 'Perfil de risco',
      title: 'Rating Comercial',
      description: 'Análise e organização de dados cadastrais, renda e classificação de risco percebida pelo mercado.',
      longDescription: 'As instituições atribuem notas de risco (de A a H) para cada cliente. Comprovamos e estruturamos sua verdadeira saúde financeira, organizando seus cadastros para que você pareça um cliente de menor risco.',
      benefits: [
        'Orientação técnica sobre como subir sua régua de crédito',
        'Correção de dados cadastrais divergentes no mercado',
        'Estruturação de portfólio de ativos para credores',
        'Estratégias de melhora de classificação em múltiplos bureaus',
      ],
      icon: <BarChart3 className="w-6 h-6 text-[#01F9F2]" />,
    },
    {
      id: 'recuperacao-tributaria',
      tag: 'Pessoa jurídica',
      title: 'Recuperação Tributária',
      description: 'Revisão complementar para identificar possíveis créditos tributários e oportunidades para o caixa da empresa.',
      longDescription: 'As empresas no Brasil frequentemente pagam mais impostos do que deveriam devido à complexidade da legislação. Analisamos as operações fiscais passadas para recuperar créditos pagos a maior que podem rechear seu caixa.',
      benefits: [
        'Revisão fiscal detalhada dos últimos 5 anos de impostos',
        'Foco em tributação monofásica e substituição tributária',
        'Processo de homologação digital seguro e transparente',
        'Injeção direta de liquidez financeira recuperada no CNPJ',
      ],
      icon: <Receipt className="w-6 h-6 text-[#01F9F2]" />,
    },
    {
      id: 'elegibilidade',
      tag: 'Sujeito à análise',
      title: 'Consulta de Elegibilidade',
      description: 'Verificação responsável de alternativas disponíveis. Valor e condições dependem da avaliação do perfil.',
      longDescription: 'Trabalhamos em conjunto com mais de 12 parceiros financeiros de primeira linha. Após o seu diagnóstico, se o seu perfil se enquadrar, faremos o roteamento inteligente para as menores taxas possíveis.',
      benefits: [
        'Zero cobrança de tarifas administrativas ou de avalista',
        'Taxas iniciais que partem de níveis reduzidos de mercado',
        'Conexão direta com correspondentes autorizados oficiais',
        'Intermediação totalmente documentada e rastreável',
      ],
      icon: <CheckSquare className="w-6 h-6 text-[#01F9F2]" />,
    },
  ];

  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  return (
    <div className="space-y-8">
      {/* Grid displays all 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((sol, index) => (
          <motion.article
            key={sol.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedSolution(sol)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/7 to-white/3 p-6 shadow-md hover:border-[#01F9F2]/30 hover:shadow-[0_12px_40px_rgba(1,249,242,0.08)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Glowing top-right circle */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#01F9F2]/5 group-hover:bg-[#01F9F2]/10 transition-all duration-500 blur-xl" />

            <div>
              {/* Product tag */}
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#01F9F2] bg-[#01F9F2]/10 border border-[#01F9F2]/20 mb-4">
                {sol.tag}
              </div>

              {/* Icon & Title row */}
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="p-2.5 rounded-xl bg-linear-to-br from-[#01F9F2]/15 to-[#0069FE]/15 border border-[#01F9F2]/15 shadow-inner">
                  {sol.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white leading-tight group-hover:text-[#01F9F2] transition-colors">
                  {sol.title}
                </h3>
              </div>

              {/* Short Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {sol.description}
              </p>
            </div>

            {/* Read more footer */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#01F9F2] group-hover:gap-2.5 transition-all">
              <span>Saiba mais e ver detalhes</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.article>
        ))}
      </div>

      {/* Details modal popup when selected */}
      <AnimatePresence>
        {selectedSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSolution(null)}
              className="absolute inset-0 bg-[#010c28]/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-linear-to-b from-[#071838] to-[#010c28] border border-[#01F9F2]/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-100 overflow-hidden"
            >
              {/* Highlight Circle */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#01F9F2]/10 blur-2xl pointer-events-none" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedSolution(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#01F9F2] uppercase bg-[#01F9F2]/10 border border-[#01F9F2]/20 px-3 py-1 rounded-full">
                    {selectedSolution.tag}
                  </span>
                  <div className="flex items-center gap-3.5 mt-4">
                    <div className="p-3 rounded-2xl bg-linear-to-br from-[#01F9F2]/20 to-[#0069FE]/20 border border-[#01F9F2]/30">
                      {selectedSolution.icon}
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      {selectedSolution.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedSolution.longDescription}
                  </p>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Pontos de Destaque / Benefícios:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedSolution.benefits.map((benefit, i) => (
                        <div key={i} className="flex gap-2.5 items-start">
                          <span className="p-0.5 bg-[#01F9F2]/10 text-[#01F9F2] rounded-md text-xs font-black">
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm text-slate-300">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#01F9F2]" />
                    Sujeito à análise de elegibilidade técnica.
                  </span>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedSolution(null)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                    >
                      Voltar
                    </button>
                    <a
                      href="#analise"
                      onClick={() => setSelectedSolution(null)}
                      className="w-full sm:w-auto text-center px-6 py-2.5 bg-[#01F9F2] hover:bg-[#00e5dd] text-slate-950 font-extrabold text-xs uppercase rounded-xl shadow-lg shadow-[#01F9F2]/10 transition-transform hover:-translate-y-0.5"
                    >
                      Solicitar Análise
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
