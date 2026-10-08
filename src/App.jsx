import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ParticipantList } from './components/ParticipantList';
import { RulesModal } from './components/RulesModal';
import { PaymentModal } from './components/PaymentModal';
import { initialConsortiumData, consortiumInfo } from './data';

function App() {
  // Inicialização otimizada do estado
  const [consortiumData, setConsortiumData] = useState(() => {
    try {
      const saved = localStorage.getItem('consortiumData');
      return saved ? JSON.parse(saved) : initialConsortiumData;
    } catch (error) {
      console.error("Erro ao carregar dados locais", error);
      return initialConsortiumData;
    }
  });

  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    localStorage.setItem('consortiumData', JSON.stringify(consortiumData));
  }, [consortiumData]);

  const handleUpdatePayment = (monthName, participantName, field, newValue) => {
    setConsortiumData(prevData => prevData.map(monthData => {
      if (monthData.month !== monthName) return monthData;

      const updatedPayments = monthData.payments.map(p => 
        p.name === participantName ? { ...p, [field]: newValue } : p
      );

      return { ...monthData, payments: updatedPayments };
    }));
  };

  // Performance: Cálculo memorizado com useMemo
  const totalCollected = useMemo(() => {
    return consortiumData.reduce((acc, month) => {
      const monthTotal = month.payments
        .filter(p => p.status === 'paid')
        .reduce((mAcc, curr) => mAcc + (Number(curr.value) || 0), 0);
      return acc + monthTotal;
    }, 0);
  }, [consortiumData]);

  const currentlySelectedData = selectedMonth
    ? consortiumData.find(m => m.month === selectedMonth.month)
    : null;

  return (
    <Layout onOpenRules={() => setIsRulesOpen(true)}>
      <Dashboard
        totalCollected={totalCollected}
        nextPayment={consortiumInfo.nextPaymentDate}
      />

      <ParticipantList
        monthsData={consortiumData}
        onItemClick={setSelectedMonth}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        rules={consortiumInfo.rules}
      />

      <PaymentModal
        isOpen={!!selectedMonth}
        onClose={() => setSelectedMonth(null)}
        monthData={currentlySelectedData}
        onUpdatePayment={handleUpdatePayment}
      />
    </Layout>
  );
}

export default App;
