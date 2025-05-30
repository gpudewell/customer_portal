import React, { useRef, useEffect, useState } from 'react';
import { Pin } from '../../types';
import { ExternalLink } from 'lucide-react';
import Button from '../common/Button';

interface AnnotationOverlayProps {
  src: string;
  pins: Pin[];
  onAdd: (coordinates: { x: number; y: number }) => void;
}

const AnnotationOverlay: React.FC<AnnotationOverlayProps> = ({ src, pins, onAdd }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    onAdd({ x, y });
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">{loadError}</p>
          <Button
            variant="outline"
            leftIcon={<ExternalLink className="w-4 h-4" />}
            onClick={() => window.open(src, '_blank')}
          >
            Open Preview in New Tab
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full cursor-crosshair"
      onClick={handleClick}
    >
      <img
        src={src}
        alt="Design Preview"
        className="w-full h-full object-contain"
        onLoad={() => setIsLoaded(true)}
        onError={() => setLoadError('Failed to load the preview.')}
      />
      
      {isLoaded && pins.map((pin) => (
        <div
          key={pin.id}
          className={`absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center transition-all duration-200 ${
            pin.status === 'resolved' ? 'opacity-50' : ''
          }`}
          style={{
            left: `${pin.x * 100}%`,
            top: `${pin.y * 100}%`
          }}
        >
          <div className={`w-4 h-4 rounded-full ${
            pin.status === 'resolved' ? 'bg-green-500' : 'bg-blue-500'
          }`} />
        </div>
      ))}
    </div>
  );
};

export default AnnotationOverlay;