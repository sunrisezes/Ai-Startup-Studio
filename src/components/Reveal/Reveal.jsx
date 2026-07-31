import React from 'react';
import { motion } from 'framer-motion';

export const Reveal = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
