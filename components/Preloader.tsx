import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

export const Preloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "backOut" }}
          className="mb-6 inline-block p-4 bg-white rounded-full"
        >
          <Scissors className="w-16 h-16 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-serif text-white tracking-widest uppercase"
        >
          AfroLuxe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-secondary mt-2 text-sm tracking-widest"
        >
          London
        </motion.p>
      </div>
    </motion.div>
  );
};