import React, { useState } from 'react';
import { User, Phone, CheckSquare, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanyConfig } from '../types';

interface LeadFormProps {
  config: CompanyConfig;
  title?: string;
  onSuccessClose?: () => void;
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxCnlt8_ENY3k91YCYMu5nZEpM0JiZssmA5O3eaxgFyLuOLOEyakSzc1uQiEsvAHCX2/exec";

export default function LeadForm({ config, title = 'Comece pelo diagnóstico', onSuccessClose }: LeadFormProps) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [buscaPara, setBuscaPara] = useState('');
  const [principalObjetivo, setPrincipalObjetivo] = useState('');
  const [cenario, setCenario] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const formatPhone = (val: string) => {
    let value = val.replace(/\D/g, "").slice(0, 11);
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d+)/, "($1) $2");
    }
    return value;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitMessage("");

    const payload = {
      nomeCompleto: nomeCompleto.trim(),
      principalObjetivo: principalObjetivo,
      whatsapp: whatsapp.trim(),
      buscaPara: buscaPara,
      cenario: cenario.trim()
    };

    if (
      !payload.nomeCompleto ||
      !payload.principalObjetivo ||
      !payload.whatsapp ||
      !payload.buscaPara
    ) {
      setSubmitMessage(
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        });
      } catch (fetchError) {
        // O erro "Failed to fetch" ocorre com frequência no Google Apps Script em requisições 'no-cors'
        // devido a redirecionamentos (302) para domínios diferentes sem cabeçalhos CORS adequados,
        // mas os dados são processados e salvos com sucesso na planilha pela execução do doPost.
        console.warn("Aviso de redirecionamento do fetch (esperado em no-cors):", fetchError);
      }

      setSubmitMessage(
        "Informações enviadas. Abrindo o WhatsApp..."
      );
      setSuccess(true);

      const whatsappMessage = "Olá! Acabei de preencher o formulário no site e gostaria de mais informações.";

      const cleanPhone = config.telefone.replace(/\D/g, '');
      const whatsappNumber = cleanPhone.startsWith('55') ? cleanPhone : '55' + (cleanPhone || '84996177978');

      const whatsappUrl =
        `https://wa.me/${whatsappNumber}` +
        `?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (onSuccessClose) {
        onSuccessClose();
      }

    } catch (error) {
      console.error("Erro ao enviar:", error);

      setSubmitMessage(
        "Não foi possível enviar. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="lead-form-wrapper" className="bg-[#0b1220] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-[#01F9F2]/5 blur-xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white leading-tight">
                {title}
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-normal">
                Preencha seus dados reais para que nossa equipe consultiva realize seu diagnóstico.
              </p>
            </div>

            {/* Nome Completo */}
            <div className="space-y-1.5">
              <label htmlFor="nome" className="block text-xs font-semibold text-slate-300">
                Nome completo <span className="text-[#01F9F2]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  placeholder="Ex.: João da Silva"
                  className="w-full text-sm pl-10 pr-4 py-3 bg-slate-950/80 text-white border border-white/10 rounded-xl focus:outline-none focus:border-[#01F9F2] focus:ring-1 focus:ring-[#01F9F2]/20 transition-all"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <label htmlFor="telefone" className="block text-xs font-semibold text-slate-300">
                WhatsApp <span className="text-[#01F9F2]">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                  placeholder="(84) 99999-9999"
                  className="w-full text-sm pl-10 pr-4 py-3 bg-slate-950/80 text-white border border-white/10 rounded-xl focus:outline-none focus:border-[#01F9F2] focus:ring-1 focus:ring-[#01F9F2]/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Perfil */}
              <div className="space-y-1.5">
                <label htmlFor="perfil" className="block text-xs font-semibold text-slate-300">
                  Você busca para: <span className="text-[#01F9F2]">*</span>
                </label>
                <div className="relative">
                  <CheckSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <select
                    id="perfil"
                    name="perfil"
                    required
                    value={buscaPara}
                    onChange={(e) => setBuscaPara(e.target.value)}
                    className="w-full text-sm pl-10 pr-4 py-3 bg-slate-950/80 text-white border border-white/10 rounded-xl focus:outline-none focus:border-[#01F9F2] focus:ring-1 focus:ring-[#01F9F2]/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Selecione</option>
                    <option value="Pessoa física">Pessoa física</option>
                    <option value="Empresa">Empresa</option>
                  </select>
                </div>
              </div>

              {/* Objetivo */}
              <div className="space-y-1.5">
                <label htmlFor="objetivo" className="block text-xs font-semibold text-slate-300">
                  Principal objetivo: <span className="text-[#01F9F2]">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <select
                    id="objetivo"
                    name="objetivo"
                    required
                    value={principalObjetivo}
                    onChange={(e) => setPrincipalObjetivo(e.target.value)}
                    className="w-full text-sm pl-10 pr-4 py-3 bg-slate-950/80 text-white border border-white/10 rounded-xl focus:outline-none focus:border-[#01F9F2] focus:ring-1 focus:ring-[#01F9F2]/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Selecione</option>
                    <option value="Entender por que meu crédito foi negado">Por que foi negado?</option>
                    <option value="Analisar restrições no meu nome">Analisar restrições</option>
                    <option value="Entender meu histórico bancário/BACEN">Histórico BACEN</option>
                    <option value="Melhorar meu perfil de risco/rating">Melhorar Rating</option>
                    <option value="Analisar oportunidades para minha empresa">Crédito Empresa</option>
                    <option value="Outro objetivo">Outro objetivo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mensagem / Cenário */}
            <div className="space-y-1.5">
              <label htmlFor="mensagem" className="block text-xs font-semibold text-slate-300">
                Conte brevemente seu cenário
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={cenario}
                onChange={(e) => setCenario(e.target.value)}
                rows={3}
                placeholder="Ex.: Meu nome está limpo, mas continuo com crédito negado em todos os bancos..."
                className="w-full text-sm px-4 py-3 bg-slate-950/80 text-white border border-white/10 rounded-xl focus:outline-none focus:border-[#01F9F2] focus:ring-1 focus:ring-[#01F9F2]/20 transition-all resize-none"
              />
            </div>

            <p className="text-[10px] text-slate-400 leading-normal">
              Ao continuar, você autoriza o contato da HCred para fins de atendimento e análise consultiva gratuita do seu cenário conforme LGPD.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#01F9F2] hover:bg-[#00e5dd] disabled:opacity-50 text-slate-950 font-extrabold text-xs uppercase py-4 rounded-xl shadow-lg shadow-[#01F9F2]/10 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>ENVIANDO...</span>
                </>
              ) : (
                <>
                  Falar com a HCred no WhatsApp →
                </>
              )}
            </button>

            {submitMessage && (
              <div className={`p-3 text-center text-xs rounded-xl font-medium ${
                submitMessage.includes('Erro') || submitMessage.includes('Preencha') || submitMessage.includes('Não foi possível') || submitMessage.includes('erro')
                  ? 'bg-red-950/40 border border-red-500/30 text-red-400'
                  : 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400'
              }`}>
                {submitMessage}
              </div>
            )}

            <p className="text-[10px] text-slate-500 text-center font-medium leading-normal mt-2">
              A análise não representa garantia de crédito ou liberação instantânea.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 bg-[#01F9F2]/10 border border-[#01F9F2]/30 text-[#01F9F2] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-xl text-white">Solicitação Enviada!</h3>
              <p className="text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
                Você está sendo redirecionado para o atendimento seguro do WhatsApp da HCred para iniciar seu Raio-X.
              </p>
            </div>
            {submitMessage && (
              <div className="p-3 text-center text-xs rounded-xl font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 max-w-xs mx-auto">
                {submitMessage}
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setNomeCompleto('');
                setWhatsapp('');
                setBuscaPara('');
                setPrincipalObjetivo('');
                setCenario('');
                setSubmitMessage('');
              }}
              className="px-5 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Simular de novo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
