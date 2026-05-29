import React, { useState, FormEvent } from 'react';
import { X, ShieldCheck, Truck, Clock, Sparkles, ChevronRight, Check, RotateCcw, Upload, Copy, Mail, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  productTitle?: string;
  productId?: string;
}

export default function CheckoutModal({ isOpen, onClose, price, productTitle = "Lenovo IdeaPad Slim 3 Ryzen 3", productId = "lenovo-ideapad" }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: Loading Flow, 3: Success Receipt
  const [selectedEdition, setSelectedEdition] = useState<'standard' | 'bundle'>('standard');
  const [form, setForm] = useState<OrderDetails>({
    name: '',
    email: '',
    phone: '',
    address: 'Calles Manabí y 12 de Febrero',
    city: 'Shushufindi, Ecuador',
    postalCode: '',
    paymentMethod: 'transfer', // Changed default method from 'card' to 'transfer'
  });

  const [loadingText, setLoadingText] = useState('Verificando información del stock...');
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isEthereal, setIsEthereal] = useState(false);
  const [etherealUrl, setEtherealUrl] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const getProductSpecsString = (title: string, edition: 'standard' | 'bundle') => {
    const norm = title.toLowerCase();
    let baseSpecs = "";
    if (norm.includes('lenovo') || norm.includes('slim 3') || norm.includes('ideapad')) {
      baseSpecs = "• CPU: AMD Ryzen 3 (Serie 7000)\n• RAM: 8GB LPDDR5 Ultra Veloz\n• Disco: 512GB SSD PCIe NVMe M.2\n• Pantalla: 15.6 pulgadas Full HD Antirreflejo\n• Extras: Cámara HD con obturador de privacidad";
    } else if (norm.includes('cpu') || norm.includes('compro') || norm.includes('computador')) {
      baseSpecs = "• CPU: Procesador Intel Core i5 / Ryzen 5\n• RAM: 16GB DDR4 Dual Channel\n• Disco: 512GB SSD de Estado Sólido\n• Chasis: Slim Office con enfriamiento silencioso";
    } else if (norm.includes('celular') || norm.includes('telefono') || norm.includes('iphone') || norm.includes('xiaomi')) {
      baseSpecs = "• Procesador: Octa-core de alta eficiencia\n• RAM/Almacenamiento: 6GB RAM + 128GB Memoria Interna Homologado\n• Cámara: Triple lente de alta resolución (50MP)";
    } else if (norm.includes('impresora') || norm.includes('epson') || norm.includes('hp')) {
      baseSpecs = "• Tipo: Impresora Multifuncional a Color con Wifi\n• Sistema: Inyección de tinta continua / Tóner de alto rendimiento\n• Funciones: Copia, escaneo y WiFi Direct integrado";
    } else if (norm.includes('tv') || norm.includes('televisor') || norm.includes('smart')) {
      baseSpecs = "• Pantalla: Smart TV 4K Ultra HD de alta gama\n• S.O.: Android TV integrado con Netflix/YouTube\n• Audio: Dolby Digital Plus envolvente";
    } else if (norm.includes('proyector')) {
      baseSpecs = "• Resolución: Full HD 1080p Nativo\n• Brillo: 4500 lúmenes ANSI con iluminación LED\n• Conexiones: HDMI, USB, Duplicado de pantalla iOS/Android";
    } else {
      baseSpecs = "• Especificaciones: Configuración premium garantizada\n• Estado: En caja de fábrica 100% sellado\n• Garantía: Respaldo total directo de 6 meses";
    }

    if (edition === 'bundle') {
      return `${baseSpecs}\n➕ COMBO TECH INCLUIDO:\n• Bolso protector premium de lona reforzada\n• Mouse ergonómico inalámbrico recargable\n• Soporte técnico extendido por 12 meses`;
    }
    return baseSpecs;
  };

  const getWhatsAppTransferLink = () => {
    const specsString = getProductSpecsString(productTitle, selectedEdition);
    const textPattern = `*NUEVA TRANSFERENCIA REALIZADA - DIGITAL TECH*

👤 *Cliente:* ${form.name}
📧 *Correo:* ${form.email}
📞 *Teléfono:* ${form.phone}
📍 *Provincia/Ciudad:* ${form.city}
🏡 *Dirección de Entrega:* ${form.address}
📬 *C.P:* ${form.postalCode || 'N/A'}

💻 *Equipo Adquirido:* ${productTitle}
🎯 *Opción:* ${selectedEdition === 'bundle' ? 'Edición con Combo Digital Tech' : 'Edición Estándar'}
💰 *Precio Final:* $${finalPrice} USD
🛡️ *Garantía:* 6 meses oficiales Digital Tech

⚙️ *Especificaciones Técnicas:*
${specsString}

🏦 *Forma de Pago:* Transferencia Bancaria
📌 *Beneficiario:* Sergio Andres Lomas
📸 *Adjunto:* [Comprobante de Pago subido: ${receiptImage?.name || 'imagen_comprobante'}]

*Estimado Sergio Andres Lomas, a continuación adjunto la captura de pantalla de mi transferencia bancaria para su validación.*`;

    return `https://api.whatsapp.com/send?phone=593984729888&text=${encodeURIComponent(textPattern)}`;
  };

  const getWhatsAppDeliveryLink = () => {
    const specsString = getProductSpecsString(productTitle, selectedEdition);
    const textPattern = `*SOLICITUD DE PEDIDO CONTRA ENTREGA - DIGITAL TECH*

👤 *Cliente:* ${form.name}
📧 *Correo:* ${form.email}
📞 *Teléfono:* ${form.phone}
📍 *Provincia/Ciudad:* ${form.city}
🏡 *Dirección de Entrega:* ${form.address}
📬 *C.P:* ${form.postalCode || 'N/A'}

💻 *Equipo Solicitado:* ${productTitle}
🎯 *Opción:* ${selectedEdition === 'bundle' ? 'Edición con Combo Digital Tech' : 'Edición Estándar'}
💰 *Precio Final a pagar en entrega:* $${finalPrice} USD
🛡️ *Garantía:* 6 meses oficiales Digital Tech

⚙️ *Especificaciones Técnicas:*
${specsString}

🚛 *Forma de Pago:* Contra Entrega (Pagas al repartidor en persona)

*Estimado Sergio Andres Lomas, acabo de finalizar mi pedido de Contra Entrega. Por favor, coordinemos el despacho de mi equipo a mi domicilio.*`;

    return `https://api.whatsapp.com/send?phone=593984729888&text=${encodeURIComponent(textPattern)}`;
  };

  const getMailtoLink = () => {
    const specsString = getProductSpecsString(productTitle, selectedEdition);
    const subject = `Nueva Compra - ${form.name} - ${productTitle}`;
    const body = `NOTIFICACIÓN DE VENTA - DIGITAL TECH

DATOS DEL CLIENTE / RECEPTOR:
Nombre Completo: ${form.name}
Correo Electrónico: ${form.email}
Teléfono: ${form.phone}
Ciudad: ${form.city}
Dirección: ${form.address}
Código Postal: ${form.postalCode || 'N/A'}

INFORMACIÓN DEL EQUIPO ADQUIRIDO:
Dispositivo: ${productTitle}
Combo Tech: ${selectedEdition === 'bundle' ? 'SÍ (Estuche, Bolso, Mouse + Soporte extendido)' : 'NO (Edición estándar)'}
Total Pagado: $${finalPrice} USD
Garantía: 6 Meses oficial Digital Tech

ESPECIFICACIONES DEL PRODUCTO:
${specsString}

INFORMACIÓN DE PAGO:
Forma de Pago: Transferencia Bancaria Directa
Titular de Cuenta: Sergio Andres Lomas
Comprobante de Captura adjunto en Cola: ${receiptImage?.name || 'comprobante_bancario'}

Por favor revise el comprobante y realice el despacho a la dirección especificada.`;

    return `mailto:andres.lomas921@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setReceiptImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setReceiptPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor selecciona un archivo de imagen (PNG, JPG, JPEG).');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setReceiptImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setReceiptPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor selecciona un archivo de imagen (PNG, JPG, JPEG).');
      }
    }
  };

  const handleResetCheckout = () => {
    setReceiptImage(null);
    setReceiptPreview(null);
    setStep(1);
    onClose();
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isLaptop = productId.toLowerCase().includes('lenovo') || productId.toLowerCase().includes('laptop');
  const bundleAddition = isLaptop ? 50 : 15;
  const finalPrice = selectedEdition === 'bundle' ? price + bundleAddition : price;
  const deliveryLower = new Date();
  deliveryLower.setDate(deliveryLower.getDate() + 2);
  const deliveryUpper = new Date();
  deliveryUpper.setDate(deliveryUpper.getDate() + 5);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      alert('Por favor completa todos los campos del envío de manera realista.');
      return;
    }

    if (form.paymentMethod === 'transfer' && !receiptImage) {
      alert('Por favor sube la foto de la transferencia bancaria realizada para proceder como control de equipos vendidos.');
      return;
    }

    setStep(2);
    setLoadingText('Sincronizando la base de datos de stock...');

    try {
      // 1. Convert image to base64 if it is transfer payment method
      let base64ImageObj = null;
      if (form.paymentMethod === 'transfer' && receiptImage) {
        setLoadingText('Procesando comprobante de pago electrónico para adjuntar...');
        const base64String = await getBase64(receiptImage);
        base64ImageObj = {
          name: receiptImage.name,
          base64: base64String
        };
      }

      // 2. Preparing and sending the server request
      setLoadingText('Despachando notificación automática de pedido al correo andres.lomas921@gmail.com...');
      const payload = {
        form,
        productTitle,
        finalPrice,
        selectedEdition,
        specsString: getProductSpecsString(productTitle, selectedEdition),
        receiptImage: base64ImageObj
      };

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error en el servidor al despachar correo electrónico automático.');
      }

      const resData = await response.json();
      if (resData.success) {
        setEmailSuccess(true);
        if (resData.isEthereal) {
          setIsEthereal(true);
          setEtherealUrl(resData.etherealUrl);
        }
      }

      setLoadingText('Generando enlaces de respaldo y redireccionamiento de stock...');
      setTimeout(() => {
        setStep(3);
        // Automatically open the WhatsApp message redirection
        if (form.paymentMethod === 'transfer') {
          window.open(getWhatsAppTransferLink(), '_blank');
        } else {
          window.open(getWhatsAppDeliveryLink(), '_blank');
        }
      }, 500);

    } catch (err: any) {
      console.error('SMTP Delivery error:', err);
      // Fallback gracefully so checkout doesn't lock up or crash
      setLoadingText('Sincronización manual de correo electrónico activada...');
      setTimeout(() => {
        setStep(3);
        // Still pop up WhatsApp so they don't lose their purchase flow!
        if (form.paymentMethod === 'transfer') {
          window.open(getWhatsAppTransferLink(), '_blank');
          // Trigger mailto as absolute legacy fallback
          window.location.href = getMailtoLink();
        } else {
          window.open(getWhatsAppDeliveryLink(), '_blank');
        }
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl text-zinc-100"
        id="checkoutModalBody"
      >
        {/* Header (Hidden in step 3 for aesthetics) */}
        {step !== 3 && (
          <div className="flex justify-between items-center bg-zinc-950 px-6 py-5 border-b border-zinc-805">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-zinc-100 uppercase tracking-wider">
                  Compra Garantizada Pro
                </h4>
                <p className="text-[10px] text-zinc-400">Canal Directo Encriptado SSL · Envío Inmediato</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="form-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* 1. Edition Selector */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                    Paso 1: Opción de tu Producto
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEdition('standard')}
                      className={`flex flex-col text-left p-4.5 rounded-2xl border transition-all ${
                        selectedEdition === 'standard'
                          ? 'bg-emerald-500/10 border-emerald-500 text-zinc-100'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full mb-1">
                        <span className="font-bold text-xs md:text-sm text-zinc-100">{productTitle}</span>
                        <span className="font-black text-emerald-400 font-sans">${price}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {isLaptop 
                          ? 'Incluye garantía oficial del fabricante, cargador original y envío seguro.' 
                          : 'Producto individual nuevo en caja sellada con envío seguro incluido.'}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedEdition('bundle')}
                      className={`flex flex-col text-left p-4.5 rounded-2xl border transition-all ${
                        selectedEdition === 'bundle'
                          ? 'bg-emerald-500/10 border-emerald-500 text-zinc-100'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full mb-1">
                        <span className="font-bold text-xs md:text-sm text-zinc-100 flex items-center gap-1.5 leading-tight">
                          Combo Digital Tech <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                        </span>
                        <span className="font-black text-emerald-400 font-sans">${price + bundleAddition}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {isLaptop 
                          ? 'Agrega bolso protector premium, mouse ergonómico inalámbrico y 1 año de soporte extendido.' 
                          : 'Combo especial: Agrega protector estuche y garantía premium contra todo riesgo por 12 meses.'}
                      </p>
                    </button>
                  </div>
                </div>

                {/* 2. Shipment Details */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest border-t border-zinc-800 pt-5">
                    Paso 2: Datos de Destinatario y Envío Doméstico
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">Nombre Completo</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Ej. Mariana González Rosas"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">Correo Electrónico</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="ejemplo@usuario.com"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">Dirección Completa de Envío</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        placeholder="Ej. Calles Manabí y 12 de Febrero"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5 font-sans">Teléfono de Contacto</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Ej. 55 1234 5678"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">Ciudad o Estado</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        placeholder="Ej. Shushufindi, Ecuador"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5">Código Postal (CP)</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleInputChange}
                        placeholder="Ej. 06700"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Secure Payments */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest border-t border-zinc-800 pt-5">
                    Paso 3: Método de Pago Seguro
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'transfer', label: '🏦 Transferencia Bancaria' },
                      { id: 'delivery', label: '📦 Pago Contra Entrega' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, paymentMethod: opt.id as any }))}
                        className={`py-3.5 px-2 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          form.paymentMethod === opt.id
                            ? 'bg-emerald-500 text-black border-emerald-500 font-extrabold shadow-md'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {form.paymentMethod === 'transfer' && (
                    <div className="bg-zinc-950 border border-zinc-850 p-5 rounded-2xl space-y-5 font-sans text-zinc-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                        <span className="p-1 px-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase text-center shrink-0">
                          CUENTAS DE DEPÓSITO
                        </span>
                        <p className="text-[11px] text-zinc-400 text-right">Haz tu transferencia y copia los datos con un clic:</p>
                      </div>

                      {/* Bank Accounts Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {/* Banco Guayaquil */}
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 py-1 px-2 rounded-full uppercase tracking-wider">
                              Banco Guayaquil
                            </span>
                            <div className="mt-3.5 space-y-1">
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Número de Cuenta</p>
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-mono text-white text-xs font-bold tracking-wider">0058117395</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText('0058117395', 'Guayaquil')}
                                  className="text-[9px] text-blue-400 hover:text-blue-300 bg-zinc-950 py-1 px-2 rounded-lg border border-zinc-800 cursor-pointer shrink-0"
                                >
                                  {copiedText === 'Guayaquil' ? '✓ Copiado' : '📋 Copiar'}
                                </button>
                              </div>
                              <p className="text-[9px] text-zinc-500">Tipo: Ahorros</p>
                            </div>
                          </div>
                        </div>

                        {/* Banco Internacional */}
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 py-1 px-2 rounded-full uppercase tracking-wider">
                              Banco Internacional
                            </span>
                            <div className="mt-3.5 space-y-1">
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Número de Cuenta</p>
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-mono text-white text-xs font-bold tracking-wider">118052815</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText('118052815', 'Internacional')}
                                  className="text-[9px] text-blue-400 hover:text-blue-300 bg-zinc-950 py-1 px-2 rounded-lg border border-zinc-800 cursor-pointer shrink-0"
                                >
                                  {copiedText === 'Internacional' ? '✓ Copiado' : '📋 Copiar'}
                                </button>
                              </div>
                              <p className="text-[9px] text-zinc-500">Tipo: Ahorros</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Personal Accounts details */}
                      <div className="bg-zinc-900/40 p-4 rounded-xl text-xs leading-relaxed text-zinc-400 space-y-1.5 border border-zinc-850">
                        <p className="font-black text-zinc-300 uppercase tracking-widest text-[9px] border-b border-zinc-800 pb-1 mb-1.5">Datos del Beneficiario</p>
                        <p>👤 <strong className="text-zinc-200">Nombre:</strong> Sergio Andres Lomas</p>
                        <p>📧 <strong className="text-zinc-200">Correo:</strong> andres.lomas921@gmail.com</p>
                        <p>📞 <strong className="text-zinc-200">Teléfono:</strong> +593 984729888</p>
                      </div>

                      {/* File Upload Zone */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-black uppercase text-zinc-400 tracking-wider">
                          📸 Sube tu Captura o Foto del Comprobante (Requerido)
                        </label>
                        
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                            isDragOver 
                              ? 'border-blue-500 bg-blue-500/10' 
                              : receiptPreview 
                              ? 'border-emerald-500/50 bg-emerald-500/5' 
                              : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                          }`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="receiptFileInput"
                          />
                          
                          <div className="cursor-pointer space-y-3.5">
                            {receiptPreview ? (
                              <div className="flex flex-col items-center gap-2">
                                <div className="relative w-20 h-20 border border-emerald-500/20 rounded-xl overflow-hidden shadow-md">
                                  <img src={receiptPreview} alt="Comprobante Subido" className="object-cover w-full h-full" />
                                </div>
                                <div className="text-center">
                                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-center">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" /> ¡Comprobante Listo para Enviar!
                                  </p>
                                  <p className="text-[10px] text-zinc-500 font-mono mt-1 w-52 truncate mx-auto">{receiptImage?.name}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setReceiptImage(null);
                                    setReceiptPreview(null);
                                  }}
                                  className="text-[10px] text-rose-500 hover:text-rose-450 uppercase font-black tracking-widest cursor-pointer mt-1"
                                >
                                  Quitar Imagen / Cambiar
                                </button>
                              </div>
                            ) : (
                              <label htmlFor="receiptFileInput" className="cursor-pointer block space-y-2 py-1">
                                <div className="text-zinc-500 text-2xl flex justify-center"><Upload className="w-6 h-6 text-zinc-500" /></div>
                                <p className="text-xs font-extrabold text-zinc-300">
                                  Arrastra aquí tu comprobante o <span className="text-blue-400 underline">haz clic para explorar</span>
                                </p>
                                <p className="text-[10px] text-zinc-500">Soporta PNG, JPG o JPEG de tu transferencia realizada</p>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {form.paymentMethod === 'delivery' && (
                    <div className="bg-zinc-950 border border-zinc-850 p-5 rounded-2xl text-xs space-y-3 text-zinc-400 leading-relaxed font-sans">
                      <p className="font-bold text-zinc-200 text-sm flex items-center gap-1.5 font-sans">📦 Pago Contra Entrega Seguro</p>
                      <p>¡No pagues nada por adelantado! Paga el valor de tu compra en efectivo al repartidor oficial cuando toque a tu puerta y te entregue el equipo de forma segura.</p>
                      <p className="text-[11px] text-emerald-400 font-extrabold font-sans">Garantía de cero riesgos con soporte postventa asegurado.</p>
                      <p className="bg-zinc-905 border border-zinc-800 p-3.5 rounded-xl text-zinc-300 text-[11px] leading-relaxed font-sans mt-2">
                        💡 Al finalizar, se abrirá un chat de WhatsApp con Sergio Andrés Lomas (<strong>+593 984729888</strong>) para acordar el horario exacto del envío y confirmar tu dirección.
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Cost & Submit Button & Reset Button */}
                <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Total a Pagar hoy:</p>
                    <p className="text-3xl font-black text-emerald-400 leading-none mt-1">
                      ${finalPrice} USD
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-1">Envío seguro prioritario · 6 meses de garantía completa</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                    {/* Reset Button (Reinicio de compra) */}
                    <button
                      type="button"
                      onClick={handleResetCheckout}
                      className="grow sm:grow-0 font-bold px-4 py-3 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors cursor-pointer"
                      title="Regresar al catálogo y cambiar de equipo"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Regresar (Cambiar Equipo)
                    </button>

                    <button
                      type="submit"
                      className="grow sm:grow-0 font-black px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-black rounded-xl flex items-center justify-center gap-2 text-xs shadow-xl shadow-emerald-500/10 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      🔒 FINALIZAR PEDIDO SEGURO <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div
                key="loading-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="py-16 text-center space-y-6"
              >
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h4 className="text-lg font-bold text-zinc-100">{loadingText}</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto font-sans">Por favor no cierres esta ventana. Se está estableciendo el canal seguro de compraventa directa.</p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 space-y-6"
              >
                {/* Visual Circle Receipt Header */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-emerald-500/20">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-xl font-extrabold text-emerald-400">¡Pedido Enviado con Éxito!</h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Se registró tu orden de {form.paymentMethod === 'transfer' ? 'Transferencia' : 'Contra Entrega'} en el sistema de stock de <strong>Digital Tech</strong>.
                  </p>
                </div>

                {/* Secure Receipt Box */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden font-sans">
                  <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Código de Registro</p>
                      <p className="text-xs font-mono font-bold text-zinc-200">#DT-{(100000 + Math.random() * 900000).toFixed(0)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Vendedor Autorizado</p>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold">
                        Sergio Andres Lomas
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 text-xs">
                    {/* Item and Price */}
                    <div className="flex justify-between border-b border-zinc-900 pb-3">
                      <div>
                        <p className="font-bold text-zinc-200 text-sm">
                          {productTitle} {selectedEdition === 'bundle' ? ' - Con Combo Digital Tech' : ' - Edición Estándar'}
                        </p>
                        <p className="text-zinc-500 text-[10px] mt-0.5">Garantía oficial y soporte técnico prioritario activados</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-emerald-400">${finalPrice} USD</p>
                        <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-bold text-emerald-400">Envío Seguro</p>
                      </div>
                    </div>

                    {/* Shipping Address confirmation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-zinc-900 pb-3 leading-normal">
                      <div>
                        <p className="font-bold text-zinc-400 mb-1 uppercase tracking-wider text-[9px]">Datos de Envío:</p>
                        <p className="text-zinc-200 font-semibold">{form.name}</p>
                        <p className="text-zinc-400">Tel: {form.phone}</p>
                        <p className="text-zinc-400">{form.address}</p>
                        <p className="text-zinc-400">{form.city}, CP {form.postalCode || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-bold text-zinc-400 mb-1 uppercase tracking-wider text-[9px]">Método &amp; Despacho:</p>
                        <p className="text-emerald-400 font-extrabold flex items-center gap-1.5 leading-none">
                          <Truck className="w-4 h-4 inline" /> {form.paymentMethod === 'transfer' ? 'Transferencia Bancaria' : 'Contra Entrega Física'}
                        </p>
                        <p className="text-zinc-500 mt-2">
                          Se redireccionó automáticamente el pedido a Sergio Andrés Lomas. Si por alguna razón la ventana no cargó, puedes usar los controles de abajo.
                        </p>
                      </div>
                    </div>

                    {/* How to pay instructions for transfer if needed */}
                    {form.paymentMethod === 'transfer' && (
                      <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl space-y-3 font-sans">
                        <div className="space-y-1">
                          <p className="font-extrabold text-emerald-400 text-xs text-left">📧 Notificación de Venta Registrada</p>
                          <p className="text-zinc-300 text-[11px] leading-relaxed text-left">
                            Se ha generado la notificación electrónica inmediata de compra a tu correo electrónico de control: <strong className="text-white font-semibold">andres.lomas921@gmail.com</strong> conteniendo los datos de la transferencia e imagen del comprobante para mayor control.
                          </p>
                        </div>

                        {emailSuccess && etherealUrl && (
                          <div className="bg-amber-500/10 border border-amber-500/25 p-3.5 rounded-xl space-y-2 text-left">
                            <p className="font-bold text-amber-400 text-[10px] uppercase tracking-wider">🔬 BANDEJA DE PRUEBA ACTIVA (ETHEREAL MAIL):</p>
                            <p className="text-zinc-300 text-[11px] leading-normal">
                              Hemos enviado este correo con el comprobante adjunto a través de un servicio virtual. Haz clic abajo para verificar el diseño, datos y la imagen adjunta en tiempo real:
                            </p>
                            <a
                              href={etherealUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-md transition-colors font-sans mt-1"
                            >
                              👁️ VER CORREO ENVIADO CON COMPROBANTE
                            </a>
                          </div>
                        )}

                        {emailSuccess && !etherealUrl && (
                          <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-lg text-left">
                            <p className="text-emerald-400 font-bold text-[11px]">📨 Solicitud automatizada despachada con éxito al correo del administrador.</p>
                          </div>
                        )}

                        {receiptPreview && (
                          <div className="flex items-center gap-3 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded overflow-hidden shrink-0">
                              <img src={receiptPreview} alt="Transfer Thumbnail" className="object-cover w-full h-full" />
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-[10px] text-zinc-500 font-bold uppercase">Tu Comprobante Subido</p>
                              <p className="text-[11px] text-emerald-400 truncate font-mono font-medium">{receiptImage?.name}</p>
                            </div>
                          </div>
                        )}

                        <div className="pt-1.5 space-y-2 text-left">
                          <p className="text-zinc-400 text-[10px] uppercase font-black">Acciones de Respaldo Directas:</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {/* WhatsApp button */}
                            <a
                              href={getWhatsAppTransferLink()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-3 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md font-sans"
                            >
                              <MessageSquare className="w-4 h-4 shrink-0" />
                              Enviar Comprobante al WhatsApp
                            </a>

                            {/* Mail Client button */}
                            <a
                              href={getMailtoLink()}
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs py-2.5 px-2.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-zinc-700"
                            >
                              <Mail className="w-4 h-4 shrink-0" />
                              Notificar Venta Manualmente
                            </a>
                          </div>
                          
                          <p className="text-[10px] text-zinc-500 text-center italic mt-1.5 font-sans">
                            📌 Al abrirse WhatsApp, recuerda incluir la captura de tu transferencia en el mensaje para mayor respaldo.
                          </p>
                        </div>
                      </div>
                    )}

                    {form.paymentMethod === 'delivery' && (
                      <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl space-y-3 font-sans text-left">
                        <p className="font-bold text-blue-400 text-xs text-left">🚛 Despacho Contra Entrega Registrado</p>
                        <p className="text-zinc-300 leading-relaxed text-[11px] text-left">
                          Tu pedido ha sido registrado como contra entrega para la ciudad descrita. Hemos despachado una notificación formal automática con todos los detalles del domicilio al correo de control: <strong className="text-white">andres.lomas921@gmail.com</strong>.
                        </p>

                        {emailSuccess && etherealUrl && (
                          <div className="bg-amber-500/10 border border-amber-500/25 p-3.5 rounded-xl space-y-2 text-left mt-2 col-span-2">
                            <p className="font-bold text-amber-400 text-[10px] uppercase tracking-wider">🔬 BANDEJA DE PRUEBA ACTIVA (ETHEREAL MAIL):</p>
                            <p className="text-zinc-300 text-[11px] leading-normal">
                              El correo de Contra Entrega con los datos detallados de tu domicilio ha sido enviado en pruebas. Puedes comprobarlo haciendo clic abajo:
                            </p>
                            <a
                              href={etherealUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-md transition-colors font-sans mt-1"
                            >
                              👁️ VER CORREO ENVIADO DE CONTRA ENTREGA
                            </a>
                          </div>
                        )}

                        {emailSuccess && !etherealUrl && (
                          <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-lg text-left mt-2">
                            <p className="text-emerald-400 font-bold text-[11px]">📨 Notificación enviada con éxito al correo del administrador.</p>
                          </div>
                        )}
                        
                        <a
                          href={getWhatsAppDeliveryLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-3.5 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 mt-2 font-sans"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Coordinar Despacho en WhatsApp (+593 984729888)
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-2 justify-center text-zinc-500 text-[10px] uppercase font-bold tracking-widest pt-1 border-t border-zinc-900 mt-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      Digital Tech Ecuador · Control Interno de Equipos Vendidos
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetCheckout}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-zinc-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Hacer Nueva Compra (Reiniciar)
                  </button>

                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-zinc-900 hover:bg-zinc-950 text-zinc-400 hover:text-zinc-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Cerrar Boleta de Orden
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
