import React, { useState } from 'react';
import config from '../config/environment';

const ConfigStatus = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!config.isDevelopment) {
    return null;
  }

  return (
    <div className="config-status">
      <button 
        className="config-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        title="Ver configuración actual"
      >
        ⚙️ Config {isExpanded ? '▼' : '▶'}
      </button>
      
      {isExpanded && (
        <div className="config-details">
          <h4>🔧 Configuración Actual</h4>
          <div className="config-item">
            <strong>API Base URL:</strong> 
            <code>{config.API_BASE_URL}</code>
          </div>
          <div className="config-item">
            <strong>Environment:</strong> 
            <span className={`env-badge ${config.ENV}`}>{config.ENV}</span>
          </div>
          <div className="config-item">
            <strong>API Timeout:</strong> 
            <code>{config.API_TIMEOUT}ms</code>
          </div>
          <div className="config-item">
            <strong>API Logging:</strong> 
            <span className={config.ENABLE_API_LOGGING ? 'enabled' : 'disabled'}>
              {config.ENABLE_API_LOGGING ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
          <div className="config-item">
            <strong>Dev Server:</strong> 
            <code>{config.DEV_SERVER_HOST}:{config.DEV_SERVER_PORT}</code>
          </div>
          <div className="config-note">
            <small>💡 Modifica las variables en tu archivo .env para cambiar esta configuración</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigStatus;