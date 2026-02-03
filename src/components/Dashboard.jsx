import React from 'react';

export const Dashboard = ({ totalCollected, nextPayment }) => {
    return (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Arrecadado</p>
                    <h2 style={{ fontSize: '2rem', color: 'var(--accent-blue)', lineHeight: 1 }}>
                        R$ {totalCollected.toLocaleString('pt-BR')}
                    </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Meta Total</p>
                    <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>R$ 10.000</p>
                </div>
            </div>

            <div style={{ height: '1px', background: 'var(--glass-border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)'
                }}>
                    📅
                </div>
                <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Próximo Pagamento</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{nextPayment}</p>
                </div>
            </div>
        </div>
    );
};
