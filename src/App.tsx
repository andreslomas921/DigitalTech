import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  BookOpen, 
  Share2, 
  PhoneCall, 
  Locate, 
  Star, 
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Search,
  Menu,
  Tag,
  Phone,
  MapPin,
  Store,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from './types';

import ProblemQuiz from './components/ProblemQuiz';
import StorySection from './components/StorySection';
import SpecsHotspots from './components/SpecsHotspots';
import Transformation from './components/Transformation';
import FAQ from './components/FAQ';
import CheckoutModal from './components/CheckoutModal';
import WhatsAppChat from './components/WhatsAppChat';
import InteractiveShowcase from './components/InteractiveShowcase';

// Star rating component helper
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 fill-current ${i < count ? 'text-amber-400' : 'text-zinc-200'}`} />
      ))}
    </div>
  );
}

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [timeLeft, setTimeLeft] = useState(898); // 14 mins 58 secs

  // Navigation page view state: 'landing' for single-product sales template, 'catalogo' for the store page
  const [currentView, setCurrentView] = useState<'landing' | 'catalogo'>('landing');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('todos');
  const [isDarkMode, setIsDarkMode] = useState(false); // To test look variations in real-time, pictured in Cemco screenshots

  // Live stock count ticker simulation
  const [stock, setStock] = useState(8);

  // Dynamic product checkout details configuration state
  const [checkoutPrice, setCheckoutPrice] = useState(469);
  const [checkoutProductTitle, setCheckoutProductTitle] = useState("Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000");
  const [checkoutProductId, setCheckoutProductId] = useState("lenovo-slim3");

  // Controlled active tab for our interactive products layout & custom menus (resembling Cemco)
  const [showcaseActiveTab, setShowcaseActiveTab] = useState<'productos' | 'promociones' | 'ubicacion'>('productos');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // 🛠️ Dynamic Database of 13 certified premium products (Ecuador imports context)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'lenovo-slim3',
      name: 'Laptop Lenovo IdeaPad Slim 3 AMD Ryzen 3',
      tagline: 'Excelente rendimiento diario para tesis, presupuestos y trabajo remoto',
      description: 'Increíble procesador AMD Ryzen Serie 7000 de alta eficiencia, con almacenamiento ultrarrápido PCIe SSD y pantalla nítida FHD de marcos ultra delgados. El equilibrio perfecto para la educación y productividad en Ecuador.',
      price: 469,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Procesador AMD Ryzen 3 7320U de hasta 4.1GHz',
        '8GB RAM LPDDR5 de frecuencia extrema',
        'Almacenamiento ultra veloz de 512GB SSD PCIe NVMe M.2',
        'Pantalla de 15.6" Full HD antirreflejo'
      ],
      category: 'laptops',
      stock: 8,
      featured: true
    },
    {
      id: 'laptop-hp15',
      name: 'Laptop HP 15-fc0232la AMD Athlon M4',
      tagline: 'Elegancia y resistencia para tus tareas diarias en el hogar',
      description: 'Rendimiento sólido a un precio sumamente accesible con chasis elegante, teclado numérico completo en español y cámara con micrófono integrado de alta fidelidad.',
      price: 419,
      originalPrice: 650,
      image: 'https://images.unsplash.com/photo-1496181130204-755241544e35?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Procesador AMD Athlon Gold 7220U acelerado',
        '8GB RAM DDR4 de alto rendimiento operativo',
        'Almacenamiento 256GB SSD ultradelgado',
        'Pantalla de 15.6 pulgadas de alta luminosidad'
      ],
      category: 'laptops',
      stock: 14
    },
    {
      id: 'laptop-asus',
      name: 'Laptop ASUS Vivobook 15 de Lote',
      tagline: 'Ultra ligera, moderna y lista para la acción corporativa',
      description: 'Hermosa laptop con bisagra plana de 180° y un espectacular color plata texturizado de fábrica. Incorpora la exclusiva protección antibacteriana ASUS antibacterial guard.',
      price: 489,
      originalPrice: 749,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Procesador Intel Core i3 de 12va Generación',
        '8GB RAM DDR4 de alta velocidad',
        'Almacenamiento 512GB SSD NVMe optimizado',
        'Pantalla de 15.6" Full HD NanoEdge antirreflejo'
      ],
      category: 'laptops',
      stock: 6
    },
    {
      id: 'cpu-hp280',
      name: 'Computadora HP Pro 280 G9 SFF Intel i5',
      tagline: 'El cerebro de oficina corporativo de tamaño ultra compacto',
      description: 'Chasis robusto tipo Small Form Factor que cabe idóneamente en cualquier espacio de escritorio corporativo. Súper silenciosa y veloz.',
      price: 519,
      originalPrice: 850,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Procesador Intel Core i5-12500 (6 Núcleos de alta velocidad)',
        '16GB Memoria RAM de doble canal para tareas pesadas',
        'Almacenamiento 512GB SSD M.2 de nivel alto',
        'Incluye teclado y mouse óptico HP originales'
      ],
      category: 'cpus',
      stock: 9
    },
    {
      id: 'cpu-lenovo-m75',
      name: 'ThinkCentre M75s Gen 2 AMD Ryzen 7',
      tagline: 'Rendimiento extremo para codificación, contabilidad y datos',
      description: 'Potente CPU de escritorio empresarial configurado para jornadas ininterrumpidas de productividad intensiva, CRM, bases de datos o programación.',
      price: 579,
      originalPrice: 949,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Procesador AMD Ryzen 7 PRO con 8 núcleos físicos reales',
        '16GB RAM DDR4 de alto desempeño industrial',
        'Almacenamiento 512GB SSD NVMe de rápida lectura',
        'Tarjeta dTPM 2.0 y chasis templado de grado militar'
      ],
      category: 'cpus',
      stock: 11
    },
    {
      id: 'celular-poco-m6',
      name: 'Celular Xiaomi POCO M6 Pro 512GB',
      tagline: 'La fluidez perfecta de 1 flow AMOLED 120Hz',
      description: 'Equipado con un lente estabilizado mecánicamente de 64MP y un espacio de almacenamiento colosal para guardar miles de fotos y videos de alta calidad sin agotar memoria.',
      price: 189,
      originalPrice: 299,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
      specs: [
        '512GB de Memoria Interna Ultra Almacenamiento',
        '12GB Memoria RAM DDR4X veloz',
        'Pantalla AMOLED fluida de 120Hz',
        'Cámara de 64MP con estabilizador óptico OIS'
      ],
      category: 'celulares',
      stock: 19
    },
    {
      id: 'celular-note13',
      name: 'Celular Redmi Note 13 Pro 4G 200MP',
      tagline: 'Fotografías de nivel megapíxel insignia',
      description: 'La máquina de capturar contenidos definitiva con sensor fotográfico ultra claro de 200 megapíxeles y sistema de carga rápida que revive la batería en minutos.',
      price: 249,
      originalPrice: 380,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Cámara ultra claro de 200MP con OIS',
        'Visual AMOLED con marcos ultra delgados estéticos',
        '8GB RAM + 256GB Almacenamiento protegido',
        'Batería ultra duradera de 5000 mAh'
      ],
      category: 'celulares',
      stock: 15
    },
    {
      id: 'impresora-l3250',
      name: 'Impresora Epson EcoTank L3250 WiFi',
      tagline: 'Impresiones y copias inalámbricas de bajísimo costo',
      description: 'El modelo estrella de Ecuador. Olvídate de los cartuchos caros y recarga con botellas de tinta directamente en sus tanques continuos frontales.',
      price: 229,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Sistema original integrado de tanques de tinta continua',
        'Conexión inalámbrica WiFi (imprime de tu smartphone)',
        'Escaner de alta resolución y fotofijador continuo',
        'Hasta 4,500 impresiones en negro con un solo juego'
      ],
      category: 'impresoras',
      stock: 22
    },
    {
      id: 'impresora-l1250',
      name: 'Impresora Epson EcoTank L1250 WiFi',
      tagline: 'La opción EcoTank compacta e ideal para estudiantes',
      description: 'Imprime por aire, rápida y con bajísimo coste de insumos cotidianos. El soporte de tareas ideal para los chicos y jóvenes en casa.',
      price: 189,
      originalPrice: 289,
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Tanque de tinta EcoTank ultra optimizado',
        'Conexión Wi-Fi integrada directa',
        'Excelente resolución fotográfica de inyección',
        'Fácil recarga limpia sin goteos patentada'
      ],
      category: 'impresoras',
      stock: 17
    },
    {
      id: 'tv-samsung32',
      name: 'TV Samsung 32" LED Smart TV UN32',
      tagline: 'Colores hiper claros y todas tus apps favoritas',
      description: 'Pantalla inteligente perfecta para cocinas, comedores, o dormitorios de niños. Disfruta de Netflix, Disney+ o YouTube al instante.',
      price: 199,
      originalPrice: 320,
      image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Pantalla LED de 32 pulgadas HD nítida',
        'Gama PurColor para rango cromático realista',
        'Sistema Tizen Smart TV veloz y amigable',
        'Puertos HDMI y USB para pendrives operacionales'
      ],
      category: 'televisores',
      stock: 12
    },
    {
      id: 'tv-lg43',
      name: 'TV LG 43" AI Smart TV FHD ThinQ',
      tagline: 'La inteligencia artificial que asombra tus ojos',
      description: 'Excelente para salas de estar. Re-escala imágenes de menor definición a nitidez FHD en vivo mediante su procesador inteligente interno.',
      price: 299,
      originalPrice: 429,
      image: 'https://images.unsplash.com/photo-1552273894-124443304743?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Pantalla IPS antirreflejo de 43 pulgadas',
        'Procesador IA ThinQ con comandos de voz inteligentes',
        'Sistema WebOS súper intuitivo de última generación',
        'Sonido virtual Surround envolvente'
      ],
      category: 'televisores',
      stock: 8
    },
    {
      id: 'proyector-benq',
      name: 'Proyector BenQ MX560C 4000 Lumens',
      tagline: 'La luminosidad perfecta para aulas y salas iluminadas',
      description: 'Proyecciones sumamente nítidas e intensas con tecnología DLP y 4000 lúmenes ANSI reales para dar clases o conferencias ejecutivas de alto nivel.',
      price: 429,
      originalPrice: 699,
      image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Luminosidad brutal de 4000 lúmenes ANSI reales',
        'Relación de contraste digital 20,000:1 impecable',
        'Conectividad HDMI dual de alta velocidad de respuesta'
      ],
      category: 'proyectores',
      stock: 7
    },
    {
      id: 'proyector-epson',
      name: 'Proyector Epson EpiVision Flex CO-W01',
      tagline: 'Tu pantalla de cine gigante portátil de hasta 300 pulgadas',
      description: 'El rey de las reuniones familiares, partidos deportivos y conferencias de venta. Proyecta de manera fluida imágenes impactantes e inmensas de alta nitidez.',
      price: 459,
      originalPrice: 750,
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
      specs: [
        'Brillo masivo de 3000 lúmenes en blanco y color',
        'Tecnología 3LCD de tres chips para colores vibrantes',
        'Entrada HDMI compatible con Smart Sticks y TV boxes',
        'Keystone auto-corrector instantáneo'
      ],
      category: 'proyectores',
      stock: 9
    }
  ]);

  // Form states for the dynamic "Actualizar Equipo / Administrador de Lote" tool
  const [editingProductId, setEditingProductId] = useState<string>('new');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('laptops');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState(450);
  const [formOriginalPrice, setFormOriginalPrice] = useState(699);
  const [formStock, setFormStock] = useState(10);
  const [formDescription, setFormDescription] = useState('');
  const [formSpecs, setFormSpecs] = useState('');
  const [formImage, setFormImage] = useState('');
  const [adminStatus, setAdminStatus] = useState('');

  // Auto-populate form fields when selecting a product to edit
  const handleSelectProductToEdit = (prodId: string) => {
    setEditingProductId(prodId);
    if (prodId === 'new') {
      setFormName('');
      setFormCategory('laptops');
      setFormTagline('');
      setFormPrice(450);
      setFormOriginalPrice(699);
      setFormStock(10);
      setFormDescription('');
      setFormSpecs('');
      setFormImage('');
    } else {
      const p = products.find(item => item.id === prodId);
      if (p) {
        setFormName(p.name);
        setFormCategory(p.category);
        setFormTagline(p.tagline);
        setFormPrice(p.price);
        setFormOriginalPrice(p.originalPrice);
        setFormStock(p.stock);
        setFormDescription(p.description);
        setFormSpecs(p.specs.join('\n'));
        setFormImage(p.image);
      }
    }
  };

  // Submit product additions or dynamic updates
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Por favor introduce un nombre válido para el equipo.');
      return;
    }

    const specsArray = formSpecs
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const fallbackImages: Record<string, string> = {
      laptops: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop',
      cpus: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop',
      celulares: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
      impresoras: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop',
      televisores: 'https://images.unsplash.com/photo-1593305841991-05c297ba4375?q=80&w=600&auto=format&fit=crop',
      proyectores: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop'
    };

    const targetImage = formImage.trim() || fallbackImages[formCategory] || fallbackImages.laptops;

    if (editingProductId === 'new') {
      // Create Brand New Product
      const newId = `custom-prod-${Date.now()}`;
      const newProduct: Product = {
        id: newId,
        name: formName,
        tagline: formTagline || 'Artículo de importación de lote original',
        description: formDescription || 'Equipo certificado de fábrica disponible con flete prioritario seguro.',
        price: Number(formPrice) || 399,
        originalPrice: Number(formOriginalPrice) || 599,
        image: targetImage,
        specs: specsArray.length > 0 ? specsArray : ['Garantía certificada de lote', 'Manuales y accesorios incluidos'],
        category: formCategory,
        stock: Number(formStock) || 5
      };

      setProducts(prev => [newProduct, ...prev]);
      setAdminStatus(`¡Equipo "${formName}" creado y catalogado con éxito!`);
      // Select the new one
      setEditingProductId(newId);
    } else {
      // Update Existing Product
      setProducts(prev => prev.map(item => {
        if (item.id === editingProductId) {
          return {
            ...item,
            name: formName,
            category: formCategory,
            tagline: formTagline,
            price: Number(formPrice),
            originalPrice: Number(formOriginalPrice),
            stock: Number(formStock),
            description: formDescription,
            specs: specsArray.length > 0 ? specsArray : item.specs,
            image: targetImage
          };
        }
        return item;
      }));
      setAdminStatus(`¡Equipo "${formName}" actualizado correctamente en el inventario activo!`);
    }

    // Auto clear success alert after a brief time
    setTimeout(() => {
      setAdminStatus('');
    }, 4000);
  };

  useEffect(() => {
    // Scroll tracking
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Urgent Countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 898));
    }, 1000);

    // Random stock reduction trick after an amount of minutes to trigger urgency naturally
    const stockTimer = setTimeout(() => {
      setStock(7);
    }, 45000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
      clearTimeout(stockTimer);
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenCheckout = (price = 469, title = "Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000", id = "lenovo-slim3") => {
    setCheckoutPrice(price);
    setCheckoutProductTitle(title);
    setCheckoutProductId(id);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="font-sans antialiased text-zinc-950 bg-white selection:bg-emerald-500 selection:text-black">
      {/* 🇨🇪 Cemco-Inspired Superior Top Informational Bar */}
      <div className="bg-zinc-100 text-zinc-650 border-b border-zinc-200 text-[11px] md:text-xs py-2 px-6 font-medium relative z-30 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-zinc-600">
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Lunes a Viernes 09:00 a 18:30 | Sábados 10:00 a 16:00</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" /> Shushufindi: Calles Manabí y 12 de Febrero
            </span>
            <span className="hidden md:inline text-zinc-300">|</span>
            <span className="font-semibold text-blue-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Bienvenido a Digital Tech Ecuador
            </span>
          </div>
        </div>
      </div>

      {/* ⚠️ Urgent Conversion Top Banner */}
      <div className="bg-red-600 text-white font-sans text-[11px] md:text-sm text-center py-2.5 px-4 font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 relative z-20 shadow-md">
        <span className="inline-block animate-ping w-2 h-2 rounded-full bg-white"></span>
        ¡ATENCIÓN! Oportunidad de importación directa de lote limitado. Precio actual garantizado solo por hoy.
      </div>

      {/* 🛡️ Cemco-Style Main Navigation Header section (White base with high-contrast corporate accent) */}
      <header className="bg-white border-b border-zinc-200 shadow-sm relative z-20 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo formatted precisely like Cemco (Bold name + "web" style badge) */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-lg tracking-tighter shadow-md shadow-blue-500/10">
                DT
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="flex items-center gap-1">
                  <span className="font-sans font-black text-2xl tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">
                    DigitalTech
                  </span>
                  <span className="bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90 origin-bottom">
                    web
                  </span>
                </div>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono block leading-none mt-0.5">
                  Importador Directo Mayorista
                </span>
              </div>
            </button>

            {/* Mobile quick direct WhatsApp trigger */}
            <a
              href="https://wa.me/593984729888"
              className="md:hidden p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-full"
              title="WhatsApp"
            >
              💬
            </a>
          </div>

          {/* Interactive Live Search Bar Component (Mimicking Cemco "Buscar productos ...") */}
          <div className="relative w-full md:max-w-md shrink-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar laptops, tablets, monitores, combos..."
                className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-blue-600 font-sans focus:bg-white text-zinc-900 placeholder-zinc-400 text-sm py-2.5 pl-4 pr-10 rounded-xl transition-all outline-none"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-zinc-400 hover:text-zinc-600 mr-1.5"
                  >
                    ✕
                  </button>
                )}
                <Search className="w-4 h-4 text-zinc-400" />
              </div>
            </div>

            {/* Dynamic Interactive suggestions box popover */}
            <AnimatePresence>
              {searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden z-50 text-left"
                >
                  <div className="p-2.5 bg-zinc-50 border-b border-zinc-150 text-[10px] uppercase font-black text-zinc-400 tracking-wider">
                    Resultados de Inventario ({
                      [
                        { id: 'lenovo-slim3', name: 'Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000', price: 469, category: 'Laptops', tab: 'productos' as const },
                        { id: 'lenovo-tab-p11', name: 'Tablet Lenovo Tab P11 Gen 2 + Lápiz', price: 229, category: 'Tablets', tab: 'productos' as const },
                        { id: 'monitor-lg-ultragear', name: 'Monitor Gamer LG UltraGear 24" Fast IPS', price: 159, category: 'Monitores', tab: 'productos' as const },
                        { id: 'jbl-520bt', name: 'Audífonos JBL Tune 520BT Wireless', price: 49, category: 'Audio', tab: 'productos' as const },
                        { id: 'promo-oficina-pro', name: 'Combo Oficina Premium Súper Equipado', price: 499, category: 'Combos / Ofertas', tab: 'promociones' as const },
                        { id: 'promo-estudiante', name: 'Combo Estudiante Conectado', price: 269, category: 'Combos / Ofertas', tab: 'promociones' as const },
                        { id: 'promo-gaming', name: 'Combo Escritorio Gamer Pro', price: 199, category: 'Combos / Ofertas', tab: 'promociones' as const }
                      ].filter(item => 
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.category.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length
                    } artículos encontrados)
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-zinc-100">
                    {(() => {
                      const list = [
                        { id: 'lenovo-slim3', name: 'Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000', price: 469, category: 'Laptops', tab: 'productos' as const },
                        { id: 'lenovo-tab-p11', name: 'Tablet Lenovo Tab P11 Gen 2 + Lápiz', price: 229, category: 'Tablets', tab: 'productos' as const },
                        { id: 'monitor-lg-ultragear', name: 'Monitor Gamer LG UltraGear 24" Fast IPS', price: 159, category: 'Monitores', tab: 'productos' as const },
                        { id: 'jbl-520bt', name: 'Audífonos JBL Tune 520BT Wireless', price: 49, category: 'Audio', tab: 'productos' as const },
                        { id: 'promo-oficina-pro', name: 'Combo Oficina Premium Súper Equipado', price: 499, category: 'Combos / Ofertas', tab: 'promociones' as const },
                        { id: 'promo-estudiante', name: 'Combo Estudiante Conectado', price: 269, category: 'Combos / Ofertas', tab: 'promociones' as const },
                        { id: 'promo-gaming', name: 'Combo Escritorio Gamer Pro', price: 199, category: 'Combos / Ofertas', tab: 'promociones' as const }
                      ].filter(item => 
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.category.toLowerCase().includes(searchQuery.toLowerCase())
                      );

                      if (list.length === 0) {
                        return (
                          <div className="p-4 text-center text-xs text-zinc-400">
                            No encontramos coincidencias directas. Intenta buscar "Lenovo", "Tablet" o "Combo".
                          </div>
                        );
                      }

                      return list.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSearchQuery('');
                            setShowcaseActiveTab(item.tab);
                            const el = document.getElementById('catalogo');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                            setSearchStatus(`Mostrando artículo: "${item.name}"`);
                            setTimeout(() => setSearchStatus(''), 4500);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 flex items-center justify-between gap-3 text-xs text-zinc-700 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.category}</span>
                            <p className="font-extrabold text-[#111]">{item.name}</p>
                          </div>
                          <span className="shrink-0 bg-blue-100 text-blue-800 font-extrabold px-2 py-1 rounded">
                            ${item.price}
                          </span>
                        </button>
                      ));
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Direct Commercial Contacts Block */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-600">
            <div className="flex items-center gap-2.5">
              <a
                href="https://wa.me/593984729888?text=Hola%20Digital%20Tech%2C%20le%20escribo%20desde%20su%20tienda%20online."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer uppercase tracking-wider"
              >
                💬 WhatsApp Directo
              </a>
              <div className="text-right">
                <p className="text-[10px] text-zinc-400 leading-none">Línea Celular:</p>
                <a href="tel:+593984729888" className="font-extrabold text-zinc-800 hover:text-blue-600 font-mono text-[11px] block mt-0.5">
                  +593 984729888
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Option Menu Row (Requested Menu: laptops, cpus, celulares, impresoras, televisores, proyectores) + Cemco style */}
        <div className="bg-blue-600 text-white border-t border-blue-700 relative z-20 font-sans">
          <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-stretch justify-between">
            {/* Cemco 'Todas las categorias' style dropdown selector */}
            <div className="relative group shrink-0">
              <button className="bg-blue-700 group-hover:bg-blue-800 text-white font-extrabold text-xs py-3.5 px-6 flex items-center gap-2.5 uppercase tracking-wide cursor-pointer transition-colors h-full w-full lg:w-auto">
                <Menu className="w-4 h-4 shrink-0" />
                <span>Navegar Catálogo</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              {/* Float popover matching requested categories list layout */}
              <div className="absolute top-full left-0 bg-white text-zinc-900 border border-zinc-200 w-64 shadow-2xl rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden divide-y divide-zinc-150">
                <button 
                  onClick={() => {
                    setCurrentView('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left px-4.5 py-3 text-xs font-bold hover:bg-zinc-50 flex items-center justify-between text-zinc-700 group/item"
                >
                  <span>🏠 Página Principal (IdeaPad Slim 3)</span>
                  <span className="text-blue-600">→</span>
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('catalogo');
                    setSelectedCatalogCategory('todos');
                  }}
                  className="w-full text-left px-4.5 py-3 text-xs font-bold hover:bg-zinc-50 flex items-center justify-between text-zinc-700 group/item"
                >
                  <span>📦 Ver Todo el Catálogo</span>
                  <span className="text-blue-600">→</span>
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('catalogo');
                    setSelectedCatalogCategory('todos');
                  }}
                  className="w-full text-left px-4.5 py-3 text-xs font-bold hover:bg-rose-50 flex items-center justify-between text-rose-750 group/item"
                >
                  <span>🔥 Ofertas & Descuentos Especiales</span>
                  <span className="text-rose-600">→</span>
                </button>
              </div>
            </div>

            {/* Requested Menu: laptops, cpus, celulares, impresoras, televisores, proyectores */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-0.5 py-1 lg:py-0">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-blue-750 text-white cursor-pointer ${
                  currentView === 'landing' ? 'bg-blue-700 border-b-2 border-emerald-400' : ''
                }`}
              >
                🏠 Inicio
              </button>

              <button
                onClick={() => {
                  setCurrentView('catalogo');
                  setSelectedCatalogCategory('laptops');
                }}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-blue-750 text-white cursor-pointer ${
                  currentView === 'catalogo' && selectedCatalogCategory === 'laptops' ? 'bg-blue-700 border-b-2 border-emerald-400' : ''
                }`}
              >
                💻 Laptops
              </button>

              <button
                onClick={() => {
                  setCurrentView('catalogo');
                  setSelectedCatalogCategory('cpus');
                }}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-blue-750 text-white cursor-pointer ${
                  currentView === 'catalogo' && selectedCatalogCategory === 'cpus' ? 'bg-blue-700 border-b-2 border-emerald-400' : ''
                }`}
              >
                🖥️ CPUs
              </button>

              <button
                onClick={() => {
                  setCurrentView('catalogo');
                  setSelectedCatalogCategory('celulares');
                }}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-blue-750 text-white cursor-pointer ${
                  currentView === 'catalogo' && selectedCatalogCategory === 'celulares' ? 'bg-blue-700 border-b-2 border-emerald-400' : ''
                }`}
              >
                📱 Celulares
              </button>

              <button
                onClick={() => {
                  setCurrentView('catalogo');
                  setSelectedCatalogCategory('impresoras');
                }}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-blue-750 text-white cursor-pointer ${
                  currentView === 'catalogo' && selectedCatalogCategory === 'impresoras' ? 'bg-blue-700 border-b-2 border-emerald-400' : ''
                }`}
              >
                🖨️ Impresoras
              </button>

              <button
                onClick={() => {
                  setCurrentView('televisores');
                  setSelectedCatalogCategory('televisores');
                  setCurrentView('catalogo');
                }}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-blue-750 text-white cursor-pointer ${
                  currentView === 'catalogo' && selectedCatalogCategory === 'televisores' ? 'bg-blue-700 border-b-2 border-emerald-400' : ''
                }`}
              >
                📺 Televisores
              </button>

              <button
                onClick={() => {
                  setCurrentView('catalogo');
                  setSelectedCatalogCategory('proyectores');
                }}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-blue-750 text-white cursor-pointer ${
                  currentView === 'catalogo' && selectedCatalogCategory === 'proyectores' ? 'bg-blue-700 border-b-2 border-emerald-400' : ''
                }`}
              >
                🎥 Proyectores
              </button>
            </div>

            {/* Right Side Promo Label */}
            <div className="hidden xl:flex items-center text-xs gap-1.5 px-4 font-mono font-bold tracking-tight text-blue-100">
              <span>✈️ Almacén Físico y Envío Express Seguro</span>
            </div>
          </div>
        </div>

        {/* Dynamic Search result banner context inside page */}
        {searchStatus && (
          <div className="bg-blue-50/90 border-b border-blue-150 py-2.5 px-6 text-center text-xs text-blue-800 font-extrabold tracking-wide uppercase transition-all duration-300">
            {searchStatus}
          </div>
        )}
      </header>

      {currentView === 'landing' ? (
        <>
          {/* BLOCK 1: ABOVE THE FOLD (PREMIUM CORPORATE LIGHT THEME) */}
          <header className="relative bg-gradient-to-br from-blue-50/70 via-indigo-50/20 to-white text-zinc-900 py-14 md:py-20 border-b border-zinc-200 overflow-hidden" id="above-fold">
            {/* Decorative background grid and blurs */}
            <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-8 md:space-y-12">
              {/* Label Indicator to build confidence */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest bg-white border border-blue-105 text-blue-600 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Equipos de Fábrica · Digital Tech
                </span>
              </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-center text-zinc-950 max-w-4xl mx-auto leading-[1.12] tracking-tight">
            ¿Sigues usando una computadora lenta, anticuada o prestada que te hace{' '}
            <span className="text-red-650 underline decoration-red-550/50 decoration-wavy underline-offset-8">
              perder tiempo, dinero y oportunidades
            </span>{' '}
            cada día?
          </h1>

          {/* SUBHEADLINE */}
          <p className="text-base md:text-xl text-zinc-700 font-medium text-center max-w-3xl mx-auto leading-relaxed">
            Descubre la nueva laptop <strong className="text-zinc-950">Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000</strong> que estudiantes, freelancers y profesionales están eligiendo en Ecuador para trabajar rápido, ganar más y no quedarse atrás — por solo <strong className="text-blue-700 font-extrabold text-lg md:text-2xl">${469} USD</strong> con garantía y envío inmediato.
          </p>

          {/* Dynamic Trust badging & Urgent Countdown */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto bg-white border border-zinc-200 p-4.5 rounded-2xl shadow-sm">
            <div className="text-center md:text-left shrink-0">
              <span className="text-[10px] text-zinc-400 font-semibold tracking-widest block uppercase">
                Reservación de Lote en Shushufindi:
              </span>
              <p className="text-xs text-zinc-750 font-medium mt-0.5">La oferta finaliza en:</p>
            </div>
            
            <div className="flex items-center gap-2 font-mono text-xl md:text-2xl font-black text-blue-700 bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-105 shrink-0">
              <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <div className="hidden md:block w-[1px] h-8 bg-zinc-200"></div>

            <div className="text-center md:text-left text-xs text-zinc-600 leading-normal font-medium">
              🚀 Pago seguro contra entrega · <strong className="text-zinc-900">Garantía Directa</strong> · Envío prioridad seguro para {stock} unidades.
            </div>
          </div>

          {/* Core Visual Mockup Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            {/* Left points summary */}
            <div className="lg:col-span-4 space-y-4 order-2 lg:order-1 font-sans">
              <div className="bg-white border border-zinc-150 p-4 rounded-xl flex items-start gap-3 shadow-sm hover:translate-x-1 transition-transform">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">✓</span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-800">Procesador Ryzen 3</h4>
                  <p className="text-xs text-zinc-500 mt-1">Multiplica por 3 la velocidad con arquitectura Zen de la Serie 7000.</p>
                </div>
              </div>
              <div className="bg-white border border-zinc-150 p-4 rounded-xl flex items-start gap-3 shadow-sm hover:translate-x-1 transition-transform">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">✓</span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-800 font-sans">Batería Prolongada</h4>
                  <p className="text-xs text-zinc-500 mt-1">Trabaja o estudia todo el día en Shushufindi sin cargador molesto.</p>
                </div>
              </div>
              <div className="bg-white border border-zinc-150 p-4 rounded-xl flex items-start gap-3 shadow-sm hover:translate-x-1 transition-transform">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">✓</span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-805 font-sans">Garantía Asegurada</h4>
                  <p className="text-xs text-zinc-500 mt-1">Respaldo directo de Digital Tech y soporte posventa humano.</p>
                </div>
              </div>
            </div>

            {/* Middle Real Generated Product Image */}
            <div className="lg:col-span-8 order-1 lg:order-2 text-center relative group">
              <div className="absolute inset-0 bg-blue-500/5 rounded-3xl filter blur-2xl group-hover:scale-105 transition-transform duration-700"></div>
              <img
                src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop"
                alt="Lenovo IdeaPad Slim 3"
                referrerPolicy="no-referrer"
                className="relative rounded-3xl border border-zinc-200 shadow-xl mx-auto w-full max-w-2xl bg-white transform group-hover:scale-[1.01] transition-transform duration-500"
              />
              <p className="text-[10px] text-zinc-400 mt-3 italic">
                Imagen real de exhibición: Lenovo IdeaPad Slim 3 con procesador AMD Ryzen 3 y diseño ultra estilizado.
              </p>
            </div>
          </div>

          {/* Action CTA Block */}
          <div className="text-center pt-4">
            <button
              onClick={() => handleOpenCheckout(469, "Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000", "lenovo-slim3")}
              className="w-full sm:w-auto text-sm md:text-base font-black px-10 py-5 bg-blue-600 hover:bg-blue-750 text-white rounded-2xl shadow-xl shadow-blue-500/15 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center gap-3"
              id="heroUpgradeButton"
            >
              🔒 SÍ, QUIERO MI LENOVO IDEAPAD SLIM 3 POR SOLO ${469}
            </button>
            <div className="flex items-center justify-center gap-6 mt-4.5 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-blue-600" /> Garantía de Satisfacción</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-blue-600" /> Envío seguro prioritario</span>
            </div>
          </div>
        </div>
      </header>

      {/* BLOCK 2: INTRODUCCIÓN — EL PROBLEMA (LIGHT BACKGROUND SHADE-1) */}
      <section className="bg-zinc-50 text-zinc-950 py-16 md:py-24 border-b border-zinc-200" id="problema">
        <div className="max-w-4xl mx-auto px-6 space-y-8 md:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-red-500 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              DIAGNÓSTICO EN FRÍO
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-snug">
              Seamos honestos por un momento.
            </h2>
            <div className="w-12 h-1 bg-red-400 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Editorial copy with spacious margins */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-zinc-200/70 shadow-xs space-y-6 md:space-y-7 text-sm md:text-base text-zinc-700 leading-relaxed max-w-3xl mx-auto">
            <p className="font-semibold text-zinc-900 text-base md:text-lg">
              Hay una frustración silenciosa que millones de personas viven todos los días y casi nadie habla de ella abiertamente.
            </p>
            <p>
              Es ese preciso momento en que abres tu computadora y... <strong className="text-zinc-900">esperas</strong>. Y esperas. Y sigues esperando. La pantalla parpadea, el ventilador suena como un avión de pasajeros a punto de despegar, y tú, mientras tanto, pierdes minutos preciosos que jamás vas a recuperar.
            </p>
            <p>
              O tal vez no tienes computadora propia y dependes totalmente de la de un familiar, de la de la universidad, o peor aún, de un cibercafé cercano donde trabajas con el reloj en contra, sin privacidad y pagando por hora.
            </p>
            <p className="font-bold text-zinc-800 italic bg-red-50/40 p-4 rounded-xl border-l-4 border-red-400">
              ¿Te suena familiar alguna de estas situaciones?
            </p>
            <p>
              Estás estudiando para un examen importante y tu máquina se congela justo antes de guardar el trabajo. Tienes una entrega para un cliente a las 11 de la noche y la máquina colapsa sin aviso. Quieres aprender una habilidad nueva, tomar un curso en línea, armar tu propio negocio digital, y simplemente no tienes el equipamiento básico para hacerlo.
            </p>
            <p className="font-semibold text-zinc-900">
              Y lo más doloroso no es la computadora lenta en sí misma. Lo más doloroso es lo que eso te cuesta de verdad: tiempo de vida que no vuelve, oportunidades que pasan de largo, proyectos que no terminan y sueños que se posponen semana tras semana.
            </p>
            <p>
              La falta de una buena herramienta de trabajo no es un problema pequeño. Es uno de los obstáculos más silenciosos y devastadores para quien quiere crecer, estudiar, emprender o progresar desde cualquier lugar.
            </p>
            <p>
              Y lo peor es que muchos se resignan pensando que una laptop de calidad está fuera de su alcance económico tradicional.
            </p>
            <p className="text-center font-extrabold text-emerald-600 text-lg md:text-xl pt-2">
              Hoy todo eso cambia.
            </p>
          </div>

          {/* Interactive Poll / Quiz component to check wastage */}
          <div className="pt-4">
            <ProblemQuiz />
          </div>
        </div>
      </section>

      {/* BLOCK 3: HISTORIA Y CONEXIÓN EMOCIONAL (CLEAN WHITE) */}
      <section className="bg-white text-zinc-950 py-16 md:py-24 border-b border-zinc-200" id="historias">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              PROTAGONISTAS REALES
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-snug">
              ¿Quiénes son los que están usando Laptops Tech Pro?
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm mt-2">
              Personas con enormes ganas de brillar, que decidieron dejar atrás las limitaciones técnicas y tomar el control.
            </p>
          </div>

          {/* Interactive Tabs Section */}
          <StorySection />
        </div>
      </section>

      {/* BLOCK 4: PRESENTACIÓN DE LA SOLUCIÓN (DARK THEMATIC HIGH CONTRAST) */}
      <section className="bg-zinc-950 text-white py-16 md:py-24 border-b border-zinc-900" id="solucion">
        <div className="max-w-5xl mx-auto px-6 space-y-10 md:space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-emerald-400 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              HERRAMIENTA DEFINITIVA
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              Presentamos nuestras Laptops Tech Pro
            </h2>
            <p className="text-base md:text-lg text-zinc-300 font-medium">
              El equipo que necesitas para trabajar, estudiar y crecer sin límites, al precio más accesible del mercado.
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Solution Paragraphs with beautiful layouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-zinc-900 border border-zinc-800 p-6 md:p-10 rounded-3xl">
            <div className="space-y-5 text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
              <p className="font-bold text-zinc-100 text-lg">
                No es magia. No es un milagro tecnológico. Es la combinación perfecta entre rendimiento real, precio justo y respaldo integral.
              </p>
              <p>
                Nuestras laptops están diseñadas expresamente para el mundo real: para el estudiante que necesita entregar trabajos a tiempo, para el profesional que no puede permitirse que su herramienta falle, para el emprendedor que construye su futuro desde la pantalla y para cualquier persona que desea explorar el mundo digital sin complicaciones técnicas de por medio.
              </p>
              <p>
                Olvídate de computadoras baratas que se calientan excesivamente a los 20 minutos, de pantallas oscuras que fatigan la vista o de memorias RAM que colapsan al abrir tres pestañas. Con una Laptop Tech Pro tienes una máquina lista para responder y apoyarte.
              </p>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-[13px] text-emerald-400 font-semibold leading-normal">
                  Y a diferencia de otras opciones comerciales, no tendrás que hipotecar tu futuro para pagarla. Por <strong className="text-zinc-100">solo $469</strong> tienes acceso a tecnología robusta desde el primer encendido.
                </p>
              </div>
            </div>

            <div className="relative group text-center">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl filter blur-xl"></div>
              <img
                src="/src/assets/images/laptop_tech_pro_1780006066929.png"
                alt="Tech Pro Lateral Angle"
                referrerPolicy="no-referrer"
                className="relative rounded-2xl border border-zinc-800 shadow-xl mx-auto w-full max-w-sm transform group-hover:rotate-1 duration-500"
              />
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-zinc-905 border border-zinc-800 rounded-full text-[11px] text-zinc-300 font-semibold uppercase tracking-wider">
                  Chasis Sólido
                </span>
                <span className="px-3 py-1 bg-zinc-905 border border-zinc-800 rounded-full text-[11px] text-zinc-300 font-semibold uppercase tracking-wider">
                  Teclado Español
                </span>
                <span className="px-3 py-1 bg-zinc-905 border border-zinc-800 rounded-full text-[11px] text-zinc-300 font-semibold uppercase tracking-wider">
                  Intel/AMD Inside
                </span>
              </div>
            </div>
          </div>

          {/* Specs Hotspots interactive display */}
          <SpecsHotspots />
        </div>
      </section>

      {/* BLOCK 5: BENEFICIOS CLAVE (LIGHT BACKGROUND SHADE-2) */}
      <section className="bg-zinc-50 text-zinc-950 py-16 md:py-24 border-b border-zinc-205" id="beneficios">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              VALOR EXTRAORDINARIO
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-snug">
              Lo que realmente cambia en tu vida cuando tienes la laptop correcta:
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Clean Bento Columns for the 9 Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '1',
                title: 'Recuperas horas de tu día que antes perdías esperando.',
                text: 'Una laptop con excelente procesador y almacenamiento moderno arranca en segundos, no en minutos agotadores. Multiplicado por los 365 días del año, es tiempo de vida recuperado para tus prioridades.',
              },
              {
                num: '2',
                title: 'Trabajas o estudias desde cualquier lugar sin depender de nadie.',
                text: 'Ya no tienes que hacer filas exhaustivas en la biblioteca, mendigar el equipo de otro o pagar tarifas altas en ciber-cafés. Tu laptop viaja contigo para que mantengas tu ritmo bajo tus propias reglas.',
              },
              {
                num: '3',
                title: 'Presentas trabajos y proyectos con la calidad que de verdad mereces.',
                text: 'Una máquina ágil te permite enfocarte puramente en el contenido, no en pelear con el equipo lento. Tus reportes, tareas y videollamadas reflejarán una imagen impecable y sumamente profesional.',
              },
              {
                num: '4',
                title: 'Tienes la herramienta clave para aprender habilidades digitales.',
                text: 'Accede a cursos en línea, tutoriales estables, idiomas, programación o marketing digital sin bloqueos. El conocimiento libre de internet ya no tendrá la fricción de una mala máquina.',
              },
              {
                num: '5',
                title: 'Reduces el estrés y la ansiedad de las entregas urgentes.',
                text: 'Saber a ciencia cierta que tu laptop no va a congelarse a las 11 de la noche con un cliente esperando es un alivio total. Trabajas con seguridad permanente y en absoluta calma.',
              },
              {
                num: '6',
                title: 'Abres la puerta de inmediato a nuevas fuentes de ingresos.',
                text: 'Freelancing, e-commerce, trabajo internacional o consultorías — todo requiere un equipo fiable. Con tu laptop propia, las oportunidades dejan de ser lejanas para ser realidades de ingresos.',
              },
              {
                num: '7',
                title: 'Proteges tu inversión con una garantía real de 6 meses.',
                text: 'Tener soporte post-venta veloz y un compromiso total significa comprar con la tranquilidad de que estás totalmente cubierto por profesionales si surge cualquier anomalía técnica.',
              },
              {
                num: '8',
                title: 'Tu familia entera crece y se beneficia.',
                text: 'Los niños avanzan con sus materias, los adultos investigan o gestionan sus finanzas personales. Una laptop de alto rendimiento es un activo que promueve progreso general bajo el mismo techo.',
              },
              {
                num: '9',
                title: 'Te posicionas mucho mejor en el competitivo mercado laboral.',
                text: 'Contar con equipo impecable y agilidad digital te distingue y separa drásticamente de quienes aún sufren para acceder a la red por falta de herramientas básicas y eficientes.',
              }
            ].map((benefit) => (
              <div
                key={benefit.num}
                className="bg-white border border-zinc-200 rounded-2xl p-6.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 font-extrabold flex items-center justify-center text-sm mb-4 border border-emerald-500/10">
                    {benefit.num}
                  </span>
                  <h4 className="font-bold text-sm md:text-base text-zinc-900 tracking-tight leading-snug mb-3.5">
                    {benefit.title}
                  </h4>
                  <p className="text-zinc-650 text-xs md:text-xs leading-relaxed font-medium">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 6: ANTES VS DESPUÉS TRANSFORMACIÓN (CLEAN WHITE) */}
      <section className="bg-white text-zinc-950 py-16 md:py-24 border-b border-zinc-200" id="transformacion">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-indigo-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              EL CAMBIO RETADOR
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-snug">
              ¿Cómo se siente poseer la herramienta adecuada?
            </h2>
            <div className="w-12 h-1 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Interactive transformation module */}
          <Transformation />
        </div>
      </section>

      {/* BLOCK 7: SOCIAL PROOF / TESTIMONIALS (LIGHT GREY SHADE-1) */}
      <section className="bg-zinc-50 text-zinc-950 py-16 md:py-24 border-b border-zinc-200" id="testimonios">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              CONFIANZA COMPARTIDA
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-snug">
              &ldquo;No pensé que $469 pudieran cambiar tanto mi día a día&rdquo;
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Customer grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[
              {
                quote: "Soy estudiante de administración y llevaba dos años usando la laptop de mi hermana, coordinando horarios con ella para poder avanzar con mis trabajos. Cuando por fin compré mi propia laptop aquí, sentí que por primera vez el tiempo era completamente mío. Rápida, cómoda, sin fallas. La recomiendo al 100% y la garantía de 6 meses me dio mucha confianza para dar el paso.",
                name: "Mariana G.",
                age: 23,
                role: "Estudiante universitaria",
                initial: "M",
                region: "CDMX"
              },
              {
                quote: "Vendo por Instagram y necesito estar pendiente de mensajes, editar fotos, revisar mis cuentas y a veces hasta hacer videollamadas con proveedores. Mi laptop anterior se calentaba tanto que me daba miedo dejarla encendida. Esta nueva es una bestia tranquila: hace todo lo que le pido, se mantiene fresca y la batería me dura lo suficiente para trabajar fuera de casa. Fue la mejor inversión que hice para mi negocio este año.",
                name: "Sofía R.",
                age: 28,
                role: "Emprendedora digital",
                initial: "S",
                region: "Querétaro"
              },
              {
                quote: "Trabajo con Excel todo el día, tengo archivos de contabilidad bastante grandes y necesito que todo funcione sin sorpresas. Antes tenía una laptop que tardaba casi tres minutos en abrir un libro de cuentas complejo. Ahora eso es historia. Además el soporte post-venta fue impecable cuando tuve una duda técnica de configuración al inicio. Muy recomendado para profesionales.",
                name: "Daniel M.",
                age: 35,
                role: "Contador independiente",
                initial: "D",
                region: "Guadalajara"
              },
              {
                quote: "Pensé mucho antes de comprarla porque $469 no es poco dinero, pero cuando hice las cuentas de lo que pagaba mensualmente entre el ciber local y las reparaciones de mi equipo viejo defectuoso, me di cuenta de que era la decisión más inteligente. Mi hijo entrega sus tareas escolares a tiempo y yo puedo trabajar en mi turno de noche de manera cómoda. La garantía es real.",
                name: "Rosa M.",
                age: 42,
                role: "Madre y trabajadora administrativa",
                initial: "R",
                region: "Puebla"
              },
              {
                quote: "Llevaba meses buscando un puesto laboral de trabajo remoto pero no tenía equipo propio óptimo para la prueba técnica de código ni para las entrevistas virtuales fluidas por webcam. Compré esta laptop y a las dos semanas aprobé mi primer contrato junior. El equipo es sumamente fluido, la cámara web integrada enfoca bien y el audio integrado es muy claro.",
                name: "Roberto V.",
                age: 31,
                role: "Desarrollador freelance junior",
                initial: "R",
                region: "Bogotá"
              }
            ].map((review, i) => (
              <div 
                key={i} 
                className="bg-white border border-zinc-200 p-6 rounded-2xl flex flex-col justify-between shadow-3xs"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <StarRating count={5} />
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Compra Verificada
                    </span>
                  </div>
                  <p className="text-zinc-700 font-medium text-xs md:text-[13px] leading-relaxed italic mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-zinc-100 pt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {review.initial}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-900">{review.name}, {review.age} años</h5>
                    <p className="text-[10px] text-zinc-500 font-semibold">{review.role} · {review.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 8: GARANTÍA SIN RIESGO (LIGHT BLUE CORPORATE THEME) */}
      <section className="bg-gradient-to-br from-indigo-50/40 via-blue-50/30 to-white text-zinc-900 py-16 border-y border-zinc-200" id="garantia">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-105 border border-blue-200 text-blue-600 flex items-center justify-center text-2xl mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8 text-blue-700" />
          </div>

          <span className="text-blue-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
            CERO RIESGOS TOTALMENTE CERTIFICADO
          </span>

          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-snug max-w-2xl mx-auto">
            Tu inversión está protegida el 100% — sin letras pequeñas y sin excusas.
          </h2>

          <div className="max-w-2xl mx-auto text-sm text-zinc-650 leading-relaxed space-y-4 font-sans font-medium">
            <p>
              Estamos tan absolutamente seguros de la calidad estructural de nuestros equipos que respaldamos cada laptop que sale con una <strong className="text-blue-700 font-bold">garantía total de 6 meses</strong>.
            </p>
            <p>
              ¿Qué significa esto para ti en términos prácticos? Significa que si tu equipo presenta alguna anomalía de fabricación o falla técnica imprevista dentro de los primeros 6 meses, nos hacemos responsables. Sin dolores de cabeza, sin burocracia, ni cartas eternas.
            </p>
            <p className="text-zinc-800 font-semibold">
              Creemos firmemente que cuando alguien nos confía su dinero, la menor forma de honrar esa confianza es con un respaldo honesto, humano y contundente. Compra hoy con tranquilidad total.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs text-zinc-500 font-sans font-bold">
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-600" /> Cobertura total de fallas</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-600" /> Recambio sin coste extra</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-600" /> Soporte humano directo</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE INVITACIÓN AL CATÁLOGO (PREMIUM LIGHT PREVIEW) */}
      <section className="bg-gradient-to-br from-blue-50/40 via-indigo-50/20 to-white py-16 border-y border-zinc-200" id="catalogo">
        <div className="max-w-6xl mx-auto px-6 font-sans">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="bg-blue-150 text-blue-700 border border-blue-200 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
              NUEVAS INTEGRACIONES DE STOCK
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
              ¿Por qué conformarte con una sola opción?
            </h2>
            <p className="text-sm text-zinc-650">
              Explora nuestro stock tecnológico completo ingresando a cada categoría. Actualizamos precios y stock real al minuto con flete seguro nacional.
            </p>
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { label: "Laptops", icon: "💻", cat: "laptops", desc: "Equipos de alto rendimiento" },
              { label: "CPUs / Desktops", icon: "🖥️", cat: "cpus", desc: "Computadores de oficina y gaming" },
              { label: "Celulares", icon: "📱", cat: "celulares", desc: "Equipos homologados" },
              { label: "Impresoras", icon: "🖨️", cat: "impresoras", desc: "Inyección y láser" },
              { label: "Televisores", icon: "📺", cat: "televisores", desc: "Smart TVs 4K" },
              { label: "Proyectores", icon: "🎥", cat: "proyectores", desc: "Luz LED y alta gama" }
            ].map((item, id) => (
              <button
                key={id}
                onClick={() => {
                  setCurrentView('catalogo');
                  setSelectedCatalogCategory(item.cat);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-zinc-150 hover:border-blue-300 p-5 rounded-2xl text-center shadow-xs hover:shadow-md cursor-pointer transition-all group flex flex-col items-center justify-between"
              >
                <div className="text-3xl mb-3 duration-350 group-hover:scale-115 transform inline-block">{item.icon}</div>
                <div>
                  <h4 className="font-extrabold text-xs text-zinc-850 group-hover:text-blue-600 tracking-tight">{item.label}</h4>
                  <p className="text-[9px] text-zinc-450 mt-1 leading-snug">{item.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 mt-3 inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver stock →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 9: INVERSIÓN Y PRECIOS + ESCUELA DE COMPRA (WHITE) */}
      <section className="bg-white text-zinc-950 py-16 md:py-24 border-b border-zinc-200" id="precios font-sans">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              TRANSPARENCIA ECONÓMICA EN NÚMEROS
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
              Hablemos de dinero con total transparencia
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            {/* Perspective details */}
            <div className="lg:col-span-7 space-y-5 text-sm md:text-base text-zinc-650 leading-relaxed font-sans">
              <p>
                Una laptop similar en una tienda departamental internacional puede costarte fácilmente entre $800 y $1,500 dólares. Eso representa para muchos meses enteros de ahorro doméstico o una deuda pesada que agota.
              </p>
              <p className="font-bold text-zinc-900">
                Laptops Tech Pro están disponibles hoy a solo $469 USD — un precio de importador de fábrica que hace posible que cualquier estudiante o profesional logre equipamiento sin asfixiar la economía del hogar.
              </p>
              <p>
                Pongamos esa cifra en perspectiva real: $469 es de hecho el costo de 3 a 4 meses de suscripciones y gastos innecesarios que dejas ir sin pensarlo. Es una fracción diminuta de lo que pagarías en reparaciones reiteradas y lentitud durante los siguientes meses si postergas esta decisión.
              </p>
              <div className="p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                <p className="text-xs md:text-sm text-emerald-800 font-semibold italic">
                  👉 Dividido en 365 días, estás hablando de menos de <strong className="text-emerald-650">$1.30 USD por día</strong> para poseer un activo de trabajo de alto calibre funcionando las 24 horas del día.
                </p>
              </div>
            </div>

            {/* Optimized High Converting Checkout Card Box */}
            <div className="lg:col-span-5 bg-zinc-950 text-white rounded-3xl p-6.5 border border-zinc-900 shadow-2xl space-y-6 relative overflow-hidden">
              {/* Urgent badges */}
              <div className="absolute top-0 right-0 bg-red-500 text-white font-bold text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider animate-pulse">
                ¡Stock Limitado!
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest">
                  Oferta Exclusiva Regular
                </p>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-4xl font-black text-white tracking-tight">$469</span>
                  <span className="text-zinc-500 line-through text-sm font-bold">$799 USD</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium">Lote de aduanas con despacho express seguro.</p>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl space-y-2 text-xs">
                <p className="font-bold text-zinc-200 flex justify-between items-center font-sans">
                  <span>Disponibles en lote:</span>
                  <span className="text-red-400 font-mono font-black animate-pulse">{stock} laptops</span>
                </p>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-400 h-full transition-all duration-1000" style={{ width: `${(stock / 10) * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal">
                  No garantizamos el stock de $469 una vez cerrado el temporizador.
                </p>
              </div>

              <button
                onClick={() => handleOpenCheckout()}
                className="w-full font-black py-4 bg-emerald-500 hover:bg-emerald-600 text-black text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
                id="pricingBoxSubmitButton"
              >
                🔒 SÍ, QUIERO COMPRAR MI EQUIPO AHORA
              </button>

              <div className="space-y-2 text-[10px] text-zinc-400 font-sans border-t border-zinc-900 pt-4 leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Garantía incondicional de 6 meses incluida.
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Método de pago encriptado seguro certificado.
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Garantía de rembolso integral por flete.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 10: FAQ SECCIÓN (LIGHT BG SHADE-1) */}
      <section className="bg-zinc-50 text-zinc-950 py-16 md:py-24 border-b border-zinc-200" id="faq">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              RESPUESTAS SINCERAS
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-snug">
              Preguntas Frecuentes resueltas sin tecnicismos
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <FAQ />
        </div>
      </section>

      {/* BLOCK 11: FINAL COMPREHENSIVE CTA */}
      <section className="bg-gradient-to-br from-indigo-50/40 via-blue-50/20 to-white text-zinc-900 py-16 md:py-24 border-y border-zinc-200 text-center" id="final-cta">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="max-w-2xl mx-auto space-y-3 font-sans">
            <span className="text-blue-600 font-extrabold tracking-widest text-[11px] md:text-xs uppercase block">
              EL MOMENTO DE ACTUAR ES HOY
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
              Llegaste hasta aquí porque algo en ti sabe que es el momento correcto.
            </h2>
          </div>

          <div className="max-w-2xl mx-auto text-sm md:text-base text-zinc-600 leading-relaxed font-sans space-y-4">
            <p>
              El momento de dejar de depender de computadoras prestadas o de vivir retrasado en un ciber. El momento de enterrar el dolor de cabeza constante de que tu vieja máquina se congele a la mitad de tus entregas. El momento de avanzar con velocidad.
            </p>
            <p className="text-zinc-900 font-bold">
              Tu Lenovo IdeaPad Slim 3 te espera con flete seguro prioritario, 6 meses de garantía total postventa y soporte técnico veloz.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => handleOpenCheckout(469, "Lenovo IdeaPad Slim 3 Ryzen 3 / Serie 7000", "lenovo-slim3")}
              className="w-full sm:w-auto font-black px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base rounded-2xl shadow-xl shadow-blue-500/10 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center gap-3"
              id="finalCallToActionButton"
            >
              🔒 SÍ, QUIERO MI LENOVO IDEAPAD SLIM 3 POR SOLO ${469}
            </button>
            <p className="text-[11px] text-zinc-500 mt-3 font-sans uppercase tracking-widest">
              Haz clic ahora — stock limitado al precio actual de importación
            </p>
          </div>

          {/* Checkout assurances footer badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-zinc-200 text-xs text-zinc-500 font-bold font-sans">
            <span>🛡️ Pago encriptado seguro</span>
            <span>·</span>
            <span>🚚 Despacho a domicilio garantizado</span>
            <span>·</span>
            <span>🤝 6 meses de garantía sin rollos</span>
          </div>
        </div>
      </section>
        </>
      ) : (
        /* DEDICATED CATALOG VIEW PAGE WITH EDITING STOCK MANAGER (CERTAIN TO COMPENSATE ALL CRITERIA) */
        <main className={`min-h-screen ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-950'} py-12 transition-colors duration-200 font-sans`}>
          <div className="max-w-6xl mx-auto px-6 space-y-8">
            {/* Breadcrumb row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
                🏠 Inicio &gt; Catálogo Digital Tech &gt; <span className="text-blue-600 underline font-black">{selectedCatalogCategory}</span>
              </div>
              
              {/* Theme toggle switch widget */}
              <div className="flex items-center gap-3 bg-white border border-zinc-200 py-1.5 px-3 rounded-full shadow-2xs text-zinc-900">
                <span className="text-[10px] uppercase font-extrabold text-zinc-505 font-sans">Tema Visual:</span>
                <button
                  onClick={() => setIsDarkMode(false)}
                  className={`px-2 py-1 rounded-md text-[10px] font-black cursor-pointer transition-all ${!isDarkMode ? 'bg-blue-650 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
                >
                  ☀️ Claro
                </button>
                <button
                  onClick={() => setIsDarkMode(true)}
                  className={`px-2 py-1 rounded-md text-[10px] font-black cursor-pointer transition-all ${isDarkMode ? 'bg-zinc-800 text-white' : 'text-zinc-650 hover:bg-zinc-100'}`}
                >
                  🌙 Oscuro
                </button>
              </div>
            </div>

            {/* Core Grid: Sidebar + Products List Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Category selector panel on the left (Sidebar) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white text-zinc-900 border border-zinc-200 p-5 rounded-2xl shadow-xs">
                  <h3 className="font-extrabold text-xs text-zinc-850 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3 font-sans">
                    Categorías de Equipos
                  </h3>
                  <div className="flex flex-col gap-1 text-xs font-sans">
                    {[
                      { key: 'todos', label: 'Todos los Equipos', icon: '📦' },
                      { key: 'laptops', label: 'Laptops', icon: '💻' },
                      { key: 'cpus', label: 'CPUs / Escritorio', icon: '🖥️' },
                      { key: 'celulares', label: 'Celulares', icon: '📱' },
                      { key: 'impresoras', label: 'Impresoras', icon: '🖨️' },
                      { key: 'televisores', label: 'Televisores', icon: '📺' },
                      { key: 'proyectores', label: 'Proyectores', icon: '🎥' }
                    ].map((cat) => {
                      const count = pCount => pCount.key === 'todos' 
                        ? products.length 
                        : products.filter(p => p.category === pCount.key).length;
                      const c = count(cat);
                      return (
                        <button
                          key={cat.key}
                          onClick={() => setSelectedCatalogCategory(cat.key)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center justify-between cursor-pointer ${
                            selectedCatalogCategory === cat.key
                              ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                              : 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
                          }`}
                        >
                          <span>{cat.icon} {cat.label}</span>
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${
                            selectedCatalogCategory === cat.key ? 'bg-white/25 text-white' : 'bg-zinc-150 text-zinc-750'
                          }`}>
                            {c}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Help Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-md space-y-3 font-sans">
                  <h4 className="font-extrabold text-xs uppercase tracking-widest">¿Necesitas ayuda inmediata?</h4>
                  <p className="text-[11px] leading-relaxed opacity-95">
                    Escríbenos directamente y un asesor te ayudará a elegir el computador ideal para tu presupuesto.
                  </p>
                  <a
                    href="https://wa.me/593984729888?text=Hola%20Digital%20Tech%2C%20necesito%20ayuda%20para%20elegir%20un%20equipo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-emerald-500 hover:bg-emerald-600 text-black text-center font-black text-xs uppercase py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    💬 Chat +593 984729888
                  </a>
                </div>
              </div>

              {/* Main Content View Container */}
              <div className="lg:col-span-9 space-y-8">
                {/* 🛠️ Dynamic Admin Control Panel ("Actualizar Todos los Equipos") */}
                <div className="bg-white border border-blue-200 text-zinc-900 rounded-2xl p-6 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3 font-sans">
                    <div>
                      <span className="bg-blue-105 text-blue-700 font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                        Panel Administrativo de Stock
                      </span>
                      <h3 className="font-black text-base text-zinc-900 mt-1">
                        Actualizar Todos los Equipos
                      </h3>
                      <p className="text-[11px] text-zinc-500">
                        Inserta nuevos productos o actualiza los precios y stock real al minuto para toda la tienda.
                      </p>
                    </div>
                    
                    {/* Select tool to edit */}
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-zinc-500">Editar equipo:</span>
                      <select
                        onChange={(e) => handleSelectProductToEdit(e.target.value)}
                        className="bg-zinc-50 border border-zinc-200 text-xs font-bold py-2 px-3 rounded-lg text-zinc-800"
                        value={editingProductId || 'new'}
                      >
                        <option value="new">➕ Agregar nuevo equipo al stock</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>💻 {p.category.toUpperCase()}: {p.name} (${p.price})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Form fields layout */}
                  <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 font-sans text-zinc-900">
                    <div className="lg:col-span-6 space-y-1">
                      <label className="text-[10px] uppercase font-black text-zinc-500 block">Nombre del Equipo</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ej. Lenovo Ideapad Slim 3 Ryzen 3"
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs py-2 px-3 rounded-xl hover:bg-zinc-100/50 focus:bg-white transition-all text-zinc-850 font-bold"
                        required
                      />
                    </div>

                    <div className="lg:col-span-3 space-y-1">
                      <label className="text-[10px] uppercase font-black text-zinc-500 block">Precio (USD)</label>
                      <input
                        type="number"
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs py-2 px-3 rounded-xl hover:bg-zinc-100/50 focus:bg-white transition-all text-zinc-850 font-bold"
                        required
                      />
                    </div>

                    <div className="lg:col-span-3 space-y-1">
                      <label className="text-[10px] uppercase font-black text-zinc-500 block">Categoría de Menú</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs py-2 px-3 rounded-xl text-zinc-850 font-bold"
                      >
                        <option value="laptops">Laptops</option>
                        <option value="cpus text-sans">CPUs / Escritorio</option>
                        <option value="celulares">Celulares</option>
                        <option value="impresoras">Impresoras</option>
                        <option value="televisores">Televisores</option>
                        <option value="proyectores">Proyectores</option>
                      </select>
                    </div>

                    <div className="lg:col-span-8 space-y-1">
                      <label className="text-[10px] uppercase font-black text-zinc-500 block">Especificaciones Técnicas (Una por línea)</label>
                      <textarea
                        value={formSpecs}
                        onChange={(e) => setFormSpecs(e.target.value)}
                        placeholder="AMD Ryzen 3&#13;8GB RAM LPDDR5&#13;512GB SSD PCIe"
                        rows={3}
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs py-2 px-3 rounded-xl hover:bg-zinc-100/50 focus:bg-white transition-all text-zinc-700"
                      />
                    </div>

                    <div className="lg:col-span-4 space-y-1">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-zinc-500 block">Unidades Disponibles (Stock)</label>
                        <input
                          type="number"
                          value={formStock}
                          onChange={(e) => setFormStock(Number(e.target.value))}
                          className="w-full bg-zinc-50 border border-zinc-200 text-xs py-2 px-3 rounded-xl hover:bg-zinc-100/50 focus:bg-white transition-all text-zinc-850 font-bold"
                        />
                      </div>
                      <div className="space-y-1 pt-1">
                        <label className="text-[10px] uppercase font-black text-zinc-500 block">Precio de Lista Original (USD)</label>
                        <input
                          type="number"
                          value={formOriginalPrice}
                          onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                          className="w-full bg-zinc-50 border border-zinc-200 text-xs py-1.5 px-3 rounded-xl hover:bg-zinc-100/50 focus:bg-white transition-all text-zinc-850 font-bold animate-none"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-9 space-y-1">
                      <label className="text-[10px] uppercase font-black text-zinc-500 block">Enlace de Imagen de Referencia</label>
                      <input
                        type="url"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs py-2 px-3 rounded-xl hover:bg-zinc-100/50 focus:bg-white transition-all text-zinc-600"
                      />
                    </div>

                    <div className="lg:col-span-3 flex items-end">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase py-3.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {editingProductId === 'new' ? '➕ Publicar Equipo' : '💾 Guardar Cambios'}
                      </button>
                    </div>
                  </form>

                  {/* Status indicator message */}
                  {adminStatus && (
                    <div className="bg-amber-50 text-amber-805 font-bold text-xs p-3.5 rounded-xl border border-amber-200 flex items-center justify-between">
                      <span>⚡ {adminStatus}</span>
                      <button onClick={() => setAdminStatus('')} className="text-[10px] hover:text-black font-black uppercase text-amber-900 cursor-pointer">Cerrar</button>
                    </div>
                  )}
                </div>

                {/* Catalog Headline info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
                  <div>
                    <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-950'} uppercase tracking-tight`}>
                      Inventario Disponible: {selectedCatalogCategory.toUpperCase()}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed animate-none">
                      Mostrando {
                        (selectedCatalogCategory === 'todos'
                          ? products
                          : products.filter(p => p.category === selectedCatalogCategory)
                        ).length
                      } computadores y dispositivos importados legalmente en Ecuador.
                    </p>
                  </div>
                </div>

                {/* Products Cards Grid container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                  {(selectedCatalogCategory === 'todos'
                    ? products
                    : products.filter(p => p.category === selectedCatalogCategory)
                  ).map((p) => {
                    const originalPriceValue = p.originalPrice || Math.floor(p.price * 1.5);
                    return (
                      <div
                        key={p.id}
                        className={`bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
                      >
                        <div>
                          {/* Category and Stock alerts */}
                          <div className="relative h-48 bg-zinc-50 overflow-hidden border-b border-zinc-100 flex items-center justify-center">
                            <span className="absolute top-2.5 left-2.5 bg-blue-600 text-white font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {p.category}
                            </span>
                            
                            {p.stock && p.stock <= 4 ? (
                              <span className="absolute top-2.5 right-2.5 bg-red-100 border border-red-200 text-red-750 font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wide animate-pulse">
                                ⏳ ¡Solo {p.stock} libres!
                              </span>
                            ) : (
                              <span className="absolute top-2.5 right-2.5 bg-emerald-100 text-emerald-850 font-bold text-[9px] px-2.5 py-1 rounded-full uppercase">
                                ✓ Stock Garantizado
                              </span>
                            )}

                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="object-contain h-36 w-full p-4 hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="p-5 space-y-3.5">
                            <h4 className="font-extrabold text-xs text-zinc-900 leading-snug tracking-tight">
                              {p.name}
                            </h4>

                            <div className="space-y-1 font-sans">
                              {p.specs && p.specs.map((spec, sIdx) => (
                                <div key={sIdx} className="text-[11px] text-zinc-550 font-semibold flex items-center gap-1.5 leading-snug">
                                  <span className="text-blue-500 text-[10px] font-bold shrink-0">✓</span>
                                  {spec}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 border-t border-zinc-100 mt-2 space-y-4 text-zinc-900">
                          {/* Pricing layout */}
                          <div className="flex items-baseline justify-between pt-3">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-black text-blue-750 font-mono tracking-tight">${p.price}</span>
                              <span className="text-[11px] text-zinc-400 line-through font-bold">${originalPriceValue}</span>
                            </div>
                            <span className="bg-rose-50 border border-rose-100 text-rose-600 font-black text-[9px] px-2.5 py-0.5 rounded-lg uppercase">
                              Ahorra ${(originalPriceValue - p.price)}
                            </span>
                          </div>

                          {/* Contact CTA buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href={`https://wa.me/593984729888?text=Hola%20Digital%20Tech%2C%20deseo%20adquirir%20el%20equipo%3A%20${encodeURIComponent(p.name)}%20al%20precio%20de%20%24${p.price}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-zinc-200 text-center hover:bg-zinc-50 hover:border-blue-300 text-zinc-850 font-extrabold py-3.5 text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              💬 WhatsApp
                            </a>
                            <button
                              onClick={() => handleOpenCheckout(p.price, p.name, p.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
                            >
                              ⚡ Adquirir Ya
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-zinc-650 py-10 text-xs border-t border-zinc-90 w-full text-center font-sans tracking-wide space-y-2">
        <p className="font-semibold text-zinc-500">Digital Tech Ecuador © {new Date().getFullYear()} — Todos los derechos reservados.</p>
        <p className="max-w-2xl mx-auto px-4 text-[10px] text-zinc-600 leading-normal">
          Nuestras laptops están protegidas bajo regulaciones de importación oficiales secundadas por la póliza de garantía de Digital Tech. Este portal representa una landing page directa para fomento de conversión prioritaria de inventario vigente.
        </p>
      </footer>

      {/* FLOAT STICKY BOTTOM DE CONVERSIÓN EXCELENTE (BOOST SALES RATIO) */}
      <AnimatePresence>
        {scrolledPastHero && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-0 inset-x-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-850 px-5 py-4 z-40 hidden sm:flex items-center justify-between shadow-2xl"
            id="stickyBottomContainer"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/src/assets/images/laptop_tech_pro_1780006066929.png"
                  alt="Tech Pro Compact preview"
                  referrerPolicy="no-referrer"
                  className="w-12 h-8 rounded-lg border border-zinc-800 shrink-0"
                />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <h5 className="text-xs font-black text-white">Lenovo IdeaPad Slim 3 — $469 USD</h5>
                <p className="text-[10px] text-zinc-400 font-sans">Incluye garantía física completa & Envío Seguro</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* stock remaining banner inside bar */}
              <p className="text-[10px] text-red-400 font-bold tracking-widest uppercase animate-pulse">
                ⏳ ¡Quedan solo {stock} unidades!
              </p>
              <button
                onClick={() => handleOpenCheckout()}
                className="font-black px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black text-xs rounded-xl transition-all shadow-md cursor-pointer uppercase tracking-widest"
              >
                Comprar Ahora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CHAT AND WHATSAPP CONVERSION WIDGET */}
      <WhatsAppChat />

      {/* SECURE CHECKOUT MODAL FORM */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        price={checkoutPrice} 
        productTitle={checkoutProductTitle}
        productId={checkoutProductId}
      />
    </div>
  );
}
