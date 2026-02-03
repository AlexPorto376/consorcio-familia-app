import React from 'react';

export const PaymentModal = ({ isOpen, onClose, monthData, onUpdatePayment }) => {
    if (!isOpen || !monthData) return null;

    // Calculate stats for this specific month
    const totalPaid = monthData.payments
        .filter(p => p.status === 'paid')
        .reduce((acc, curr) => acc + curr.value, 0);

    const totalParticipants = monthData.payments.length;
    const paidCount = monthData.payments.filter(p => p.status === 'paid').length;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div className="glass-card" style={{
                width: '100%', maxWidth: '500px', maxHeight: '85vh',
                background: '#1e293b', border: '1px solid var(--accent-blue)',
                display: 'flex', flexDirection: 'column'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Mês de {monthData.month}</p>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Contemplado: <span style={{ color: 'var(--accent-blue)' }}>{monthData.contemplated}</span></h3>
                        </div>
                        <button onClick={onClose} style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem' }}>&times;</button>
                    </div>

                    <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.875rem' }}>Arrecadado neste mês:</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--accent-blue)' }}>R$ {totalPaid}</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${(paidCount / totalParticipants) * 100}%`,
                                height: '100%', background: 'var(--success)', transition: 'width 0.3s'
                            }} />
                        </div>
                        <p style={{ fontSize: '0.75rem', marginTop: '4px', textAlign: 'right', color: 'var(--text-secondary)' }}>
                            {paidCount} de {totalParticipants} pagaram
                        </p>
                    </div>
                </div>

                {/* Scrollable List */}
                <div style={{ overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {monthData.payments.map((participant, index) => (
                        <div key={index} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
                            borderLeft: participant.status === 'paid' ? '4px solid var(--success)' : '4px solid var(--text-secondary)'
                        }}>
                            <div>
                                <p style={{ fontWeight: '600' }}>{participant.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Valor:</span>
                                    <input
                                        type="number"
                                        value={participant.value}
                                        onChange={(e) => onUpdatePayment(monthData.month, participant.name, 'value', Number(e.target.value))}
                                        style={{
                                            background: 'transparent', border: 'none', borderBottom: '1px solid var(--text-secondary)',
                                            color: 'var(--text-primary)', width: '60px', padding: '2px', fontSize: '0.9rem'
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => onUpdatePayment(monthData.month, participant.name, 'status', participant.status === 'paid' ? 'pending' : 'paid')}
                                style={{
                                    padding: '8px 16px', borderRadius: '6px', fontWeight: '600', fontSize: '0.8rem',
                                    background: participant.status === 'paid' ? 'var(--success)' : 'rgba(255,255,255,0.1)',
                                    color: participant.status === 'paid' ? '#000' : 'var(--text-secondary)',
                                    border: participant.status === 'paid' ? 'none' : '1px solid var(--text-secondary)'
                                }}
                            >
                                {participant.status === 'paid' ? 'PAGO' : 'PENDENTE'}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};
