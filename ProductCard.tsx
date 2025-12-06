import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-kanso-50 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
        />
        
        {/* Minimal Add to Cart Overlay */}
        <div 
            className={`absolute inset-x-0 bottom-0 p-4 bg-white/10 backdrop-blur-md transition-opacity duration-300 flex justify-center ${
                isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
             <button
                onClick={() => onAddToCart(product)}
                className="text-white text-xs uppercase tracking-widest hover:text-white/80 transition-colors"
            >
                Quick Add
            </button>
        </div>

        {product.tags.includes('New') && (
           <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white mix-blend-difference">
             New
           </span>
        )}
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-sm md:text-base text-kanso-900 font-serif tracking-tight">
          {product.name}
        </h3>
        <p className="text-xs text-kanso-500 tracking-widest">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;