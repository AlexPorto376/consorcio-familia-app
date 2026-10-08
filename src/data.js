export const participantsList = [
  'Alex', 'Andréia', 'Sidney', 'Gabriel', 'Ana',
  'Kau', 'Mirtes', 'Porto', 'Lilyan', 'Daniel'
];

const generateMonthData = (month, contemplated) => {
  return {
    month,
    contemplated,
    prizeValue: 1500,
    status: 'pending',
    payments: participantsList.map(name => ({
      name,
      value: 150, // Default contribution
      status: 'pending' // pending | paid
    }))
  };
};

export const initialConsortiumData = [
  generateMonthData('Janeiro', 'Alex'),
  generateMonthData('Fevereiro', 'Andréia'),
  generateMonthData('Março', 'Sidney'),
  generateMonthData('Abril', 'Gabriel'),
  generateMonthData('Maio', 'Ana'),
  generateMonthData('Junho', 'Kau'),
  generateMonthData('Julho', 'Mirtes'),
  generateMonthData('Agosto', 'Porto'),
  generateMonthData('Setembro', 'Lilyan'),
  generateMonthData('Outubro', 'Daniel'),
];

export const consortiumInfo = {
  totalGoal: 15000, // Corrigido para 15.000 (10 x 1500)
  monthlyValue: 150, // Corrigido para 150 (valor que cada um paga)
  nextPaymentDate: '5º dia útil',
  rules: [
    'Pagamento todo 5º dia útil (sem atraso).',
    'Depósito direto na conta do contemplado.',
    'Comprovante direto para o contemplado e no grupo da família.',
    '4. Um mês não pago (inadimplente) será excluído do consórcio.'
  ]
};
