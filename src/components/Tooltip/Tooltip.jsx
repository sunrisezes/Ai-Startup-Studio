import React, { useState } from 'react';
import './Tooltip.css';

export const Tooltip = ({ content, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <div className={`tooltip-box tooltip-box--${position}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
