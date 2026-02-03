import React from 'react';

export const Layout = ({ children, onOpenRules }) => {
    return (
        <div className="container animate-fade-in">
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Consórcio</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Família 2026</p>
                </div>
                <button
                    onClick={onOpenRules}
                    className="glass-card"
                    style={{
                        padding: '8px 16px',
                        color: 'var(--accent-gold)',
                        fontWeight: '600',
                        fontSize: '0.875rem'
                    }}
                >
                    Regras
                </button>
            </header>
            <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {children}
            </main>
        </div>
    );
};
