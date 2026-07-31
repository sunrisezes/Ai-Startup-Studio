import React from 'react';
import classNames from 'classnames';
import './Badge.css';

export const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'cyan' | 'emerald' | 'amber'
  size = 'md', // 'sm' | 'md'
  icon: Icon = null,
  className = '',
  dot = false,
}) => {
  const badgeClass = classNames(
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    className
  );

  return (
    <span className={badgeClass}>
      {dot && <span className="badge__dot" />}
      {Icon && <Icon className="badge__icon" size={size === 'sm' ? 12 : 14} />}
      <span className="badge__label">{children}</span>
    </span>
  );
};

export default Badge;
