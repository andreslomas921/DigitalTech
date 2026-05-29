import { useState } from 'react';
import { User, BookOpen, Brush, Notebook, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StorySection() {
  const [activeTab, setActiveTab] = useState('mariana');

  const anecdotes = [
    {
      id: 'mariana',
      name: 'Mariana G.',
      age: 22,
      tag: 'Estudiante y Asistente',
      icon: BookOpen,
      iconColor: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      quote: "Estudiar para un examen y que el sistema se congele antes de guardar era mi dolor de cabeza constante.",
      story: "Mariana está en su último semestre de universidad y trabaja medio tiempo. Cada mañana cargaba una laptop vieja heredada de su madre. La batería solo duraba 47 minutos. El teclado tenía teclas trabadas y abrir un Excel grande tardaba un coma técnico de cinco minutos. Vivía rezando para que no fuera el último día del equipo.",
      outcome: "Hoy con su Laptop Tech Pro, entra a clase, abre sus archivos en segundos, y su batería dura toda la jornada laboral y de estudio. Siente que es dueña absoluta de su tiempo."
    },
    {
      id: 'roberto',
      name: 'Roberto V.',
      age: 31,
      tag: 'Diseñador Freelance Junior',
      icon: Brush,
      iconColor: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      quote: "Quería aprender diseño para ganar extra desde casa, pero mi computadora me frenaba por completo.",
      story: "Roberto es padre de familia y quería dar el salto al campo digital ofreciendo servicios freelance de diseño e ilustración. Pero su vieja computadora de escritorio no le permitía correr programas modernos ni rendir pruebas técnicas a tiempo. Perdió varios clientes de arranque por culpa de pantallazos azules repentinos.",
      outcome: "Compró la Tech Pro por $469 y a las semanas obtuvo su primer contrato certificado de diseño remoto. La inversión se pagó sola en el primer mes de trabajo fluido."
    },
    {
      id: 'daniel',
      name: 'Daniel M.',
      age: 35,
      tag: 'Contador Independiente',
      icon: Notebook,
      iconColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      quote: "No puedo darme el lujo de fallar a mis clientes. Necesitaba confiabilidad absoluta sin gastar un dineral.",
      story: "Daniel administra contabilidades complejas. Trabaja con hojas de cálculo extensas de varios clientes y correos urgentes. Su laptop previa se calentaba de forma alarmante y tardaba hasta 3 minutos simplemente en arrancar un libro con fórmulas. Vivía con estrés constante de perder datos críticos o llegar tarde a reportes oficiales.",
      outcome: "Con su Laptop Tech Pro, puede manejar múltiples portales del SAT, hojas de cálculo de 4 clientes y llamadas multimedia simultáneamente. Todo vuela fresco y silencioso."
    },
    {
      id: 'sofia',
      name: 'Sofía R.',
      age: 28,
      tag: 'Emprendedora Digital',
      icon: ShoppingBag,
      iconColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      quote: "Mi negocio en redes requiere respuesta inmediata. Estar fuera de casa sin cargador era imposible.",
      story: "Sofía vende artículos de moda online. Responde mensajes de clientes en Instagram, edita catálogos de fotos y gestiona envíos todo el día. Su equipo anterior pesaba demasiado y requería estar atado a la pared constantemente, limitando su libertad para moverse por ferias, cafés o mientras hacía entregas.",
      outcome: "La Tech Pro es ultradelgada, ligera y con una batería robusta para todo el día. Gestiona su tienda online, edita reels y despacha pedidos desde cualquier parte, libre de cables."
    }
  ];

  const activeAnecdote = anecdotes.find((a) => a.id === activeTab) || anecdotes[0];
  const IconComponent = activeAnecdote.icon;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {anecdotes.map((anec) => {
          const TabIcon = anec.icon;
          const isSelected = activeTab === anec.id;
          return (
            <button
              key={anec.id}
              onClick={() => setActiveTab(anec.id)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-100 shadow-sm'
                  : 'bg-zinc-50 border-zinc-200/60 text-zinc-600 hover:bg-zinc-100/70'
              }`}
            >
              <span className={`p-1 rounded-lg border shrink-0 ${
                isSelected ? 'bg-zinc-800 border-zinc-700 text-emerald-400' : 'bg-white border-zinc-200 text-zinc-500'
              }`}>
                <TabIcon className="w-4 h-4" />
              </span>
              <div className="overflow-hidden">
                <p className="text-xs font-bold leading-tight truncate">{anec.name}</p>
                <p className="text-[10px] text-zinc-500 truncate">{anec.tag}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Story Display with Animation */}
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 md:p-10 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAnecdote.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            {/* Left Block Quote */}
            <div className="md:col-span-5 space-y-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${activeAnecdote.iconColor}`}>
                <IconComponent className="w-3.5 h-3.5" />
                {activeAnecdote.tag}
              </span>
              
              <h4 className="text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                &ldquo;{activeAnecdote.quote}&rdquo;
              </h4>
              
              <div className="flex items-center gap-2.5 pt-2">
                <div className="w-10 h-10 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center font-bold text-zinc-700">
                  {activeAnecdote.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{activeAnecdote.name}, {activeAnecdote.age} años</p>
                  <p className="text-xs text-zinc-500">Usuario Tech Pro Verificado</p>
                </div>
              </div>
            </div>

            {/* Right Detailed Comparison */}
            <div className="md:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-zinc-200/80 space-y-6 shadow-xs">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
                  La Realidad Anterior (El Freno)
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {activeAnecdote.story}
                </p>
              </div>

              <div className="border-t border-zinc-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-1.5">
                  La Transformación (Con Tech Pro) <span className="inline-block animate-pulse w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </p>
                <p className="text-sm text-zinc-800 font-medium leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 italic">
                  {activeAnecdote.outcome}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
