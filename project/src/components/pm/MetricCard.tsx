import React from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  intent: 'info' | 'warning' | 'danger' | 'success';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, intent }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-700',
    warning: 'bg-yellow-50 border-yellow-100 text-yellow-700',
    danger: 'bg-red-50 border-red-100 text-red-700',
    success: 'bg-green-50 border-green-100 text-green-700'
  };

  return (
    <div className={`rounded-lg border p-4 ${styles[intent]}`}>
      <h3 className="font-semibold mb-2 opacity-90">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default MetricCard;