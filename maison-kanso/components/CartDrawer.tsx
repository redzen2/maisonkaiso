import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-kanso-900/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-kanso-100">
          <h2 className="font-serif text-xl font-medium">Your Bag ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-kanso-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-kanso-400">
              <span className="text-6xl font-serif italic opacity-20">Empty</span>
              <p>Your shopping bag is empty.</p>
              <button onClick={onClose} className="text-kanso-900 underline underline-offset-4 hover:text-kanso-600">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-24 h-32 flex-shrink-0 bg-kanso-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium text-kanso-900 font-serif">{item.name}</h3>
                        <button onClick={() => onRemoveItem(item.id)} className="text-kanso-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <p className="text-sm text-kanso-500">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-kanso-200">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-2 hover:bg-kanso-50 text-kanso-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-2 hover:bg-kanso-50 text-kanso-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-medium text-kanso-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-kanso-100 bg-kanso-50/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-kanso-600">Subtotal</span>
              <span className="font-serif text-xl font-medium text-kanso-900">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-kanso-400 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
            <button className="w-full bg-kanso-900 text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-kanso-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
