import { useState } from 'react';
import { CompanyConfig, FAQItem } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqProps {
  config: CompanyConfig;
}

export default function Faq({ config }: FaqProps) {
  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'O Raio-X garante que meu crédito será aprovado?',
      answer: 'Não. O Raio-X ajuda a entender possíveis travas e orientar os próximos passos. Aprovação, valores e condições reais dependem exclusivamente da análise técnica de cada parceiro financeiro credenciado.',
    },
    {
      id: 'faq-2',
      question: 'Meu nome está limpo. Ainda assim preciso de análise?',
      answer: 'Pode ser extremamente útil. Nome limpo é apenas um dos fatores considerados pelo mercado. Histórico de consultas, registros no BACEN (SCR), rating interno bancário, e índice de comprometimento de renda também influenciam o crédito.',
    },
    {
      id: 'faq-3',
      question: 'Limpa Nome significa apagar ou quitar minha dívida sem pagar?',
      answer: 'Não. Nossa solução avalia a procedência de apontamentos, possíveis irregularidades ou inconsistências legais em cadastros para buscar o caminho adequado de regularização, sempre respeitando a legislação e quando houver possibilidade real.',
    },
    {
      id: 'faq-4',
      question: 'A HCred substitui meu contador na recuperação tributária?',
      answer: 'Não. A revisão e recuperação tributária da HCred funciona de maneira complementar e especializada à rotina operacional do seu escritório de contabilidade, focando em oportunidades de créditos fiscais específicos dos últimos 5 anos.',
    },
    {
      id: 'faq-5',
      question: 'Como meus dados cadastrais serão utilizados pela HCred?',
      answer: 'Suas informações pessoais são tratadas com absoluto sigilo, seguindo rigorosamente as diretrizes da Lei Geral de Proteção de Dados (LGPD) e apenas com sua devida autorização para fins estritos de diagnóstico financeiro e consultoria de crédito.',
    },
    {
      id: 'faq-6',
      question: 'Preciso pagar algum valor antecipadamente para obter o empréstimo?',
      answer: `Absolutamente NÃO! A HCred, operada pela ${config.razaoSocial}, segue rigorosamente as normas do Banco Central do Brasil. Exigir taxas antecipadas, depósitos de avalista, seguros fictícios ou "taxas de cartório" para liberar crédito é crime! Desconfie sempre de tais exigências.`,
    },
    {
      id: 'faq-7',
      question: `Como correspondente, qual é a atuação regulamentada da ${config.razaoSocial}?`,
      answer: `Em estrita conformidade com a Resolução CMN nº 4.935/2021 do Banco Central do Brasil, a ${config.razaoSocial} (CNPJ: ${config.cnpj}) atua como Correspondente Bancário independente. Oferecemos diagnósticos gratuitos de elegibilidade e comparativo multibancos sem cobrar qualquer comissão direta do cliente.`,
    }
  ];

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-accordion-group" className="space-y-4 max-w-4xl mx-auto">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            id={item.id}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-[#071838]/60 backdrop-blur-xs ${
              isOpen
                ? 'border-[#01F9F2]/40 shadow-lg shadow-[#01F9F2]/5'
                : 'border-white/10 shadow-xs hover:border-white/20'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-200 hover:text-[#01F9F2] transition-colors focus:outline-none cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 pr-4">
                <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-[#01F9F2]' : 'text-slate-500 group-hover:text-[#01F9F2]'}`} />
                <span className="text-sm sm:text-base">{item.question}</span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className={`p-1.5 rounded-full bg-white/5 text-slate-400 transition-colors ${isOpen ? 'bg-[#01F9F2]/10 text-[#01F9F2]' : ''}`}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-1 text-slate-300 leading-relaxed text-xs sm:text-sm border-t border-white/5 bg-slate-950/20">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
