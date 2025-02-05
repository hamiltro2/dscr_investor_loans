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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="card bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 p-8 text-center"
    >
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </motion.div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-300 mb-8">
        {message}
      </p>
      {onClose && (
        <button
          onClick={onClose}
          className="btn-primary w-full md:w-auto min-w-[200px]"
        >
          Close
        </button>
      )}
    </motion.div>
  );
}
