interface MetricCardProps {
  title: string;
  value: number;
  type: 'currency' | 'percentage' | 'ratio';
}

export function MetricCard({ title, value, type }: MetricCardProps) {
  const formatValue = (value: number, type: string) => {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'ratio':
        return value.toFixed(2);
      default:
        return value.toString();
    }
  };

  const getColorClass = (value: number, type: string) => {
    if (type === 'currency' || type === 'ratio') {
      return value >= 0 ? 'text-emerald-400' : 'text-red-400';
    }
    return 'text-emerald-400';
  };

  return (
    <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
      <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
      <p className={`text-2xl font-semibold ${getColorClass(value, type)}`}>
        {formatValue(value, type)}
      </p>
    </div>
  );
}
