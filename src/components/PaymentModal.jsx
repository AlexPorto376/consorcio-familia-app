import React from 'react';
import { X, CheckCircle2, Circle, DollarSign, Award } from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, monthData, onUpdatePayment, isAdmin }) => {
    if (!isOpen || !monthData) return null;

    const totalPaid = monthData.payments
        .filter(p => p.status === 'paid')
        .reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

    const totalParticipants = monthData.payments.length;
    const paidCount = monthData.payments.filter(p => p.status === 'paid').length;
    const progressPercent = (paidCount / totalParticipants) * 100;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div 
                className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95"
                onClick={e => e.stopPropagation()}
            >
                <div className="border-b border-slate-100 bg-slate-50 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Mês de {monthData.month}
                            </span>
                            <h3 className="mt-1 flex items-center gap-2 text-xl font-bold text-slate-800">
                                <Award size={20} className="text-amber-500" />
                                {monthData.contemplated}
                            </h3>
                        </div>
                        <button 
                            onClick={onClose}
                            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                        <div className="flex items-end justify-between">
                            <span className="text-sm font-medium text-emerald-800">Total Arrecadado</span>
                            <span className="text-lg font-bold text-emerald-600">R$ {totalPaid}</span>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-3">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-emerald-200/50">
                                <div 
                                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <span className="text-xs font-semibold text-emerald-700">
                                {paidCount}/{totalParticipants}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto p-4 sm:max-h-[60vh]">
                    {monthData.payments.map((participant, index) => {
                        const isPaid = participant.status === 'paid';
                        
                        return (
                            <div 
                                key={index} 
                                className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                                    isPaid 
                                        ? 'border-emerald-200 bg-emerald-50/50' 
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <div className="flex flex-col gap-1">
                                    <span className={`font-semibold ${isPaid ? 'text-emerald-900' : 'text-slate-800'}`}>
                                        {participant.name}
                                    </span>
                                    
                                    <div className="flex items-center gap-1 text-slate-500">
                                        <DollarSign size={14} />
                                        {/* Apenas o Gestor vê a caixa para editar o valor */}
                                        {isAdmin ? (
                                            <input
                                                type="number"
                                                value={participant.value}
                                                onChange={(e) => onUpdatePayment(monthData.month, participant.name, 'value', Number(e.target.value))}
                                                className={`w-16 bg-transparent text-sm font-medium focus:outline-none ${isPaid ? 'text-emerald-700' : 'text-slate-600'}`}
                                                min="0" step="10"
                                            />
                                        ) : (
                                            <span className={`text-sm font-medium ${isPaid ? 'text-emerald-700' : 'text-slate-600'}`}>
                                                {participant.value}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Apenas o Gestor vê o botão clicável. Os familiares vêem apenas uma etiqueta informativa. */}
                                {isAdmin ? (
                                    <button
                                        onClick={() => onUpdatePayment(monthData.month, participant.name, 'status', isPaid ? 'pending' : 'paid')}
                                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                                            isPaid 
                                                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-200' 
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                                        }`}
                                    >
                                        {isPaid ? (
                                            <> <CheckCircle2 size={16} /> Pago </>
                                        ) : (
                                            <> <Circle size={16} /> Pendente </>
                                        )}
                                    </button>
                                ) : (
                                    <div className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${
                                        isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {isPaid ? (
                                            <> <CheckCircle2 size={16} /> Pago </>
                                        ) : (
                                            <> <Circle size={16} /> Pendente </>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};