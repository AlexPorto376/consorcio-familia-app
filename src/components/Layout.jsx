import React from 'react';
import { Users, FileText } from 'lucide-react';

export const Layout = ({ children, onOpenRules }) => {
    return (
        // Fundo principal da página (acinzentado para destacar a app)
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            
            {/* Contentor Mobile-First: Centrado no ecrã com largura máxima de um telemóvel grande */}
            <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-2xl sm:border-x sm:border-slate-200">
                
                {/* Cabeçalho Fixo (Sticky) */}
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/90 p-6 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        {/* Ícone de destaque do cabeçalho */}
                        <div className="flex rounded-xl bg-emerald-100 p-2 text-emerald-600">
                            <Users size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold leading-tight text-slate-900">Consórcio</h1>
                            <p className="text-sm font-medium text-slate-500">Família 2026</p>
                        </div>
                    </div>
                    
                    {/* Botão de Regras Modernizado */}
                    <button
                        onClick={onOpenRules}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
                    >
                        <FileText size={16} />
                        <span>Regras</span>
                    </button>
                </header>

                {/* Área de Conteúdo Principal */}
                <main className="flex flex-1 flex-col gap-6 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};