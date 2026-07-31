import React, { useState, useEffect, useRef } from 'react';
import { Search, Rocket, BarChart3, Palette, FileText, Target, Box, Cpu, Home, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './CommandPalette.css';

const COMMANDS = [
  { id: 'home', label: 'Go to Home Landing Page', path: '/', icon: Home },
  { id: 'overview', label: 'Go to Overview', path: '/dashboard/overview', icon: Rocket },
  { id: 'market', label: 'Go to Market & Competitors', path: '/dashboard/market', icon: BarChart3 },
  { id: 'branding', label: 'Go to Branding & Identity', path: '/dashboard/branding', icon: Palette },
  { id: 'marketing', label: 'Go to Marketing & Copy', path: '/dashboard/marketing', icon: FileText },
  { id: 'strategy', label: 'Go to Business Strategy', path: '/dashboard/strategy', icon: Target },
  { id: 'launch', label: 'Go to Launch Kit', path: '/dashboard/launch', icon: Box },
  { id: 'tools', label: 'Go to AI Builder Tools', path: '/dashboard/tools', icon: Cpu },
];

export const CommandPalette = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const filteredCommands = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [setIsCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex].path);
      }
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    }
  };

  const handleSelect = (path) => {
    navigate(path);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setIsCommandPaletteOpen(false)}>
      <div className="command-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="command-search-bar">
          <Search size={18} className="command-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-input"
            placeholder="Type a command or navigate section (Arrow keys ↑↓, Enter)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="modal-close" onClick={() => setIsCommandPaletteOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="command-list">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  className={`command-item ${isSelected ? 'command-item--selected' : ''}`}
                  onClick={() => handleSelect(cmd.path)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <Icon size={18} className="command-item-icon" />
                  <span>{cmd.label}</span>
                  {isSelected && <span className="command-enter-hint">↵ Enter</span>}
                </div>
              );
            })
          ) : (
            <div className="command-empty">No matching commands found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
