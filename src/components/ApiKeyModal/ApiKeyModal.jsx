import React, { useState } from 'react';
import { X, Key, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './ApiKeyModal.css';

export const ApiKeyModal = () => {
  const { isApiKeyModalOpen, setIsApiKeyModalOpen } = useApp();
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('groqKey') || localStorage.getItem('groq_api_key') || '');
  const [saved, setSaved] = useState(false);

  if (!isApiKeyModalOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    sessionStorage.setItem('groqKey', trimmed);
    localStorage.setItem('groq_api_key', trimmed);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsApiKeyModalOpen(false);
    }, 800);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setIsApiKeyModalOpen(false)}>
      <div className="modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Key className="modal-icon" size={20} />
            <h3>Configure Groq API Key</h3>
          </div>
          <button className="modal-close" onClick={() => setIsApiKeyModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Enter your Groq API key to power ultra-fast startup generation using Llama 3 models. Your key is stored securely in your browser session.
          </p>
          <Input
            type="password"
            label="Groq API Key"
            placeholder="gsk_..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <Button variant="ghost" onClick={() => setIsApiKeyModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" icon={saved ? Check : null} onClick={handleSave}>
            {saved ? 'Saved!' : 'Save Key'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
