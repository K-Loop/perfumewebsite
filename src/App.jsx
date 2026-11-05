import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FragranceExperience from './components/FragranceExperience';
import FragranceSection from './components/FragranceSection';
import DiscoverySet from './components/DiscoverySet';
import OurStory from './components/OurStory';
import Ingredients from './components/Ingredients';
import ParallaxSection from './components/ParallaxSection';
import Collection from './components/Collection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FragranceModal from './components/FragranceModal';
import { FRAGRANCES } from './data/fragrances';

export default function App() {
  const [cart, setCart] = useState([
    {
      ...FRAGRANCES[0],
      quantity: 1
    }
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = (fragrance) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === fragrance.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === fragrance.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...fragrance, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleOpenDetails = (fragrance) => {
    setSelectedFragrance(fragrance);
    setModalOpen(true);
  };

  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#06030c] text-[#e0e0e0] font-sans selection:bg-[#f6d87c] selection:text-black">
      {/* 05. Minimal Luxury Navigation */}
      <Navbar 
        cartCount={totalCartCount} 
        onOpenCart={() => setCartOpen(true)} 
      />

      <main>
        {/* 01 to 04. HERO & SCROLL-DRIVEN 3D PERFUME PINNED EXPERIENCE */}
        <FragranceExperience
          onSelectFragrance={handleOpenDetails}
          onExploreCollection={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 06. SCENTS SHOWCASE SECTION */}
        <FragranceSection
          onAddToCart={handleAddToCart}
          onSelectFragrance={handleOpenDetails}
        />

        {/* 07. DISCOVERY SET & SAMPLE KITS (From Image 5) */}
        <DiscoverySet
          onAddToCart={handleAddToCart}
        />

        {/* 08. OUR STORY / HERITAGE */}
        <OurStory
          onOpenModal={() => handleOpenDetails(FRAGRANCES[0])}
        />

        {/* 09. FEATURES / CRAFTSMANSHIP */}
        <Ingredients />

        {/* 10. PARALLAX QUOTE SECTION */}
        <ParallaxSection />

        {/* 11. COMPLETE COLLECTION BOUTIQUE */}
        <Collection
          onAddToCart={handleAddToCart}
          onViewDetails={handleOpenDetails}
        />

        {/* 12. TESTIMONIALS */}
        <Testimonials />
      </main>

      {/* 13. FOOTER */}
      <Footer />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Fragrance Scent Architecture Modal */}
      <FragranceModal
        fragrance={selectedFragrance}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
