import React, { useRef } from 'react';
import classNames from 'classnames';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'cyan'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon = null,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const ref = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Motion values for magnetic translation & 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  // Physics springs for smooth fluid inertia
  const springConfig = { stiffness: 350, damping: 25 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const transform = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`
  );

  const handleMouseMove = (e) => {
    if (disabled || loading || prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic offset max 8px within radius
    const magX = Math.max(-8, Math.min(8, distanceX * 0.35));
    const magY = Math.max(-8, Math.min(8, distanceY * 0.35));
    x.set(magX);
    y.set(magY);

    // 3D tilt angles max 10deg
    const rX = -((e.clientY - rect.top) / rect.height - 0.5) * 16;
    const rY = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    rawRotateX.set(rX);
    rawRotateY.set(rY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const buttonClass = classNames(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    {
      'btn--loading pulseGlow': loading,
      'btn--disabled': disabled || loading,
    },
    className
  );

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: prefersReducedMotion ? 0 : springX,
        y: prefersReducedMotion ? 0 : springY,
        transform: prefersReducedMotion ? 'none' : transform,
      }}
      whileTap={prefersReducedMotion || disabled || loading ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      {...props}
    >
      {loading ? (
        <Loader2 className="btn__spinner animate-spin" size={size === 'sm' ? 14 : 18} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="btn__icon btn__icon--left" size={size === 'sm' ? 14 : 18} />
          )}
          <span className="btn__content">{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className="btn__icon btn__icon--right" size={size === 'sm' ? 14 : 18} />
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
