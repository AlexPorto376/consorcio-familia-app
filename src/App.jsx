import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ParticipantList } from './components/ParticipantList';
import { RulesModal } from './components/RulesModal';
import { PaymentModal } from './components/PaymentModal';
import { initialConsortiumData, consortiumInfo } from './data';

function App() {
  // State for the full data set
  const [consortiumData, setConsortiumData] = useState(() => {
    // Try to load from localStorage to persist changes
    const saved = localStorage.getItem('consortiumData');
    return saved ? JSON.parse(saved) : initialConsortiumData;
  });

  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null); // For PaymentModal

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('consortiumData', JSON.stringify(consortiumData));
  }, [consortiumData]);

  // Handler to update a specific payment (status or value)
  const handleUpdatePayment = (monthName, participantName, field, newValue) => {
    setConsortiumData(prevData => prevData.map(monthData => {
      if (monthData.month !== monthName) return monthData;

      // Found the month, now find the participant in the payments list
      const updatedPayments = monthData.payments.map(p => {
        if (p.name !== participantName) return p;
        return { ...p, [field]: newValue };
      });

      return { ...monthData, payments: updatedPayments };
    }));
  };

  // Recalculate Global Total (Sum of ALL payments across ALL months that are 'paid')
  const totalCollected = consortiumData.reduce((acc, month) => {
    const monthTotal = month.payments
      .filter(p => p.status === 'paid')
      .reduce((mAcc, curr) => mAcc + curr.value, 0);
    return acc + monthTotal;
  }, 0);

  // Helper to get currently selected month data
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
