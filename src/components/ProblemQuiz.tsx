import { useState } from 'react';
import { AlertTriangle, Clock, TrendingDown, CheckSquare, Square, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProblemQuiz() {
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const problems = [
    {
      id: 'freeze',
      label: 'La computadora se congela antes de guardar',
      lostMinutes: 35,
      lostDollars: 12,
    },
    {
      id: 'fan',
      label: 'El ventilador ruge ruidosamente y se sobrecalienta',
      lostMinutes: 20,
      lostDollars: 5,
    },
    {
      id: 'battery',
      label: 'La batería dura menos de 1 hora o depende de estar enchufada',
      lostMinutes: 45,
      lostDollars: 15,
    },
    {
      id: 'wait',
      label: 'Esperas eternamente a que abran Excel, Word o el navegador',
      lostMinutes: 25,
      lostDollars: 8,
    },
    {
      id: 'borrowed',
      label: 'No tengo computadora propia (dependo de otros, biblioteca o ciber)',
      lostMinutes: 60,
      lostDollars: 25,
    },
  ];

  const handleToggle = (id: string) => {
    if (isSubmitted) return;
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedTimeLostYearly = selectedProblems.reduce((total, id) => {
    const item = problems.find((p) => p.id === id);
    return total + (item ? item.lostMinutes * 240 : 0); // 240 active days a year
  }, 0);

  const calculatedMoneyLostYearly = selectedProblems.reduce((total, id) => {
    const item = problems.find((p) => p.id === id);
    return total + (item ? item.lostDollars * 240 : 0);
  }, 0);

  const totalHoursLost = Math.round(calculatedTimeLostYearly / 60);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-1.5 bg-red-500/10 text-red-400 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
        </span>
        <h4 className="font-bold text-zinc-100 text-base md:text-lg">
          Calculadora de Costo de Lentitud
        </h4>
      </div>

      <p className="text-zinc-400 text-xs md:text-sm mb-6 leading-relaxed">
        Marca los síntomas que sufres con tu dispositivo actual y descubre el impacto silencioso en tu tiempo y economía cada año:
      </p>

      <div className="space-y-3.5 mb-6">
        {problems.map((prob) => {
          const isSelected = selectedProblems.includes(prob.id);
          return (
            <button
              key={prob.id}
              onClick={() => handleToggle(prob.id)}
              disabled={isSubmitted}
              className={`w-full flex items-start text-left gap-3.5 p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-red-500/5 border-red-500/40 text-zinc-100'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/40'
              }`}
            >
              <span className="mt-0.5 shrink-0 transition-colors">
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 text-red-500" />
                ) : (
                  <Square className="w-5 h-5 text-zinc-600" />
                )}
              </span>
              <div>
                <p className="text-sm font-semibold transition-colors leading-snug">
                  {prob.label}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Pérdida aprox: {prob.lostMinutes} mins/día · Costo silencioso: ${prob.lostDollars}/día
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <div className="text-center">
            <button
              onClick={() => setIsSubmitted(true)}
              disabled={selectedProblems.length === 0}
              className={`w-full md:w-auto font-bold px-8 py-3.5 rounded-xl transition-all ${
                selectedProblems.length > 0
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              Revelar Mi Reporte de Desperdicio
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-t border-zinc-800 pt-6 mt-6"
          >
            <h5 className="font-bold text-center text-red-400 text-lg mb-6 flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 animate-pulse" />
              Tu Diagnóstico Técnico Anual:
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-center">
                <Clock className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <span className="text-3xl font-extrabold text-red-400 block tracking-tight">
                  {totalHoursLost} hrs
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mt-1">
                  Tiempo Perdido al Año
                </span>
                <span className="text-xs text-zinc-400 mt-1.5 block leading-normal">
                  Equivale a casi <strong className="text-zinc-300">{(totalHoursLost / 24).toFixed(1)} días de vida enteros</strong> esperando pantallas de carga.
                </span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-center">
                <TrendingDown className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <span className="text-3xl font-extrabold text-red-400 block tracking-tight">
                  ${calculatedMoneyLostYearly} USD
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mt-1">
                  Costo de Oportunidad
                </span>
                <span className="text-xs text-zinc-400 mt-1.5 block leading-normal">
                  Dinero que dejaste de ganar en freelance o trabajo por ineficiencias técnicas.
                </span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6">
              <p className="text-xs md:text-sm text-emerald-400 text-center font-medium leading-relaxed">
                👉 Con una <strong>Laptop Tech Pro de $469</strong>, detienes esta pérdida de inmediato. Recuperas tu inversión en menos de un mes de uso optimizado.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedProblems([]);
                }}
                className="text-xs text-zinc-500 hover:text-zinc-300 underline font-medium"
              >
                Volver a calcular
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
