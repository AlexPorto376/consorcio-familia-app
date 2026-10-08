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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'consorcio', 'dados2026_final');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setConsortiumData(docSnap.data().meses);
      } else {
        setDoc(docRef, { meses: initialConsortiumData });
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleUpdatePayment = async (monthName, participantName, field, newValue) => {
    if (!isAdmin) return;

    const updatedData = consortiumData.map(monthData => {
      if (monthData.month !== monthName) return monthData;
      const updatedPayments = monthData.payments.map(p => 
        p.name === participantName ? { ...p, [field]: newValue } : p
      );
      return { ...monthData, payments: updatedPayments };
    });

    const docRef = doc(db, 'consorcio', 'dados2026_final');
    await setDoc(docRef, { meses: updatedData }, { merge: true });
  };

  // NOVA FUNÇÃO: Troca inteligente de meses entre dois participantes
  const handleSwapContemplated = async (currentMonthName, newContemplatedName) => {
    if (!isAdmin) return;

    const currentMonth = consortiumData.find(m => m.month === currentMonthName);
    const oldContemplatedName = currentMonth.contemplated;

    // Se escolheu a mesma pessoa, não faz nada
    if (oldContemplatedName === newContemplatedName) return;

    // Encontra o mês onde a nova pessoa estava
    const otherMonth = consortiumData.find(m => m.contemplated === newContemplatedName);

    const updatedData = consortiumData.map(monthData => {
      // Atualiza o mês atual com a nova pessoa
      if (monthData.month === currentMonthName) {
        return { ...monthData, contemplated: newContemplatedName };
      }
      // Pega o antigo dono deste mês e atira-o para o mês que ficou vago
      if (otherMonth && monthData.month === otherMonth.month) {
        return { ...monthData, contemplated: oldContemplatedName };
      }
      return monthData;
    });

    const docRef = doc(db, 'consorcio', 'dados2026_final');
    await setDoc(docRef, { meses: updatedData }, { merge: true });
  };

  const handleShuffleMonths = async () => {
    if (!isAdmin) return;
    
    const confirmShuffle = window.confirm(
      "ATENÇÃO: Tem a certeza que deseja sortear a ordem dos meses?\n\nIsto vai baralhar quem recebe em cada mês e atualizar o sistema para todos os participantes imediatamente!"
    );
    if (!confirmShuffle) return;

    if (!consortiumData || consortiumData.length === 0) return;
    
    let participants = consortiumData[0].payments.map(p => p.name);
    
    for (let i = participants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participants[i], participants[j]] = [participants[j], participants[i]];
    }
    
    const updatedData = consortiumData.map((monthData, index) => {
      return {
        ...monthData,
        contemplated: participants[index] || "Pendente"
      };
    });

    const docRef = doc(db, 'consorcio', 'dados2026_final');
    await setDoc(docRef, { meses: updatedData }, { merge: true });
    
    alert("Sorteio realizado com sucesso! 🎉\nA nova ordem já está disponível para todos.");
  };

  const toggleAdmin = () => {
    if (!isAdmin) {
      const pwd = prompt("Palavra-passe de gestão:");
      if (pwd === "alex2026") {
        setIsAdmin(true);
      } else if (pwd !== null) {
        alert("Palavra-passe incorreta!");
      }
    } else {
      setIsAdmin(false);
    }
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

      <div className="mb-4 mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-2 border border-slate-100">
        <div>
          {isAdmin && (
            <button
              onClick={handleShuffleMonths}
              className="flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95"
            >
              🎲 Sortear Meses
            </button>
          )}
        </div>

        <button
          onClick={toggleAdmin}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
            isAdmin 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
          }`}
        >
          {isAdmin ? "🔒 Fechar Gestão" : "🔑 Acesso Gestor"}
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
        onSwapContemplated={handleSwapContemplated}
        isAdmin={isAdmin}
      />
    </Layout>
  );
}

export default App;