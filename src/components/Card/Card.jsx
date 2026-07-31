import React, { useRef } from 'react';
import classNames from 'classnames';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Card.css';

export const Card = ({
  children,
  variant = 'glass', // 'glass' | 'surface' | 'gradient'
  hoverable = true,
  className = '',
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const transform = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  );

  const handleMouseMove = (e) => {
    if (!hoverable || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation: max +/-6 deg
    const rX = -((mouseY / height) - 0.5) * 12;
    const rY = ((mouseX / width) - 0.5) * 12;

    rawRotateX.set(rX);
    rawRotateY.set(rY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const cardClass = classNames(
    'card',
    `card--${variant}`,
    {
      'card--hoverable': hoverable,
      'card--clickable': !!onClick,
    },
    className
  );

  return (
    <motion.div
      ref={cardRef}
      className={cardClass}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hoverable && !prefersReducedMotion ? transform : 'none',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
