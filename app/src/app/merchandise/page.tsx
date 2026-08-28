"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import { merchandiseData, formatRupiah } from "@/frontend/data/merchandise";
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  size?: string;
  quantity: number;
  image: string;
};

export default function MerchandisePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);

  const featuredItem = merchandiseData.find((m) => m.featured) || merchandiseData[0];
  const sideItems = merchandiseData.filter((m) => m.id !== featuredItem.id);

  const addToCart = (item: (typeof merchandiseData)[0]) => {
    /* Temporarily disabled for "Coming Soon"
    const size = item.sizes ? selectedSizes[item.id] || item.sizes[0] : undefined;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id && c.size === size);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id && c.size === size ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, size, quantity: 1, image: item.image },
      ];
    });
    */
    setAddedFeedback(item.id);
    setTimeout(() => setAddedFeedback(null), 1200);
  };

  const removeFromCart = (id: string, size?: string) => {
    setCart((prev) => prev.filter((c) => !(c.id === id && c.size === size)));
  };

  const updateQuantity = (id: string, size: string | undefined, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.id === id && c.size === size ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <main className="flex-1 relative z-0 bg-[#050505] text-white min-h-screen">
      <Navbar />

      {/* ===== HERO — EDITORIAL SHOWCASE (Like LABEL.COM reference) ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-blue-600/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-75 h-75 bg-cyan-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/3 right-1/4 w-75 h-75 bg-blue-500/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Brand Title — Large centered behind products */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-none text-white/4 whitespace-nowrap"
            >
              PRIME
            </motion.h1>
          </div>

          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-400/80">
              Official Merchandise — 2027
            </span>
          </motion.div>

          {/* Main Showcase Layout */}
          <div className="relative flex items-center justify-center min-h-[60vh]">
            {/* Left Side Products */}
            <div className="hidden lg:flex flex-col gap-16 absolute left-0 top-1/2 -translate-y-1/2 z-20">
              {sideItems.slice(0, 2).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
                  className="group relative cursor-pointer"
                  onClick={() => addToCart(item)}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                    }}
                    className="relative w-36 h-36 md:w-44 md:h-44"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain drop-shadow-[0_10px_40px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                  {/* Product Label */}
                  <div className="mt-3 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-white mt-1">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                  {/* Add feedback */}
                  <AnimatePresence>
                    {addedFeedback === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-400 whitespace-nowrap"
                      >
                        Coming Soon!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CENTER — Hero Product (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
                className="relative w-72 h-72 md:w-96 md:h-96 lg:w-md lg:h-112"
              >
                {/* Glow behind hero product */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[60px] scale-75" />
                <Image
                  src={featuredItem.image}
                  alt={featuredItem.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_60px_rgba(59,130,246,0.25)] relative z-10"
                />
              </motion.div>

              {/* Hero Product Info */}
              <div className="mt-8 text-center max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {featuredItem.name}
                </h2>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {featuredItem.description}
                </p>
                <p className="text-2xl md:text-3xl font-bold mt-4 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                  {formatRupiah(featuredItem.price)}
                </p>

                {/* Size Selector */}
                {featuredItem.sizes && (
                  <div className="flex justify-center gap-2 mt-5">
                    {featuredItem.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setSelectedSizes((prev) => ({ ...prev, [featuredItem.id]: s }))
                        }
                        className={`w-10 h-10 text-xs font-bold border transition-all duration-200 ${
                          (selectedSizes[featuredItem.id] || featuredItem.sizes![0]) === s
                            ? "border-blue-500 bg-blue-500/20 text-blue-400"
                            : "border-white/10 text-gray-500 hover:border-white/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => addToCart(featuredItem)}
                  className="mt-6 inline-flex items-center gap-3 px-8 py-3.5 font-bold text-sm uppercase tracking-wider text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "var(--gradient-brand-vivid)",
                    boxShadow: "var(--shadow-glow-blue)",
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedFeedback === featuredItem.id ? "Coming Soon!" : "Tambah ke Keranjang"}
                </button>
              </div>
            </motion.div>

            {/* Right Side Products */}
            <div className="hidden lg:flex flex-col gap-16 absolute right-0 top-1/2 -translate-y-1/2 z-20">
              {sideItems.slice(2).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                  className="group relative cursor-pointer"
                  onClick={() => addToCart(item)}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3.5 + i,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                    }}
                    className="relative w-36 h-36 md:w-44 md:h-44"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain drop-shadow-[0_10px_40px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                  <div className="mt-3 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-white mt-1">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                  <AnimatePresence>
                    {addedFeedback === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-400 whitespace-nowrap"
                      >
                        Coming Soon!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Side products shown below on small screens */}
          <div className="lg:hidden mt-12 grid grid-cols-3 gap-6">
            {sideItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                className="group text-center cursor-pointer"
                onClick={() => addToCart(item)}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  }}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mt-3">
                  {item.name}
                </p>
                <p className="text-xs sm:text-sm font-bold text-white mt-1">
                  {formatRupiah(item.price)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-white/15 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-blue-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== ALL PRODUCTS — Clean Grid ===== */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400/80 mb-4 block">
              Full Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Semua Produk</h2>
            <div className="h-px w-16 bg-blue-500/40 mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {merchandiseData.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group text-center"
              >
                {/* Product image — no card, no border, just floating */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ y: -12, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-full aspect-square cursor-pointer"
                    onClick={() => addToCart(item)}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain drop-shadow-[0_8px_30px_rgba(59,130,246,0.12)]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </motion.div>
                </div>

                {/* Product info — minimal, clean */}
                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-lg font-bold mt-1 text-white">
                  {formatRupiah(item.price)}
                </p>

                {/* Size selector */}
                {item.sizes && (
                  <div className="flex justify-center gap-1.5 mt-3">
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setSelectedSizes((prev) => ({ ...prev, [item.id]: s }))
                        }
                        className={`w-7 h-7 text-[10px] font-bold border transition-all ${
                          (selectedSizes[item.id] || item.sizes![0]) === s
                            ? "border-blue-500 bg-blue-500/20 text-blue-400"
                            : "border-white/10 text-gray-600 hover:border-white/20"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => addToCart(item)}
                  className={`mt-4 px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                    addedFeedback === item.id
                      ? "border-amber-500 bg-amber-500/20 text-amber-400"
                      : "border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-blue-400"
                  }`}
                >
                  {addedFeedback === item.id ? "Coming Soon" : "Add to Cart"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLOATING CART BUTTON ===== */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 flex items-center justify-center rounded-full shadow-2xl"
            style={{
              background: "var(--gradient-brand-vivid)",
              boxShadow: "0 0 40px rgba(59,130,246,0.4)",
            }}
          >
            <ShoppingBag className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-cyan-400 text-black text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===== CART SIDEBAR ===== */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold">
                  Keranjang <span className="text-blue-400">({cartCount})</span>
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Keranjang kosong</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 p-4 border border-white/5 bg-white/2"
                    >
                      <div className="relative w-16 h-16 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                        {item.size && (
                          <span className="text-xs text-gray-500">Size: {item.size}</span>
                        )}
                        <p className="text-sm font-bold text-blue-400 mt-1">
                          {formatRupiah(item.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            className="w-7 h-7 border border-white/10 flex items-center justify-center hover:bg-white/5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            className="w-7 h-7 border border-white/10 flex items-center justify-center hover:bg-white/5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="ml-auto text-xs text-rose-400 hover:text-rose-300"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white">{formatRupiah(cartTotal)}</span>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "var(--gradient-brand-vivid)",
                      boxShadow: "var(--shadow-glow-blue)",
                    }}
                  >
                    Checkout <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-gray-600">
                    Pembayaran akan diproses melalui Midtrans
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FooterSection />
    </main>
  );
}
