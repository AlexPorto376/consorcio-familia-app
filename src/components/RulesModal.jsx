import React from 'react';

export const RulesModal = ({ isOpen, onClose, rules }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div className="glass-card" style={{
                width: '100%', maxWidth: '400px', padding: '24px',
                background: '#1e293b', border: '1px solid var(--accent-gold)'
            }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>Regras</h3>
                    <button onClick={onClose} style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem' }}>&times;</button>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '20px' }}>
                    {rules.map((rule, idx) => (
                        <li key={idx} style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            {rule}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} style={{
                    marginTop: '24px', width: '100%', padding: '12px', borderRadius: '8px',
                    background: 'var(--accent-gold)', color: '#0f172a', fontWeight: 'bold'
                }}>
                    Entendi
                </button>
            </div>
        </div>
    );
};
