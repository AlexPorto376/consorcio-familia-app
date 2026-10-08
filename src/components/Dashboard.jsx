import React from 'react';
import { Wallet, Target, Calendar } from 'lucide-react';

export const Dashboard = ({ totalCollected, nextPayment }) => {
    // Lógica de UX: Calcula a percentagem da meta para a barra de progresso (limitado a 100%)
    const metaTotal = 15000;
    const progresso = Math.min((totalCollected / metaTotal) * 100, 100);

    return (
        <div className="flex flex-col gap-4">
            
            {/* Cartão Principal: Valor Arrecadado e Meta */}
            <div className="relative overflow-hidden rounded-2xl bg-emerald-500 p-6 shadow-lg shadow-emerald-200">
                {/* Efeito de luz decorativo no fundo do cartão */}
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                
                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-emerald-50">
                            <Wallet size={18} opacity={0.9} />
                            <span className="text-xs font-semibold uppercase tracking-wider">Total Arrecadado</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            R$ {totalCollected.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>

                {/* Barra de Progresso Visual */}
                <div className="relative z-10 mt-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-medium text-emerald-100">
                        <span>Progresso da Meta</span>
                        <span>{progresso.toFixed(1)}%</span>
                    </div>
                    
                    {/* Trilha da Barra */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-700/40">
                        {/* Preenchimento da Barra */}
                        <div 
                            className="h-full rounded-full bg-white transition-all duration-1000 ease-out" 
                            style={{ width: `${progresso}%` }}
                        />
                    </div>
                    
                    <div className="mt-1 flex items-center justify-between text-xs text-emerald-100">
                        <span>R$ 0</span>
                        <span className="flex items-center gap-1 font-medium">
                            <Target size={12} /> R$ {metaTotal.toLocaleString('pt-BR')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Cartão Secundário: Aviso de Próximo Pagamento */}
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                    <Calendar size={24} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Próximo Pagamento</span>
                    <span className="text-lg font-bold text-slate-800">{nextPayment}</span>
                </div>
            </div>

        </div>
    );
};