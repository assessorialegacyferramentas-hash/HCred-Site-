export interface CompanyConfig {
  razaoSocial: string;
  cnpj: string;
  telefone: string;
  emailSac: string;
  endereco: string;
  numeroRua: string;
  cep: string;
  cidade: string;
  estado: string;
  taxaMensalMinima: number;
  prazoMaximoMeses: number;
  valorMinimoEmprestimo: number;
  valorMaximoEmprestimo: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  iconName: string;
}
