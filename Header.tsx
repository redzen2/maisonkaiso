import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAI: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenAI }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm border-kanso-100 py-4'
            : 'bg-white border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-3 items-center">
          
          {/* Left: Menu Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-kanso-800 hover:text-kanso-500 transition-colors flex items-center gap-2 group"
            >
              <Menu size={20} strokeWidth={1.5} />
              <span className="hidden md:inline text-xs uppercase tracking-widest font-medium group-hover:underline underline-offset-4">Menu</span>
            </button>
            <button className="hidden md:block text-kanso-800 hover:text-kanso-500 transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="text-center">
            <a href="#" className="font-serif text-3xl md:text-4xl tracking-tight text-kanso-900">
              MAISON KANSO
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-6">
            <button 
                onClick={onOpenAI} 
                className="hidden md:flex items-center gap-2 text-kanso-600 hover:text-kanso-900 transition-colors text-xs uppercase tracking-widest font-medium"
            >
               <Sparkles size={16} strokeWidth={1.5} />
               <span>AI Stylist</span>
            </button>
            
            <button
              onClick={onOpenCart}
              className="text-kanso-800 hover:text-kanso-500 transition-colors relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-kanso-900 text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Drawer */}
      <div 
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="absolute top-6 right-6 md:top-8 md:right-12">
            <button onClick={() => setIsMenuOpen(false)} className="text-kanso-900 hover:rotate-90 transition-transform duration-500">
                <X size={32} strokeWidth={1} />
            </button>
        </div>

        <div className="h-full flex flex-col md:flex-row items-center justify-center container mx-auto p-6">
            <nav className="flex flex-col gap-6 md:gap-10 text-center">
                {['Shop All', 'New Arrivals', 'Furniture', 'Objects', 'Lighting', 'The Journal'].map((item, i) => (
                    <a 
                        key={item} 
                        href={`#${item.toLowerCase().replace(' ', '-')}`} 
                        onClick={() => setIsMenuOpen(false)}
                        className="font-serif text-3xl md:text-5xl text-kanso-900 hover:text-kanso-500 transition-colors duration-300 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        {item}
                    </a>
                ))}
            </nav>
            <div className="mt-12 md:mt-0 md:absolute md:bottom-12 md:left-12 text-center md:text-left">
                <button onClick={() => { setIsMenuOpen(false); onOpenAI(); }} className="flex items-center gap-2 text-kanso-600 hover:text-kanso-900 justify-center md:justify-start">
                    <Sparkles size={18} />
                    <span className="text-sm uppercase tracking-widest">Ask AI Stylist</span>
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;