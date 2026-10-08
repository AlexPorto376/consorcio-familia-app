import React, { useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ParticipantList } from './components/ParticipantList';
import { RulesModal } from './components/RulesModal';
import { PaymentModal } from './components/PaymentModal';
import { initialConsortiumData, consortiumInfo } from './data';

function App() {
  const [consortiumData, setConsortiumData] = useState(initialConsortiumData);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Bloqueio de Segurança

  // Sincronização em Tempo Real com o Firebase
  useEffect(() => {
    const docRef = doc(db, 'consorcio', 'dados2026');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setConsortiumData(docSnap.data().meses);
      } else {
        // Se a base de dados estiver vazia, cria os dados iniciais
        setDoc(docRef, { meses: initialConsortiumData });
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Atualização de Pagamento apenas para Administradores
  const handleUpdatePayment = async (monthName, participantName, field, newValue) => {
    if (!isAdmin) return;

    const updatedData = consortiumData.map(monthData => {
      if (monthData.month !== monthName) return monthData;
      const updatedPayments = monthData.payments.map(p => 
        p.name === participantName ? { ...p, [field]: newValue } : p
      );
      return { ...monthData, payments: updatedPayments };
    });

    // Atualiza a nuvem instantaneamente
    const docRef = doc(db, 'consorcio', 'dados2026');
    await setDoc(docRef, { meses: updatedData }, { merge: true });
  };

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

      {/* Botão de Acesso do Gestor */}
      <div className="flex justify-end px-2">
        <button
          onClick={() => {
            if (!isAdmin) {
              const pwd = prompt("Palavra-passe de gestão:");
              if (pwd === "alex2026") setIsAdmin(true); // Pode alterar a palavra-passe aqui
              else if (pwd) alert("Palavra-passe incorreta!");
            } else {
              setIsAdmin(false);
            }
          }}
          className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
        >
          {isAdmin ? "🔒 Bloquear Gestão" : "🔑 Acesso Gestor"}
        </button>
      </div>

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
        isAdmin={isAdmin}
      />
    </Layout>
  );
}

export default App;