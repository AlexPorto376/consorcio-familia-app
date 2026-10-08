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
  generateMonthData('Fevereiro', 'Alex'),
  generateMonthData('Março', 'Andréia'),
  generateMonthData('Abril', 'Sidney'),
  generateMonthData('Maio', 'Gabriel'),
  generateMonthData('Junho', 'Ana'),
  generateMonthData('Julho', 'Kau'),
  generateMonthData('Agosto', 'Mirtes'),
  generateMonthData('Setembro', 'Porto'),
  generateMonthData('Outubro', 'Lilyan'),
  generateMonthData('Novembro', 'Daniel'),
];

export const consortiumInfo = {
  totalGoal: 10000,
  monthlyValue: 100,
  nextPaymentDate: '5º dia útil',
  rules: [
    'Pagamento todo 5º dia útil (sem atraso).',
    'Depósito direto na conta do contemplado.',
    'Comprovante direto para o contemplado e no grupo da família.',
    '4. Um mês não pago (inadimplente) será excluído do consórcio.'
  ]
};
