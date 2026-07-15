import React, { useState } from 'react';
import { CompanyConfig } from '../types';
import { Settings, X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomizerProps {
  config: CompanyConfig;
  onChange: (newConfig: CompanyConfig) => void;
  onReset: () => void;
}

export default function Customizer({ config, onChange, onReset }: CustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleChange = (field: keyof CompanyConfig, value: string | number) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          id="btn-personalizar-dados"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
        >
          <Settings className="w-5 h-5 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
            Personalizar Página
          </span>
          <span className="text-xs bg-sky-500 px-2 py-0.5 rounded-full border border-sky-400">
            Editor
          </span>
        </button>
      </div>

      {/* Slide-over Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="customizer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Panel */}
            <motion.div
              id="customizer-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-sky-500/20 text-sky-400 rounded-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg font-display">Editor de Informações</h3>
                    <p className="text-xs text-slate-400">Personalize os dados em tempo real</p>
                  </div>
                </div>
                <button
                  id="close-customizer"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs leading-relaxed">
                  Substitua os dados de exemplo pelos dados da sua empresa. Os placeholders <code className="bg-amber-100 px-1 py-0.5 rounded">EDITAR_RAZAO_SOCIAL</code>, <code className="bg-amber-100 px-1 py-0.5 rounded">EDITAR_CNPJ</code>, etc., serão atualizados instantaneamente em toda a página!
                </div>

                {/* Company Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                    Dados Corporativos
                  </h4>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Razão Social
                    </label>
                    <input
                      type="text"
                      value={config.razaoSocial}
                      onChange={(e) => handleChange('razaoSocial', e.target.value)}
                      placeholder="EDITAR_RAZAO_SOCIAL"
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      value={config.cnpj}
                      onChange={(e) => handleChange('cnpj', e.target.value)}
                      placeholder="EDITAR_CNPJ"
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Telefone
                      </label>
                      <input
                        type="text"
                        value={config.telefone}
                        onChange={(e) => handleChange('telefone', e.target.value)}
                        placeholder="EDITAR_TELEFONE"
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        E-mail SAC
                      </label>
                      <input
                        type="email"
                        value={config.emailSac}
                        onChange={(e) => handleChange('emailSac', e.target.value)}
                        placeholder="sac@lit.com.br"
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Info */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                    Endereço
                  </h4>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Logradouro/Rua
                      </label>
                      <input
                        type="text"
                        value={config.endereco}
                        onChange={(e) => handleChange('endereco', e.target.value)}
                        placeholder="EDITAR_RUA"
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        value={config.numeroRua}
                        onChange={(e) => handleChange('numeroRua', e.target.value)}
                        placeholder="EDITAR_NUMERO"
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={config.cep}
                        onChange={(e) => handleChange('cep', e.target.value)}
                        placeholder="EDITAR_CEP"
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={config.cidade}
                        onChange={(e) => handleChange('cidade', e.target.value)}
                        placeholder="EDITAR_CIDADE"
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Estado (UF)
                      </label>
                      <input
                        type="text"
                        value={config.estado}
                        onChange={(e) => handleChange('estado', e.target.value)}
                        placeholder="EDITAR_ESTADO"
                        maxLength={2}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 uppercase transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Settings */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                    Condições de Crédito
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Taxa Mínima (% a.m.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={config.taxaMensalMinima}
                        onChange={(e) => handleChange('taxaMensalMinima', Number(e.target.value))}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Prazo Máximo (Meses)
                      </label>
                      <input
                        type="number"
                        value={config.prazoMaximoMeses}
                        onChange={(e) => handleChange('prazoMaximoMeses', Number(e.target.value))}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Valor Mínimo (R$)
                      </label>
                      <input
                        type="number"
                        step="500"
                        value={config.valorMinimoEmprestimo}
                        onChange={(e) => handleChange('valorMinimoEmprestimo', Number(e.target.value))}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Valor Máximo (R$)
                      </label>
                      <input
                        type="number"
                        step="10000"
                        value={config.valorMaximoEmprestimo}
                        onChange={(e) => handleChange('valorMaximoEmprestimo', Number(e.target.value))}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

              </form>

              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onReset}
                  className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Redefinir Padrões
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Visualizar Alterações
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating saved status */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-800"
          >
            <span className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Check className="w-4 h-4" />
            </span>
            <span className="text-sm font-medium">Configurações salvas e aplicadas!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
