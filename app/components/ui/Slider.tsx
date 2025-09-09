import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SliderProps {
  images: string[];
  interval?: number;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({ 
  images, 
  interval = 3000, 
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`nft-slider ${className}`}>
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="w-full flex-shrink-0 h-full flex items-center justify-center"
          >
            <Image 
              src={image} 
              alt={`NFT ${index + 1}`}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Indicadores de puntos */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`slider-indicator w-3 h-3 rounded-full ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
