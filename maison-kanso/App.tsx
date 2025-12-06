import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';
import { Product, CartItem } from './types';
import { ArrowRight } from 'lucide-react';

// Maison Kanso - Interior Design Mock Data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kyoto Lounge Chair',
    price: 1250,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop',
    description: 'Low profile ash wood lounge chair with linen upholstery.',
    tags: ['New']
  },
  {
    id: '2',
    name: 'Wabi Sabi Ceramic Vase',
    price: 185,
    category: 'Objects',
    image: 'https://images.unsplash.com/photo-1612152605347-f93296cb657d?q=80&w=1000&auto=format&fit=crop',
    description: 'Hand-thrown stoneware with natural glazing imperfections.',
    tags: ['Artisan']
  },
  {
    id: '3',
    name: 'Akari Paper Floor Lamp',
    price: 420,
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1513506003011-3b3215099b83?q=80&w=1000&auto=format&fit=crop',
    description: 'Soft diffused light through washi paper structure.',
    tags: ['Bestseller']
  },
  {
    id: '4',
    name: 'Raw Linen Throw',
    price: 145,
    category: 'Textiles',
    image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1000&auto=format&fit=crop',
    description: 'Organic unadulterated linen in sand color.',
    tags: []
  },
];

const ARTICLES = [
    {
        title: "The Art of Imperfection",
        category: "Philosophy",
        image: "https://images.unsplash.com/photo-1599692994326-0e7d568c347b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Living with Natural Light",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Ceramics of the Earth",
        category: "Craft",
        image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Minimalist Spaces",
        category: "Interiors",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop"
    }
];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-kanso-900 bg-white">
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      <main>
        <Hero />

        {/* Featured Products - Grid */}
        <section id="shop" className="py-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-kanso-500">Curated Collection</span>
                <h2 className="font-serif text-3xl text-kanso-900">Objects for Living</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
              {MOCK_PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        </section>

        {/* Pure Elements Section (Vertical Imagery - Textures) */}
        <section className="py-20 lg:py-32 bg-kanso-50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="font-serif text-2xl md:text-3xl text-kanso-900">Materiality</h2>
                    <p className="text-sm text-kanso-500 mt-2">Honest materials that age with grace.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[80vh] md:h-[90vh]">
                    <div className="relative overflow-hidden group h-full">
                        <img 
                            src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 grayscale-[20%]"
                            alt="Wood"
                        />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                            <span className="text-white font-serif text-3xl italic">Wood</span>
                        </div>
                    </div>
                    <div className="relative overflow-hidden group h-full md:mt-16">
                         <img 
                            src="https://images.unsplash.com/photo-1594815467362-09855590c67e?q=80&w=1000&auto=format&fit=crop" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 grayscale-[20%]"
                            alt="Stone"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                            <span className="text-white font-serif text-3xl italic">Stone</span>
                        </div>
                    </div>
                    <div className="relative overflow-hidden group h-full">
                         <img 
                            src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1000&auto=format&fit=crop" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 grayscale-[20%]"
                            alt="Fabric"
                        />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                            <span className="text-white font-serif text-3xl italic">Fabric</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Text Loop / Philosophy */}
        <section className="py-24 border-b border-kanso-100">
             <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
                 <div className="flex-1 space-y-12">
                     <h2 className="text-xs uppercase tracking-[0.2em] text-kanso-500 mb-8">The Philosophy</h2>
                     <div className="space-y-8">
                        <div className="group cursor-default">
                            <h3 className="font-serif text-3xl md:text-5xl text-kanso-900 group-hover:text-kanso-600 transition-colors">Reduce</h3>
                            <p className="mt-2 text-sm text-kanso-500 max-w-sm">Eliminating the unnecessary to reveal the essence of the home.</p>
                        </div>
                         <div className="group cursor-default">
                            <h3 className="font-serif text-3xl md:text-5xl text-kanso-900 group-hover:text-kanso-600 transition-colors">Restore</h3>
                            <p className="mt-2 text-sm text-kanso-500 max-w-sm">Creating spaces that rejuvenate the spirit through calmness.</p>
                        </div>
                         <div className="group cursor-default">
                            <h3 className="font-serif text-3xl md:text-5xl text-kanso-900 group-hover:text-kanso-600 transition-colors">Reside</h3>
                            <p className="mt-2 text-sm text-kanso-500 max-w-sm">Living in harmony with your environment and objects.</p>
                        </div>
                     </div>
                 </div>
                 <div className="flex-1 w-full aspect-[3/4] bg-kanso-100 relative overflow-hidden">
                     <img 
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Interior Philosophy"
                     />
                 </div>
             </div>
        </section>

        {/* The Journal */}
        <section id="journal" className="py-32">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-kanso-900 mb-2">The Journal</h2>
                        <p className="text-xs uppercase tracking-[0.2em] text-kanso-500">Notes on Minimalist Living</p>
                    </div>
                    <a href="#" className="hidden md:block text-xs uppercase tracking-widest text-kanso-900 hover:text-kanso-500 transition-colors">View All</a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                    {ARTICLES.map((article, idx) => (
                        <article key={idx} className="group cursor-pointer space-y-6">
                            <div className="overflow-hidden aspect-[16/10] bg-kanso-50">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[10%]"
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[10px] uppercase tracking-widest text-kanso-500 border-b border-transparent group-hover:border-kanso-300 transition-colors inline-block pb-1">{article.category}</span>
                                <h3 className="font-serif text-xl md:text-3xl text-kanso-900 font-light">{article.title}</h3>
                            </div>
                        </article>
                    ))}
                </div>
                 <div className="mt-12 text-center md:hidden">
                    <a href="#" className="text-xs uppercase tracking-widest text-kanso-900 hover:text-kanso-500 transition-colors">View All</a>
                </div>
            </div>
        </section>

        {/* Minimal Newsletter */}
        <section className="py-32 bg-white border-t border-kanso-100">
            <div className="container mx-auto px-6 text-center max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.2em] text-kanso-500 mb-4 block">Newsletter</span>
                <h2 className="font-serif text-3xl md:text-4xl mb-8 text-kanso-900">Join the Circle</h2>
                <div className="relative group">
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        className="w-full bg-transparent border-b border-kanso-200 py-4 text-center text-base focus:outline-none focus:border-kanso-900 placeholder:text-kanso-300 transition-colors"
                    />
                    <button className="absolute right-0 top-0 bottom-0 text-kanso-400 group-hover:text-kanso-900 transition-colors">
                        <ArrowRight size={20} strokeWidth={1} />
                    </button>
                </div>
                <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-widest text-kanso-600">
                    <a href="#" className="hover:text-kanso-900 transition-colors">Shop</a>
                    <a href="#" className="hover:text-kanso-900 transition-colors">Philosophy</a>
                    <a href="#" className="hover:text-kanso-900 transition-colors">Journal</a>
                    <a href="#" className="hover:text-kanso-900 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-kanso-900 transition-colors">Pinterest</a>
                </div>
                <p className="mt-12 text-[10px] text-kanso-300">© 2024 Maison Kanso. Crafted in Light.</p>
            </div>
        </section>
      </main>
    </div>
  );
};

export default App;