import React from 'react';

const StatusBadge = ({ percentPaid }) => {
    // If 100% paid, show "Completo". If 0%, "Pendente". In between "Em andamento"
    let text = 'Pendente';
    let styles = { bg: 'rgba(148, 163, 184, 0.2)', color: '#cbd5e1' };

    if (percentPaid === 100) {
        text = 'Completo';
        styles = { bg: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' };
    } else if (percentPaid > 0) {
        text = `${percentPaid}%`;
        styles = { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' };
    }

    return (
        <span style={{
            background: styles.bg,
            color: styles.color,
            padding: '4px 8px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: '600'
        }}>
            {text}
        </span>
    );
};

export const ParticipantList = ({ monthsData, onItemClick }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Cronograma (Toque para gerenciar)</h3>
            {monthsData.map((data, index) => {
                // Calculate percentage paid for this month
                const paidCount = data.payments.filter(p => p.status === 'paid').length;
                const totalCount = data.payments.length;
                const percent = Math.round((paidCount / totalCount) * 100);

                return (
                    <div key={index}
                        onClick={() => onItemClick(data)}
                        className="glass-card"
                        style={{
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            borderLeft: percent === 100 ? '4px solid var(--success)' : '1px solid var(--glass-border)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '12px', background: 'var(--secondary-bg)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-blue)', border: '1px solid var(--glass-border)'
                            }}>
                                <span style={{ textTransform: 'uppercase' }}>{data.month.substring(0, 3)}</span>
                            </div>
                            <div>
                                <p style={{ fontWeight: '600', fontSize: '1rem' }}>{data.contemplated}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Prêmio: R$ {data.prizeValue}</p>
                            </div>
                        </div>
                        <StatusBadge percentPaid={percent} />
                    </div>
                );
            })}
        </div>
    );
};
