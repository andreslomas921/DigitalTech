import { useState } from 'react';
import { Cpu, Zap, HardDrive, Tv, Battery, Keyboard, Share2, Compass, CpuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SpecsHotspots() {
  const [activeCategory, setActiveCategory] = useState('power');

  const categories = [
    {
      id: 'power',
      label: 'Rendimiento y Memoria',
      icon: Cpu,
      specs: [
        {
          name: 'Procesador Intel/AMD de alta velocidad',
          desc: 'Diseñado por expertos para manejar múltiples aplicaciones simultáneamente sin que el equipo se detenga. Abre 15 pestañas del navegador, escribe tus reportes y reproduce música en Spotify —todo al mismo tiempo y sin drama.',
          highlight: 'Excelente velocidad multitarea',
          badge: 'Fluido'
        },
        {
          name: 'Memoria RAM de grado profesional',
          desc: 'Permite que el trabajo fluya con velocidad en el día a día. Hojas de cálculo pesadas, correos y plataformas virtuales de estudio corren en paralelo respondiendo en tiempo real sin congelarse.',
          highlight: 'Ideal para freelancers y estudiantes',
          badge: 'Estable'
        },
        {
          name: 'Almacenamiento de Estado Sólido (SSD)',
          desc: 'Inicia el sistema operativo en menos de 10 segundos. Suficiente espacio para guardar proyectos masivos, fotos personales, documentos de estudio y programas sin preocuparte por espacio ni comprar discos externos.',
          highlight: 'Ultra rápido comparado al HDD antiguo',
          badge: 'Amplio'
        }
      ]
    },
    {
      id: 'av',
      label: 'Pantalla y Autonomía',
      icon: Tv,
      specs: [
        {
          name: 'Pantalla con Definición IPS de Alta Resolución',
          desc: 'Pensada específicamente para largas jornadas de estudio o trabajo nocturno. Ángulos de visión ultra confortables que eliminan la fatiga visual, ideal para lectura corrida y contenido multimedia de alta fidelidad.',
          highlight: 'Anti-fatiga visual certificada',
          badge: 'Descanso'
        },
        {
          name: 'Batería Ultra-Duradera de Autonomía Real',
          desc: 'La verdadera libertad de moverte sin cables. Elige trabajar desde tu cama, la biblioteca o la mesa de un café sin estar persiguiendo frenéticamente un enchufe o preocupándote por el porcentaje restante.',
          highlight: 'Optimización de consumo energético integrado',
          badge: 'Sin Cables'
        }
      ]
    },
    {
      id: 'design',
      label: 'Diseño, Conexión y OS',
      icon: Keyboard,
      specs: [
        {
          name: 'Teclado Cómodo y Ergonómico',
          desc: 'Suave al tacto y optimizado para una escritura larga y fluida. Olvídate del dolor en los dedos o las muñecas después de escribir ensayos o responder mensajes por horas.',
          highlight: 'Teclas con tacto suave',
          badge: 'Confort'
        },
        {
          name: 'Conectividad Completa de Alta Velocidad',
          desc: 'Equipada con múltiples puertos USB, toma de audífonos, salida HDMI para proyector, lector de tarjetas y Wi-Fi de alta gama para videollamadas claras y estables.',
          highlight: 'Sin cables ni adaptadores adicionales',
          badge: 'Completo'
        },
        {
          name: 'Sistema Operativo Listo para Usar',
          desc: 'Llega configurado y preinstalado directo de fábrica. Se enciende por primera vez y ya puedes trabajar. Libre de manuales misteriosos, tecnicismos pesados y sorpresas desagradables.',
          highlight: 'Plug and Play: Listo al abrir la caja',
          badge: 'Listo'
        }
      ]
    }
  ];

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div className="bg-zinc-950 text-white rounded-3xl p-6 md:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="max-w-2xl text-center md:text-left mb-10">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase block mb-2">
            INGENIERÍA PENSADA PARA EL DÍA A DÍA
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            Fierro de Alto Nivel sin Costos Artificiales
          </h3>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Eliminamos las comisiones de intermediarios y el marketing costoso para colocarte un hardware robusto de $469 que de verdad solucione tus tareas cotidianas.
          </p>
        </div>

        {/* Sidebar/Top Bar Selectors */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-4">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                }`}
              >
                <CatIcon className="w-4 h-4 shrink-0" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic spec cards list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentCategory.specs.map((spec, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700/60 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-0.5 bg-zinc-800 text-emerald-400 border border-zinc-750 rounded-full text-[10px] font-bold tracking-wider uppercase">
                      {spec.badge}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  </div>

                  <h4 className="text-base font-bold text-zinc-100 leading-snug mb-2.5">
                    {spec.name}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                    {spec.desc}
                  </p>
                </div>

                <div className="border-t border-zinc-800 pt-4 mt-auto">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Lo que ganas:
                  </p>
                  <p className="text-xs font-bold text-emerald-400 mt-1">
                    {spec.highlight}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
