import React from 'react';

export interface DetailRowProps {
  label: string;
  value: string;
  color?: string;
  isSubItem?: boolean;
  isBold?: boolean;
  isNegative?: boolean;
  highlight?: boolean;
  colorClass?: string;
}

export const DetailRow: React.FC<DetailRowProps> = ({ 
  label, 
  value, 
  color,
  isSubItem = false,
  isBold = false,
  isNegative = false,
  highlight = false,
  colorClass
}) => {
  return (
    <div className={`
      flex justify-between items-center 
      ${isSubItem ? 'ml-4 text-sm' : ''} 
      ${highlight ? 'bg-gray-700/30' : ''} 
      mb-2
    `}>
      <span className={`text-gray-400 ${isSubItem ? 'italic' : ''}`}>
        {label}
      </span>
      <span className={`
        ${color || colorClass || ''} 
        ${isBold ? 'font-semibold' : ''} 
        ${isNegative ? 'text-red-400' : ''}
      `}>
        {value}
      </span>
    </div>
  );
};

export default DetailRow;
