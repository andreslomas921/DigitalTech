import { useState } from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: '¿Para qué tipo de uso están pensadas estas laptops?',
      answer: 'Están diseñadas para cubrir las necesidades del día a día de manera eficiente y confiable. Son ideales para estudiantes que necesitan trabajar con documentos, presentaciones, hojas de cálculo y plataformas educativas en línea; para profesionales que manejan correo, videollamadas, reportes y software de gestión; y para emprendedores que administran su negocio digital. No están orientadas al gaming de alto rendimiento o a la edición de video profesional de proyectos muy pesados, pero para todo lo demás funcionan de forma sobresaliente.',
    },
    {
      question: '¿Necesito tener conocimientos técnicos para configurarla y usarla?',
      answer: 'Para nada. El equipo llega listo para usar desde el momento en que lo enciendes. El sistema operativo ya está instalado y configurado. Si tienes experiencia básica usando una computadora —abrir programas, navegar por internet, usar documentos— eso es todo lo que necesitas. Y si surge alguna duda puntual, nuestro equipo de soporte está disponible para ayudarte.',
    },
    {
      question: '¿Cómo funciona exactamente la garantía de 6 meses?',
      answer: 'La garantía cubre defectos de fabricación y fallas técnicas del equipo durante 6 meses a partir de la fecha de compra. Si tu laptop presenta un problema que no fue causado por daño físico o mal uso, nos comunicamos contigo para resolver la situación. Creemos en hacer este proceso lo más simple y rápido posible porque entendemos que necesitas tu equipo funcionando, no en trámites.',
    },
    {
      question: '¿Puedo hacer pagos en mensualidades?',
      answer: 'Dependiendo del método de pago que elijas y las opciones disponibles en tu región, puede haber alternativas de pago diferido. Te recomendamos consultar con nuestro equipo de ventas al momento de hacer tu pedido para revisar qué opciones están disponibles para ti. Queremos que el precio no sea un obstáculo para que tengas el equipo que necesitas.',
    },
    {
      question: '¿Cuánto tiempo tarda en llegar el pedido?',
      answer: 'El tiempo de entrega varía según tu ubicación. En zonas urbanas principales, los tiempos suelen ser de 2 a 5 días hábiles. En zonas más alejadas puede tomar algunos días adicionales. Al confirmar tu pedido, recibirás información de seguimiento para que sepas exactamente en qué etapa está tu envío.',
    },
    {
      question: '¿Qué pasa si el equipo llega con algún daño físico del transporte?',
      answer: 'Si al abrir el paquete notas algún daño físico que se haya producido durante el envío, comunícate con nosotros de inmediato —idealmente con fotos del empaque y del equipo— y gestionamos el reemplazo o la solución correspondiente. Empacamos los equipos con cuidado precisamente para evitar este tipo de situaciones, pero si ocurre, tienes nuestro respaldo.',
    },
    {
      question: '¿Viene con software incluido o tengo que comprarlo por separado?',
      answer: 'El equipo incluye el sistema operativo ya instalado y listo para usar. Para programas adicionales como suites de oficina, editores de imagen u otros, dependerá del modelo específico que elijas. Nuestro equipo puede orientarte sobre qué opciones gratuitas y de calidad están disponibles para complementar tu laptop sin costos adicionales.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white border rounded-2xl overflow-hidden transition-all duration-200"
            style={{
              borderColor: isOpen ? 'rgb(16, 185, 129)' : 'rgba(228, 228, 231, 0.7)',
              boxShadow: isOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.03)' : 'none',
            }}
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between text-left p-5 md:p-6 transition-all font-sans cursor-pointer group"
            >
              <div className="flex items-start gap-3.5 pr-4">
                <HelpCircle
                  className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${
                    isOpen ? 'text-emerald-500' : 'text-zinc-400 group-hover:text-zinc-650'
                  }`}
                />
                <span className="font-bold text-sm md:text-base text-zinc-900 tracking-tight">
                  {faq.question}
                </span>
              </div>
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-500 transition-all ${
                  isOpen ? 'rotate-90 bg-emerald-500/10 border-emerald-500/30 text-emerald-600' : ''
                }`}
              >
                <ChevronRight className="w-4 h-4 text-inherit" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-5 md:p-6 pt-0 border-t border-zinc-100 bg-zinc-50/50">
                    <p className="text-zinc-600 text-sm md:text-sm leading-relaxed whitespace-pre-line font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
