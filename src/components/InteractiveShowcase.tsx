import React, { useState } from 'react';
import { 
  Laptop, 
  Tablet, 
  Monitor, 
  Headphones, 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  Gift, 
  ExternalLink,
  Check,
  ShoppingBag,
  Tag,
  Map,
  BadgeAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Promotion } from '../types';

interface InteractiveShowcaseProps {
  onOpenCheckout: (price: number, productTitle: string, productId: string) => void;
  stock: number;
  activeTab?: 'productos' | 'promociones' | 'ubicacion';
  setActiveTab?: (tab: 'productos' | 'promociones' | 'ubicacion') => void;
}

export default function InteractiveShowcase({ 
  onOpenCheckout, 
  stock,
  activeTab: propActiveTab,
  setActiveTab: propSetActiveTab
}: InteractiveShowcaseProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<'productos' | 'promociones' | 'ubicacion'>('productos');
  const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab;
  const setActiveTab = propSetActiveTab !== undefined ? propSetActiveTab : setInternalActiveTab;

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Hardcode product data following Ecuador context & requested Lenovo Laptop
  const productsList: Product[] = [
    {
      id: 'lenovo-slim3',
      name: 'Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000',
      tagline: 'La laptop preferida para estudiantes y profesionales en Ecuador',
      description: 'Equipada con procesador AMD Ryzen 3 Serie 7000 de última generación, almacenamiento ultra veloz PCIe NVMe y una pantalla ultra nítida de 15.6" con marcos delgados. Ideal para trabajar sin pausas, redactar tesis, estudiar en línea y gestionar tus cuentas diarias.',
      price: 469,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Procesador AMD Ryzen 3 7320U turbo clock',
        '8GB RAM LPDDR5 de alta frecuencia',
        'Almacenamiento 512GB SSD PCIe NVMe M.2',
        'Pantalla 15.6" Full HD antirreflejo eye-care',
        'Diseño ultra delgado con chasis de alta duración',
        'Teclado en español con teclado numérico dedicado',
        'Cámara HD con obturador de privacidad física'
      ],
      category: 'laptops',
      stock: stock,
      featured: true
    },
    {
      id: 'lenovo-tab-p11',
      name: 'Tablet Lenovo Tab P11 Gen 2',
      tagline: 'Máxima productividad con lápiz óptico incluido',
      description: 'Increíble pantalla 2K de 11.5" a 120Hz fluida para apuntes, lecturas y diseño digital. El mejor compendio multimedia y educativo del mercado actual.',
      price: 229,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Pantalla IPS 11.5 pulgadas Resolución 2K (120Hz)',
        'Procesador Octa-Core Helio G99 potente',
        '4GB RAM + 128GB Almacenamiento expandible',
        'Incluye Lenovo Precision Pen 2 original',
        'Batería gigante de 7700 mAh con carga rápida'
      ],
      category: 'tablets',
      stock: 12
    },
    {
      id: 'monitor-lg-ultragear',
      name: 'Monitor Gamer LG UltraGear 24" Fast IPS',
      tagline: 'Fluidez extrema para tus horas de ocio y trabajo',
      description: 'Optimiza tu productividad con una tasa de refresco ultra rápida de 144Hz. Colores perfectos con tecnología IPS para diseño y visualización excelente.',
      price: 159,
      originalPrice: 229,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Tamaño de 24 pulgadas Panel Fast IPS FHD',
        'Tasa de refresco de 144Hz y 1ms de respuesta',
        'Compatible con AMD FreeSync & G-Sync',
        'Base ergonómica con ajuste de inclinación profesional'
      ],
      category: 'pantallas',
      stock: 5
    },
    {
      id: 'jbl-520bt',
      name: 'Audífonos JBL Tune 520BT Wireless',
      tagline: 'Batería legendaria y sonido Pure Bass de JBL',
      description: 'Siente la libertad del audio de alta definición sin enredos. Livianos y plegables, listos para tu trayecto a la oficina o campus.',
      price: 49,
      originalPrice: 79,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Hasta 57 horas de batería continuas',
        'Tecnología de sonido JBL Pure Bass certificada',
        'Conexión multipunto Bluetooth 5.3 estable',
        'Micrófono integrado para llamadas y clases en vivo'
      ],
      category: 'audio',
      stock: 15
    }
  ];

  // Hardcode promotional package listings for Ecuador combos
  const promotionsList: Promotion[] = [
    {
      id: 'promo-oficina-pro',
      title: 'Combo Oficina Premium Súper Equipado',
      discountTag: '🔥 AHORRA $380',
      description: 'Llévate la potente Lenovo IdeaPad Slim 3 Ryzen 3 y equípate al completo para elevar tus tareas o trabajo independiente.',
      bundleProducts: [
        'Laptop Lenovo IdeaPad Slim 3 ($469 valor)',
        'Mochila Ejecutiva Impermeable ($35 valor)',
        'Mouse Óptico Inalámbrico ergonómico ($15 valor)',
        'Soporte de Laptop Regulable de aleación de aluminio ($20 valor)',
        'Soporte Técnico VIP extendido de 1 año'
      ],
      comboPrice: 499,
      originalComboPrice: 879,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'promo-estudiante',
      title: 'Combo Combo Estudiante Conectado',
      discountTag: '⚡ AHORRA $150',
      description: 'El pack definitivo para estudiar en la biblioteca, cafeterías o desde la cama con alta comodidad técnica y conectividad total.',
      bundleProducts: [
        'Tablet Lenovo Tab P11 Gen 2 + Lápiz ($229 valor)',
        'Audífonos JBL Tune 520BT Wireless ($49 valor)',
        'Estuche con Teclado Integrado Bluetooth ($40 valor)',
        'Garantía de Pantalla contra caídas'
      ],
      comboPrice: 269,
      originalComboPrice: 418,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'promo-gaming',
      title: 'Combo Escritorio Gamer Pro',
      discountTag: '🎁 ACCESORIOS GRATIS',
      description: 'Para entusiastas del gaming y creadores de contenido que quieren una estación estable con máxima fluidez ocular.',
      bundleProducts: [
        'Monitor Gamer LG UltraGear 24" Fast IPS ($159 valor)',
        'Audífonos JBL Wireless ($49 valor)',
        'Teclado Mecánico Retroiluminado RGB ($40 valor)',
        'Mouse Pad Gamer Extra Grande de regalo'
      ],
      comboPrice: 199,
      originalComboPrice: 288,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const filteredProducts = selectedCategory === 'todos' 
    ? productsList 
    : productsList.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 rounded-3xl border border-zinc-800 p-6 md:p-10 shadow-2xl overflow-hidden relative" id="interactiveShowcase">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-850 pb-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-black text-zinc-100 flex items-center justify-center md:justify-start gap-2.5">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
              Catálogo Digital Tech
            </h3>
            <p className="text-xs text-zinc-400 font-sans">
              Explora opciones de equipamiento confiable, bundles con descuento y nuestra sucursal en Shushufindi
            </p>
          </div>

          {/* Tab Button Toggles */}
          <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl md:w-auto w-full justify-between">
            {([
              { id: 'productos', label: 'Productos', icon: Laptop },
              { id: 'promociones', label: 'Promociones %', icon: Tag },
              { id: 'ubicacion', label: 'Ubicación y Tienda', icon: MapPin }
            ] as const).map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/10' 
                      : 'text-zinc-400 hover:text-zinc-150 hover:bg-zinc-800/40'
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: PRODUCTOS */}
        {activeTab === 'productos' && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todos los Equipos' },
                { id: 'laptops', label: 'Lenovo Laptops' },
                { id: 'tablets', label: 'Tablets' },
                { id: 'pantallas', label: 'Monitores' },
                { id: 'audio', label: 'Audio' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-zinc-100 border-zinc-150 text-black'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Products Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProducts.map((prod) => {
                const isLaptop = prod.id === 'lenovo-slim3';
                return (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-zinc-900/60 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all group ${
                      isLaptop ? 'border-emerald-500/40 bg-zinc-900/80 shadow-lg shadow-emerald-500/5' : 'border-zinc-850 hover:border-zinc-750'
                    }`}
                  >
                    <div>
                      {/* Image header with relative stock tag */}
                      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                        
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {isLaptop && (
                            <span className="bg-emerald-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                              Articulo Estrella · Más Vendido
                            </span>
                          )}
                          <span className="bg-zinc-950/85 border border-zinc-800 text-zinc-300 text-[9px] font-bold px-2 py-0.5 rounded-md">
                            Garantía Directa
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase font-mono tracking-widest">{prod.category}</span>
                            <h4 className="font-extrabold text-sm md:text-base text-zinc-150 leading-tight mt-0.5">{prod.name}</h4>
                          </div>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-5 space-y-4 font-sans">
                        <p className="text-[11px] md:text-xs text-zinc-350 italic font-semibold leading-normal">
                          &ldquo;{prod.tagline}&rdquo;
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed text-balance">
                          {prod.description}
                        </p>

                        <div className="space-y-1.5">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Especificaciones Clave:</p>
                          <ul className="text-[11px] text-zinc-300 space-y-1">
                            {prod.specs.map((spec, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400">✓</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Footer pricing info and CTA */}
                    <div className="p-5 border-t border-zinc-850 bg-zinc-900/30 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-emerald-400 leading-none">${prod.price}</span>
                          <span className="text-xs text-zinc-500 line-through leading-none">${prod.originalPrice}</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                          {isLaptop ? `¡Quedan sólo  ${stock} un.!` : `Stock: ${prod.stock} un. disponibles`}
                        </p>
                      </div>

                      <button
                        onClick={() => onOpenCheckout(prod.price, prod.name, prod.id)}
                        className={`font-black text-xs px-4 py-3.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 uppercase tracking-wider ${
                          isLaptop
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-black shadow-lg shadow-emerald-500/10'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white border border-zinc-700'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Adquirir Ahora</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: PROMOCIONES */}
        {activeTab === 'promociones' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950/20 to-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="space-y-1 text-center md:text-left">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Descuento Colectivo
                </span>
                <h4 className="font-extrabold text-sm md:text-base text-zinc-150">Adquiere en Combo y ahorra en costes aduaneros</h4>
                <p className="text-xs text-zinc-400">Todos los combos integran bolso de flete, envíos prioritarios y accesorios listos de fábrica.</p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-zinc-300 text-xs font-mono">
                <BadgeAlert className="w-4 h-4 text-emerald-400 animate-bounce" /> Lote reducido: combos limitados por stock
              </div>
            </div>

            {/* Promo listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotionsList.map((promo) => (
                <div 
                  key={promo.id}
                  className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all font-sans"
                >
                  <div>
                    {/* Header Image box */}
                    <div className="relative aspect-video w-full bg-zinc-950">
                      <img 
                        src={promo.image} 
                        alt={promo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent"></div>
                      
                      <div className="absolute top-3 right-3">
                        <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-md animate-pulse">
                          {promo.discountTag}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="font-extrabold text-sm md:text-sm text-zinc-150 group-hover:text-emerald-400 transition-colors leading-tight">{promo.title}</h4>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      <p className="text-xs text-zinc-400 leading-normal">
                        {promo.description}
                      </p>

                      <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1.5">
                        <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Equipamiento Incluido:</p>
                        <ul className="text-[11px] text-zinc-300 space-y-1">
                          {promo.bundleProducts.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 text-balance">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="p-4 border-t border-zinc-850 bg-zinc-950/50 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Precio en Combo:</span>
                      <div className="text-right">
                        <p className="text-2xl font-black text-emerald-400">${promo.comboPrice} <span className="text-[11px] font-normal text-zinc-400">USD</span></p>
                        <p className="text-[10px] text-zinc-500 line-through">Normal: ${promo.originalComboPrice} USD</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenCheckout(promo.comboPrice, promo.title, promo.id)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Comprar Combo Especial</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: CONTACTO Y UBICACIÓN */}
        {activeTab === 'ubicacion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
            {/* Map Simulator / Layout visualization */}
            <div className="lg:col-span-5 relative group bg-zinc-900 p-5 rounded-3xl border border-zinc-850">
              <div className="aspect-square bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden relative flex flex-col justify-between p-4 shadow-inner">
                {/* Simulated Street grid */}
                <div className="absolute inset-0 opacity-40 mix-blend-color-dodge">
                  <div className="w-full h-full bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  {/* Fake map lines */}
                  <div className="absolute top-1/3 left-0 right-0 h-[3px] bg-zinc-800"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-[3px] bg-zinc-800"></div>
                  <div className="absolute top-0 bottom-0 left-1/3 w-[3px] bg-zinc-800"></div>
                  <div className="absolute top-0 bottom-0 left-2/3 w-[3px] bg-zinc-800"></div>
                  {/* Av. Amazonas marking -> Calle Manabí */}
                  <div className="absolute top-[48%] left-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-950 px-1 border border-zinc-800 rotate-1 rounded-sm">
                    Calle Manabí
                  </div>
                  {/* Ramón Roca marking -> 12 de Febrero */}
                  <div className="absolute top-5 left-[55%] text-[9px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-950 px-1 border border-zinc-800 rotate-90 rounded-sm">
                    12 de Febrero
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-center w-full">
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                    Tienda Física Shushufindi
                  </span>
                  <span className="text-[9px] text-zinc-500">EC-SUF</span>
                </div>

                {/* Pulsating Map Pin Marker precisely indicating Plaza Amazonas */}
                <div className="relative z-10 mx-auto flex flex-col items-center justify-center my-auto">
                  <div className="relative">
                    <span className="absolute inset-0 animate-ping inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <div className="w-10 h-10 bg-emerald-500 text-black border-2 border-zinc-900 rounded-full flex items-center justify-center shadow-lg relative z-10 transform scale-110">
                      <MapPin className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  </div>
                  <h5 className="font-extrabold text-xs text-white mt-3 text-shadow uppercase bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
                    Digital Tech
                  </h5>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5 bg-black/80 px-2 py-0.5 border border-zinc-900 rounded-md">
                    Shushufindi, Ecuador
                  </p>
                </div>

                <div className="relative z-10 p-3 bg-zinc-900/95 border border-zinc-800 rounded-xl flex items-center justify-between text-[11px] gap-2.5">
                  <span className="text-zinc-300 font-medium leading-none">Atención segura y soporte postventa garantizado</span>
                  <Map className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>

            {/* Coordinates and physical info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-emerald-400 font-black uppercase tracking-widest">
                  ¿Cómo encontrarnos en persona?
                </span>
                <h4 className="text-xl md:text-2xl font-black text-zinc-100 flex items-center gap-2">
                  Visita nuestra Tienda Física en Shushufindi, Ecuador
                </h4>
                <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
              </div>

              {/* Detail cards list */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-emerald-400 rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-zinc-300 uppercase tracking-wider">Dirección Exacta:</h5>
                    <p className="text-sm text-zinc-200 font-semibold leading-relaxed mt-0.5">
                      Calles Manabí y 12 de Febrero.
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">Shushufindi, Ecuador 🇪🇨.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-emerald-400 rounded-xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-zinc-300 uppercase tracking-wider">Teléfonos de Consultas:</h5>
                    <p className="text-sm text-zinc-200 mt-0.5">
                      Celular/WhatsApp: <strong className="text-emerald-400 font-black">+593 984729888</strong>
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">Atención telefónica directa en horario comercial.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-emerald-400 rounded-xl shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-zinc-300 uppercase tracking-wider">Horario de Atención Oficial:</h5>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-zinc-200 font-semibold mt-1 max-w-sm">
                      <span className="text-zinc-400">Lunes a Viernes:</span>
                      <span>09:00 AM - 06:30 PM</span>
                      <span className="text-zinc-400">Sábados:</span>
                      <span>10:00 AM - 04:00 PM</span>
                      <span className="text-zinc-400">Domingos y Feriados:</span>
                      <span className="text-red-400">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=Calles+Manabi+y+12+de+Febrero,+Shushufindi,+Ecuador"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-100 hover:bg-zinc-200 text-black font-extrabold text-xs px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <ExternalLink className="w-4 h-4 shrink-0 text-black" />
                  <span>Ver en Google Maps</span>
                </a>

                <a
                  href="tel:+593984729888"
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:text-white font-bold text-xs px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 shrink-0 text-emerald-400 animate-pulse" />
                  <span>Llamar por Teléfono Directo</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
