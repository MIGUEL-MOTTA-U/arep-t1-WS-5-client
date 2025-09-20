import React, { useState, useEffect } from 'react';
import { PropertyType, PropertyInDTO } from '../types/Property';
import propertyService from '../services/propertyService';

const PropertyForm = ({ propertyId, onSave, onCancel }) => {
  const [formData, setFormData] = useState(new PropertyInDTO());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (propertyId) {
      setIsEdit(true);
      fetchProperty(propertyId);
    } else {
      setIsEdit(false);
      setFormData(new PropertyInDTO());
    }
  }, [propertyId]);

  const fetchProperty = async (id) => {
    setLoading(true);
    try {
      const property = await propertyService.getPropertyById(id);
      setFormData({
        address: property.address || '',
        city: property.city || '',
        active: property.active ?? true,
        price: property.price || 0,
        description: property.description || '',
        name: property.name || '',
        rooms: property.rooms || 0,
        bathrooms: property.bathrooms || 0,
        parkingLots: property.parkingLots || 0,
        areaSquareMeters: property.areaSquareMeters || 0,
        type: property.propertyEntity || PropertyType.HOUSE,
        owner: property.owner || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) || 0 : 
              value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name?.trim()) errors.push('El nombre es requerido');
    if (!formData.address?.trim()) errors.push('La dirección es requerida');
    if (!formData.city?.trim()) errors.push('La ciudad es requerida');
    if (!formData.description?.trim()) errors.push('La descripción es requerida');
    if (!formData.owner?.trim()) errors.push('El propietario es requerido');
    if (!formData.type) errors.push('El tipo de propiedad es requerido');
    
    if (formData.price < 0) errors.push('El precio no puede ser negativo');
    if (formData.rooms < 0) errors.push('El número de habitaciones no puede ser negativo');
    if (formData.bathrooms < 0) errors.push('El número de baños no puede ser negativo');
    if (formData.parkingLots < 0) errors.push('El número de parqueaderos no puede ser negativo');
    if (formData.areaSquareMeters < 0) errors.push('El área no puede ser negativa');
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      if (isEdit) {
        result = await propertyService.updateProperty(propertyId, formData);
      } else {
        result = await propertyService.createProperty(formData);
      }
      
      onSave(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div className="loading">Cargando propiedad...</div>;
  }

  return (
    <div className="property-form-container">
      <div className="property-form-header">
        <h2>{isEdit ? 'Editar Propiedad' : 'Crear Nueva Propiedad'}</h2>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Ej: Casa moderna en el norte"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo de Propiedad *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              {Object.values(PropertyType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Dirección *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Ej: Carrera 15 #85-32"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ciudad *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              placeholder="Ej: Bogotá"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
            placeholder="Describe las características principales de la propiedad..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio (COP) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="1000"
              placeholder="Ej: 250000000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="areaSquareMeters">Área (m²) *</label>
            <input
              type="number"
              id="areaSquareMeters"
              name="areaSquareMeters"
              value={formData.areaSquareMeters}
              onChange={handleInputChange}
              required
              min="0"
              step="0.1"
              placeholder="Ej: 120.5"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rooms">Habitaciones *</label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="Ej: 3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bathrooms">Baños *</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="Ej: 2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="parkingLots">Parqueaderos *</label>
            <input
              type="number"
              id="parkingLots"
              name="parkingLots"
              value={formData.parkingLots}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="Ej: 1"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="owner">Propietario *</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              required
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="active">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
              />
              Propiedad activa
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
          >
            {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;