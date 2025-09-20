import React, { useState, useEffect } from 'react';
import propertyService from '../services/propertyService';

const PropertyDetail = ({ propertyId, onEdit, onBack }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await propertyService.getPropertyById(propertyId);
      setProperty(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatArea = (area) => {
    return `${area} m²`;
  };

  if (loading) {
    return <div className="loading">Cargando detalles de la propiedad...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
        <button className="btn btn-primary" onClick={onBack}>
          Volver a la Lista
        </button>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="error-container">
        <div className="error-message">
          No se encontró la propiedad solicitada.
        </div>
        <button className="btn btn-primary" onClick={onBack}>
          Volver a la Lista
        </button>
      </div>
    );
  }

  return (
    <div className="property-detail">
      <div className="property-detail-header">
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={onBack}>
            ← Volver a la Lista
          </button>
          <button className="btn btn-primary" onClick={() => onEdit(property.id)}>
            Editar Propiedad
          </button>
        </div>
        
        <div className="property-title">
          <h1>{property.name}</h1>
          <span className={`property-status ${property.active ? 'active' : 'inactive'}`}>
            {property.active ? 'Activa' : 'Inactiva'}
          </span>
        </div>
      </div>

      <div className="property-detail-content">
        <div className="property-basic-info">
          <div className="info-section">
            <h3>Información Básica</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Tipo:</strong>
                <span className="property-type-badge">{property.type}</span>
              </div>
              <div className="info-item">
                <strong>Precio:</strong>
                <span className="price">{formatPrice(property.price)}</span>
              </div>
              <div className="info-item">
                <strong>Área:</strong>
                <span>{formatArea(property.areaSquareMeters)}</span>
              </div>
              <div className="info-item">
                <strong>Propietario:</strong>
                <span>{property.owner}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Ubicación</h3>
            <div className="location-info">
              <div className="address">
                <strong>📍 {property.address}</strong>
              </div>
              <div className="city">
                {property.city}
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Características</h3>
            <div className="characteristics-grid">
              <div className="characteristic-item">
                <div className="characteristic-icon">🛏️</div>
                <div className="characteristic-info">
                  <strong>{property.rooms}</strong>
                  <span>Habitaciones</span>
                </div>
              </div>
              <div className="characteristic-item">
                <div className="characteristic-icon">🚿</div>
                <div className="characteristic-info">
                  <strong>{property.bathrooms}</strong>
                  <span>Baños</span>
                </div>
              </div>
              <div className="characteristic-item">
                <div className="characteristic-icon">🚗</div>
                <div className="characteristic-info">
                  <strong>{property.parkingLots}</strong>
                  <span>Parqueaderos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Descripción</h3>
            <div className="description">
              <p>{property.description}</p>
            </div>
          </div>

          <div className="info-section">
            <h3>Información Técnica</h3>
            <div className="technical-info">
              <div className="tech-item">
                <strong>ID:</strong> <code>{property.id}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;