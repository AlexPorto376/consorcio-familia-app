import React from 'react';
import { ChevronRight, Gift } from 'lucide-react';

// Componente isolado para a etiqueta de estado
const StatusBadge = ({ percentPaid }) => {
    if (percentPaid === 100) {
        return (
            <span className="flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Completo
            </span>
        );
    }
    
    if (percentPaid > 0) {
        return (
            <span className="flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                {percentPaid}% Pago
            </span>
        );
    }

    return (
        <span className="flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
            Pendente
        </span>
    );
};

export const ParticipantList = ({ monthsData, onItemClick }) => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-800">
                Cronograma de Sorteios
            </h3>
            
            <div className="flex flex-col gap-3">
                {monthsData.map((data, index) => {
                    // Cálculo da percentagem de pagamentos
                    const paidCount = data.payments.filter(p => p.status === 'paid').length;
                    const totalCount = data.payments.length;
                    const percent = Math.round((paidCount / totalCount) * 100);

                    return (
                        <div 
                            key={index}
                            onClick={() => onItemClick(data)}
                            className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-md hover:ring-1 hover:ring-emerald-200"
                        >
                            <div className="flex items-center gap-4">
                                {/* Caixa do Mês */}
                                <div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border ${percent === 100 ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-slate-100 bg-slate-50 text-slate-600'}`}>
                                    <span className="text-sm font-bold uppercase tracking-wider">
                                        {data.month.substring(0, 3)}
                                    </span>
                                </div>
                                
                                {/* Informação do Contemplado */}
                                <div className="flex flex-col">
                                    <span className="font-semibold text-slate-800">
                                        {data.contemplated}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                                        <Gift size={12} />
                                        R$ {data.prizeValue}
                                    </span>
                                </div>
                            </div>

                            {/* Estado e Seta de Ação */}
                            <div className="flex items-center gap-3">
                                <StatusBadge percentPaid={percent} />
                                <ChevronRight 
                                    size={18} 
                                    className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500" 
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};