import React from 'react';
import classNames from 'classnames';
import './Input.css';

export const Input = ({
  icon: Icon = null,
  error = '',
  label = '',
  className = '',
  ...props
}) => {
  return (
    <div className={classNames('input-field-wrapper', className)}>
      {label && <label className="input-field__label">{label}</label>}
      <div className="input-field__input-container">
        {Icon && <Icon className="input-field__icon" size={18} />}
        <input
          className={classNames('input-field__input', {
            'input-field__input--has-icon': !!Icon,
            'input-field__input--error': !!error,
          })}
          {...props}
        />
      </div>
      {error && <span className="input-field__error">{error}</span>}
    </div>
  );
};

export default Input;
