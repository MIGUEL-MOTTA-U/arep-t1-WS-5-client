import React, { useState } from 'react';
import { PropertyType } from '../types/Property';

const PropertyFilters = ({ onFilterChange, onClear }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    city: '',
    name: '',
    address: '',
    minAreaSquareMeters: '',
    maxAreaSquareMeters: '',
    type: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    const cleanFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        if (['minPrice', 'maxPrice', 'minAreaSquareMeters', 'maxAreaSquareMeters'].includes(key)) {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            cleanFilters[key] = numValue;
          }
        } else {
          cleanFilters[key] = value;
        }
      }
    });
    
    onFilterChange(cleanFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      city: '',
      name: '',
      address: '',
      minAreaSquareMeters: '',
      maxAreaSquareMeters: '',
      type: ''
    });
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="property-filters">
      <div className="filters-header">
        <h3>Filtros de Búsqueda</h3>
        <button 
          className="btn btn-link"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>
      </div>

      {isExpanded && (
        <div className="filters-content">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleInputChange}
                placeholder="Buscar por nombre..."
              />
            </div>

            <div className="filter-group">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                value={filters.city}
                onChange={handleInputChange}
                placeholder="Ej: Bogotá"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="type">Tipo</label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleInputChange}
              >
                <option value="">Todos los tipos</option>
                {Object.values(PropertyType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={filters.address}
                onChange={handleInputChange}
                placeholder="Buscar por dirección..."
              />
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="minPrice">Precio Mínimo (COP)</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder="Ej: 100000000"
                min="0"
                step="1000000"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="maxPrice">Precio Máximo (COP)</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="Ej: 500000000"
                min="0"
                step="1000000"
              />
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="minAreaSquareMeters">Área Mínima (m²)</label>
              <input
                type="number"
                id="minAreaSquareMeters"
                name="minAreaSquareMeters"
                value={filters.minAreaSquareMeters}
                onChange={handleInputChange}
                placeholder="Ej: 50"
                min="0"
                step="1"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="maxAreaSquareMeters">Área Máxima (m²)</label>
              <input
                type="number"
                id="maxAreaSquareMeters"
                name="maxAreaSquareMeters"
                value={filters.maxAreaSquareMeters}
                onChange={handleInputChange}
                placeholder="Ej: 200"
                min="0"
                step="1"
              />
            </div>
          </div>

          <div className="filters-actions">
            <button 
              className="btn btn-primary"
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </button>
            
            {hasActiveFilters && (
              <button 
                className="btn btn-secondary"
                onClick={handleClearFilters}
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;