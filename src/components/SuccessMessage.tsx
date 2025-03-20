'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SuccessMessageProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export function SuccessMessage({ title, message, onClose }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="card bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 p-8 text-center relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-emerald-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <div className="relative">
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200,
              damping: 20
            }}
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            {title}
          </h3>
          <p className="text-gray-300 mb-8">
            {message}
          </p>
          {onClose && (
            <motion.button
              onClick={onClose}
              className="btn-primary w-full md:w-auto min-w-[200px] relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              Close
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
