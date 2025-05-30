import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const hoverStyles = hover ? 'hover:shadow-md transition-shadow duration-200' : '';

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;