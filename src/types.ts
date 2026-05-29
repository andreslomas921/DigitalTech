export interface Testimonial {
  name: string;
  age: number;
  role: string;
  text: string;
  title: string;
  rating: number;
  avatarLetter: string;
}

export interface SpecItem {
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  specs: string[];
  category: string;
  stock: number;
  featured?: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  discountTag: string;
  description: string;
  bundleProducts: string[];
  comboPrice: number;
  originalComboPrice: number;
  image: string;
}

export interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'transfer' | 'delivery';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  selectedProductId?: string;
  selectedProductTitle?: string;
  selectedProductPrice?: number;
}

