import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import Button from '../../components/Button/Button';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-card animate-slide-up">
        <AlertTriangle size={48} className="not-found-icon" />
        <h1>404 — Page Not Found</h1>
        <p>The page or section you are looking for does not exist or has been moved.</p>
        <Button variant="primary" icon={Home} onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
