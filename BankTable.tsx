import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2, Layers, AlertCircle, Plus, Zap } from 'lucide-react';
import { Bank } from '../types';
import { Button } from './ui/Button';
import { Switch } from './ui/Switch';

interface BankTableProps {
  banks: Bank[];
  onEdit: (bank: Bank) => void;
  onDelete: (bank: Bank) => void;
  onToggleStatus: (bank: Bank, status: boolean) => void;
  onAddProgram: (bank: Bank) => void;
}

export const BankTable: React.FC<BankTableProps> = ({ 
  banks, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  onAddProgram 
}) => {
  const [expandedBankId, setExpandedBankId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedBankId(prev => prev === id ? null : id);
  };

  if (banks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Layers className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Банки не найдены</h3>
        <p className="text-gray-500 max-w-sm mb-6">
          Список банков пуст. Добавьте новый банк, чтобы начать работу с калькулятором.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
              <th className="px-6 py-4 font-semibold">Банк</th>
              <th className="px-6 py-4 font-semibold text-center">Программы</th>
              <th className="px-6 py-4 font-semibold text-center">Статус</th>
              <th className="px-6 py-4 font-semibold text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banks.map((bank) => {
              const isExpanded = expandedBankId === bank.id;
              return (
                <React.Fragment key={bank.id}>
                  <tr 
                    className={`transition-colors hover:bg-blue-50/30 ${isExpanded ? 'bg-blue-50/50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                         <button 
                            onClick={() => toggleExpand(bank.id)}
                            className={`p-1 rounded-md transition-colors ${isExpanded ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                         >
                           {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                         </button>
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 p-1 flex-shrink-0 relative">
                             {bank.logo ? <img src={bank.logo} className="w-full h-full object-contain" alt="" /> : <div className="w-full h-full bg-gray-100 rounded" />}
                             {bank.autoRates && (
                                <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white rounded-full p-0.5 border-2 border-white" title="Автоставки банка">
                                  <Zap size={10} />
                                </div>
                             )}
                           </div>
                           <div>
                             <div className="font-semibold text-gray-900 flex items-center gap-2">
                               {bank.name}
                             </div>
                             {bank.description && <div className="text-xs text-gray-500 truncate max-w-[200px]">{bank.description}</div>}
                           </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bank.programs.length > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {bank.programs.length} Программ
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Switch checked={bank.isActive} onChange={(val) => onToggleStatus(bank, val)} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onEdit(bank)}
                          title="Редактировать банк"
                          className="text-gray-500 hover:text-primary"
                        >
                          <Edit2 size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onDelete(bank)}
                          title="Удалить банк"
                          className="text-gray-500 hover:text-danger"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row */}
                  {isExpanded && (
                    <tr className="bg-blue-50/20">
                      <td colSpan={4} className="px-6 py-4 border-b border-gray-100">
                        <div className="ml-16">
                          <div className="flex items-center justify-between mb-3">
                             <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Ипотечные программы</h4>
                             <Button size="sm" variant="outline" icon={<Plus size={14} />} onClick={() => onAddProgram(bank)}>
                               Добавить программу
                             </Button>
                          </div>
                          
                          {bank.programs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {bank.programs.map((prog) => (
                                <div key={prog.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                   <div className="flex justify-between items-start mb-2">
                                     <h5 className="font-bold text-gray-900 flex items-center gap-1">
                                        {prog.name}
                                        {prog.autoRates && <Zap size={14} className="text-blue-500" title="Автоставки" />}
                                     </h5>
                                     <div className="text-xl font-bold text-primary">{prog.rate}%</div>
                                   </div>
                                   <div className="text-sm text-gray-600 space-y-1">
                                      <div className="flex justify-between">
                                        <span>Срок:</span>
                                        <span className="font-medium">{prog.minTerm} - {prog.maxTerm} лет</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Взнос:</span>
                                        <span className="font-medium">от {prog.minDownPayment}%</span>
                                      </div>
                                   </div>
                                   {prog.specialConditions && (
                                     <div className="mt-3 text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded inline-block">
                                       ★ Особые условия
                                     </div>
                                   )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-500 text-sm italic py-2">
                              <AlertCircle size={16} />
                              Программы для этого банка еще не настроены.
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination Placeholder */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <span className="text-sm text-gray-500">Показано {banks.length} банков</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-600 text-sm disabled:opacity-50" disabled>Назад</button>
          <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-600 text-sm disabled:opacity-50" disabled>Вперед</button>
        </div>
      </div>
    </div>
  );
};
