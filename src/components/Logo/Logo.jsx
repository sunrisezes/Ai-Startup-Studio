import React from 'react';
import { Sparkles } from 'lucide-react';
import './Logo.css';

export const Logo = ({ size = 'md', className = '' }) => {
  return (
    <div className={`logo logo--${size} ${className}`}>
      <div className="logo__icon-wrap">
        <Sparkles className="logo__icon" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      </div>
      <div className="logo__text">
        <span className="logo__title">AI Startup</span>
        <span className="logo__subtitle">Studio</span>
      </div>
    </div>
  );
};

export default Logo;
