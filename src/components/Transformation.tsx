import { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, CornerRightDown, Smile, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function Transformation() {
  const [activeView, setActiveView] = useState<'before' | 'after'>('after');

  const beforePoints = [
    'Llegas tarde a tus entregas de proyectos porque el equipo tardó una eternidad en cargar o guardar.',
    'Dependes del equipo o cargador de otros, rindiéndote a sus horarios y perdiendo total privacidad.',
    'Rechazas o dejas pasar interesantes ofertas de trabajo remoto porque no posees una máquina confiable.',
    'Frustración y ansiedad en cada videollamada pensando: "por favor, que este café no se apague hoy".',
    'Gastas tiempo valioso y dinero en cibercafés o reparaciones improvisadas que no duran nada.'
  ];

  const afterPoints = [
    'Te despiertas, abres la tapa de tu laptop y en menos de 10 segundos estás trabajando o estudiando cómodamente.',
    'Cumples tus asignaciones con tiempo de sobra porque tu computadora responde ágilmente bajo tus reglas.',
    'Dices un SÍ rotundo a las mejores ofertas de teletrabajo o freelance sin miedos técnicos.',
    'Estudias los cursos que quieres, a tu ritmo, con la libertad de moverte donde te inspire trabajar.',
    'La inversión de $469 se recupera rápidamente en tiempo salvado, clientes ganados y paz mental silenciosa.'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Visual Toggles */}
      <div className="flex justify-center mb-8">
        <div className="bg-zinc-100 p-1.5 rounded-full inline-flex border border-zinc-200">
          <button
            onClick={() => setActiveView('before')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
              activeView === 'before'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            La vida ANTES (Con Frustración)
          </button>
          <button
            onClick={() => setActiveView('after')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
              activeView === 'after'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Smile className="w-4 h-4 shrink-0" />
            La vida DESPUÉS (Con Tech Pro)
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs">
        {activeView === 'before' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 md:p-10 bg-gradient-to-br from-red-50/30 to-zinc-50"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-red-100 text-red-600 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </span>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-zinc-950">
                  El obstáculo silencioso que te frena
                </h4>
                <p className="text-xs text-zinc-500 font-medium">
                  Rendimiento antiguo, lentitud crónica, dependencia de otros
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {beforePoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 bg-white p-4.5 rounded-2xl border border-red-100 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-zinc-900 text-white rounded-2xl p-5 md:p-6 text-center border border-zinc-850">
              <p className="text-xs font-semibold text-red-400 capitalize tracking-wider">
                El Verdadero Coste de Esperar
              </p>
              <h5 className="text-sm font-bold mt-1 text-zinc-300">
                &ldquo;La falta de una herramienta confiable no es un problema menor. Es un freno silencioso para tus metas.&rdquo;
              </h5>
              <button
                onClick={() => setActiveView('after')}
                className="mt-4 inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
              >
                Ver salida del túnel <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 md:p-10 bg-gradient-to-br from-emerald-50/20 to-zinc-55"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </span>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-zinc-950">
                  Desbloquea tu potencial definitivo
                </h4>
                <p className="text-xs text-zinc-500 font-medium">
                  Paz mental, velocidad garantizada, libertad absoluta
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {afterPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 bg-white p-4.5 rounded-2xl border border-emerald-100 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 animate-bounce">
                    ✓
                  </span>
                  <p className="text-sm text-zinc-800 leading-relaxed font-semibold">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-emerald-950 text-emerald-250 rounded-2xl p-5 md:p-6 text-center border border-emerald-900">
              <p className="text-xs font-bold text-emerald-400 tracking-wider">
                La Fórmula del Éxito
              </p>
              <h5 className="text-sm font-medium mt-1 text-zinc-200">
                &ldquo;La diferencia entre el estancamiento y el progreso no es tu esfuerzo; es la tecnología en tus manos.&rdquo;
              </h5>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
