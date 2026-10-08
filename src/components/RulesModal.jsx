import React from 'react';
import { X, FileText, CheckCircle2 } from 'lucide-react';

export const RulesModal = ({ isOpen, onClose, rules }) => {
    if (!isOpen) return null;

    return (
        // Fundo escuro com desfoque (Backdrop)
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            {/* Contentor Principal */}
            <div 
                className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95"
                onClick={e => e.stopPropagation()}
            >
                {/* Cabeçalho */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex rounded-xl bg-amber-100 p-2 text-amber-600">
                            <FileText size={20} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Regras do Consórcio</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Área de Conteúdo */}
                <div className="p-6">
                    {/* Lista de Regras com Ícones */}
                    <ul className="flex flex-col gap-4">
                        {rules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                                <span className="leading-relaxed">{rule}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Botão de Confirmação */}
                    <button 
                        onClick={onClose} 
                        className="mt-8 w-full rounded-xl bg-slate-800 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-slate-900 active:bg-slate-950"
                    >
                        Li e Entendi
                    </button>
                </div>
            </div>
        </div>
    );
};