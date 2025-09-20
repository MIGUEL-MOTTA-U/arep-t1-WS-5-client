import React from 'react';

const PropertyCard = ({ property, onView, onEdit, onDelete }) => {
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

  return (
    <div className="property-card">
      <div className="property-header">
        <h3 className="property-name">{property.name}</h3>
        <span className={`property-status ${property.active ? 'active' : 'inactive'}`}>
          {property.active ? 'Activa' : 'Inactiva'}
        </span>
      </div>
      
      <div className="property-details">
        <div className="property-type">
          <span className="property-type-badge">{property.type}</span>
        </div>
        
        <div className="property-location">
          <strong>📍 {property.address}</strong>
          <br />
          <span className="city">{property.city}</span>
        </div>
        
        <div className="property-specs">
          <div className="spec-item">
            <span className="spec-label">Precio:</span>
            <span className="spec-value price">{formatPrice(property.price)}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Área:</span>
            <span className="spec-value">{formatArea(property.areaSquareMeters)}</span>
          </div>
          <div className="spec-grid">
            <div className="spec-item">
              <span className="spec-icon">🛏️</span>
              <span>{property.rooms}</span>
            </div>
            <div className="spec-item">
              <span className="spec-icon">🚿</span>
              <span>{property.bathrooms}</span>
            </div>
            <div className="spec-item">
              <span className="spec-icon">🚗</span>
              <span>{property.parkingLots}</span>
            </div>
          </div>
        </div>
        
        <div className="property-description">
          <p>{property.description}</p>
        </div>
        
        <div className="property-owner">
          <small><strong>Propietario:</strong> {property.owner}</small>
        </div>
      </div>
      
      <div className="property-actions">
        <button 
          className="btn btn-primary" 
          onClick={() => onView(property.id)}
        >
          Ver Detalles
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => onEdit(property.id)}
        >
          Editar
        </button>
        <button 
          className="btn btn-danger" 
          onClick={() => onDelete(property.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;