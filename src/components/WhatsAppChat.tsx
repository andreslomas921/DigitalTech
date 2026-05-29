import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ShieldAlert, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: '¡Hola! Bienvenido a Digital Tech. 👋 Soy Alejandro. ¿Tienes dudas sobre la Lenovo IdeaPad Slim 3, nuestras promociones vigentes o la ubicación de nuestra tienda física en Shushufindi? Haz clic abajo para escribirme directo a mi WhatsApp personal en un toque.',
      time: 'Justo ahora',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const officialPhone = '593984729888';
  const whatsappUrlBase = `https://wa.me/${officialPhone}`;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const presetQuestions = [
    { 
      q: '💻 Consultar por Lenovo IdeaPad Slim 3', 
      text: 'Hola Digital Tech, estoy interesado en la Lenovo IdeaPad Slim 3 Ryzen 3 Serie 7000 de $469. ¿Tienen stock disponible?',
      a: '¡Excelente elección! La Lenovo Slim 3 Ryzen 3 Serie 7000 es nuestro equipo estrella en Shushufindi. Si gustas, escríbenos directamente para apartar la tuya antes de que se agote.' 
    },
    { 
      q: '🎁 Ver promociones / combos vigentes', 
      text: 'Hola Digital Tech, quiero saber sobre las promociones y combos de productos que tienen con descuento.',
      a: '¡Claro! Tenemos combos increíbles como el Combo Oficina con la Lenovo Slim 3 y accesorios por solo $499. Escríbenos en WhatsApp y te enviamos fotos del catálogo.' 
    },
    { 
      q: '📍 Dirección de la tienda física', 
      text: 'Hola Digital Tech, me gustaría conocer la dirección exacta de su tienda física para ir a visitarlos.',
      a: 'Estamos ubicados en Calles Manabí y 12 de Febrero, Shushufindi, Ecuador. ¡Te esperamos!' 
    },
  ];

  const handleSendOption = (question: string, defaultText: string, answer: string) => {
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: question,
      time: 'Justo ahora',
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'agent',
        text: `${answer} Puedes escribirnos en un solo click tocando el botón verde de abajo para coordinar en tiempo real por WhatsApp.`,
        time: 'Justo ahora',
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 900);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputText,
      time: 'Justo ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    const userText = inputText;
    setInputText('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      let response = '¡Recibido! Para darte una respuesta inmediata y cotizar el envío directo, chatea en vivo con nosotros tocando el enlace directo de WhatsApp abajo.';
      const lower = userText.toLowerCase();
      if (lower.includes('garantía') || lower.includes('garantia') || lower.includes('respaldo')) {
        response = 'La Lenovo IdeaPad Slim 3 tiene garantía oficial. Escríbenos directo en WhatsApp para enviarte los detalles y políticas de garantía.';
      } else if (lower.includes('precio') || lower.includes('cuanto') || lower.includes('costo') || lower.includes('vale')) {
        response = 'El precio oficial de la Lenovo Slim 3 Ryzen 3 Serie 7000 es de $469. También contamos con combos desde $499. Chatea por WhatsApp para apartar.';
      } else if (lower.includes('envio') || lower.includes('envío') || lower.includes('entrega') || lower.includes('tarda')) {
        response = 'Realizamos envíos 100% seguros a todo el país y pago contra entrega en Shushufindi. ¿A qué ciudad necesitas el envío? Cuéntanos por WhatsApp.';
      }

      const agentMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'agent',
        text: response,
        time: 'Justo ahora',
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 1100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.92 }}
            className="bg-zinc-900 w-[340px] md:w-[370px] h-[510px] rounded-3xl border border-zinc-800 bg-zinc-950 flex flex-col overflow-hidden shadow-2xl mb-4"
          >
            {/* Window header */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400">
                    DT
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-zinc-950 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-zinc-100 flex items-center gap-1">
                    Alejandro · Digital Tech Ecuador
                  </h5>
                  <p className="text-[10px] text-zinc-400">Respuesta celular inmediata</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className="bg-emerald-500/10 px-4 py-3 flex flex-col gap-1 border-b border-zinc-900 text-center">
              <p className="text-[11px] text-zinc-200">¿Prefieres escribir directamente a nuestro número?</p>
              <a
                href="https://wa.me/593984729888?text=Hola%20Digital%20Tech%2C%20les%20escribo%20desde%20la%20tienda%20web%20para%20más%20información."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider font-sans"
              >
                💬 CHATEAR DIRECTO (+593 984729888)
              </a>
            </div>

            {/* Quick action banners */}
            <div className="bg-zinc-900/50 border-b border-zinc-900 px-4 py-2 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-3 h-3" /> Tienda Física · Shushufindi
              </span>
              <span>Lote Limitado de Equipos</span>
            </div>

            {/* Messages box */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-emerald-500 text-black font-medium rounded-tr-none'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-[9px] mt-1 text-right ${isUser ? 'text-black/60' : 'text-zinc-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-2 rounded-2xl rounded-tl-none text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preset Help Chips */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-zinc-950 flex flex-wrap gap-1.5 border-t border-zinc-900">
                {presetQuestions.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendOption(chip.q, chip.text, chip.a)}
                    className="text-[10px] font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-2.5 py-1.5 rounded-full transition-all cursor-pointer text-left"
                  >
                    {chip.q}
                  </button>
                ))}
              </div>
            )}

            {/* Message input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-zinc-800 bg-zinc-950 flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu duda aquí..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className="relative bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black p-4 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer group"
        id="widgetWhatsappTrigger"
        aria-label="Asistencia Express"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />

        {showNotification && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-black text-white items-center justify-center">
              1
            </span>
          </span>
        )}
      </button>
    </div>
  );
}
