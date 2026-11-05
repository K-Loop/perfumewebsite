import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" 
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0b0d] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-serif tracking-[0.2em] uppercase text-white font-semibold">
                Shopping Bag
              </h2>
              <p className="text-[11px] text-neutral-400">
                {cart.reduce((count, item) => count + item.quantity, 0)} signature {cart.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-wider font-serif">Your bag is empty</p>
                  <p className="text-xs text-neutral-400 font-light max-w-xs">
                    Explore our signature fragrances to find your bespoke scent.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-[#d4af37] transition-colors cursor-pointer"
                >
                  Explore Scents
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 items-center justify-between"
                >
                  <img
                    src={item.bottleImage}
                    alt={item.name}
                    className="w-16 h-20 object-contain rounded-lg bg-black/40 p-1"
                  />

                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#d4af37] block">
                      {item.subheading}
                    </span>
                    <h3 className="text-sm font-serif text-white font-medium">
                      {item.name.includes("Discovery") ? item.name : `LUXARA ${item.name}`}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      {item.price}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center rounded-full border border-white/10 bg-black/40">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-[#d4af37] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono px-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-[#d4af37] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4 bg-black/60">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Complimentary Delivery</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Discovery Samples</span>
                <span className="text-[#d4af37]">2 Vials Included</span>
              </div>
              <div className="flex items-center justify-between text-sm font-serif pt-2 border-t border-white/10 text-white">
                <span>Subtotal</span>
                <span className="text-base font-mono font-semibold">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={() => alert(`Thank you for choosing LUXARA! Your order for ₹${totalAmount.toLocaleString('en-IN')} has been placed successfully.`)}
                className="w-full py-3.5 px-6 rounded-full bg-[#f6d87c] text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="text-[10px] text-center text-neutral-400 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Guaranteed Authenticity & Temperature-Controlled Shipping
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

