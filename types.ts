export interface MortgageProgram {
  id: string;
  name: string; // Теперь это будет значение из списка
  rate: number;
  minTerm: number;
  maxTerm: number;
  minDownPayment: number; // percentage
  conditions?: string; // Описание условий программы
  specialConditions: boolean;
  autoRates: boolean; // Новое поле для автоставок
}

export interface Bank {
  id: string;
  name: string;
  logo?: string; // URL or placeholder
  description?: string;
  isActive: boolean;
  autoRates: boolean; // Новое поле для автоставок банка
  programs: MortgageProgram[];
}

export type BankFilter = 'all' | 'active' | 'inactive';
export type ProgramFilter = 'all' | 'with_programs' | 'no_programs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}