import React, { useState, useEffect } from 'react';
import { PainterStyle } from '../types';
import { PAINTER_STYLES } from '../constants';
import { StyledButton } from './UiComponents';
import { Dices } from 'lucide-react';

interface Props {
  onSelect: (style: PainterStyle) => void;
  currentStyle: PainterStyle;
  label: string;
}

export const StyleJackpot: React.FC<Props> = ({ onSelect, currentStyle, label }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  
  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * PAINTER_STYLES.length);
      onSelect(PAINTER_STYLES[randomIndex]);
      counter++;
      
      if (counter > 15) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`text-sm hidden md:block ${currentStyle.colors.text}`}>{currentStyle.name}</div>
      <StyledButton 
        styleData={currentStyle} 
        onClick={spin}
        variant="primary"
        disabled={isSpinning}
        className="w-full md:w-auto"
      >
        <Dices className={isSpinning ? 'animate-spin' : ''} size={18} />
        <span className="md:hidden">{label}</span>
      </StyledButton>
    </div>
  );
};
