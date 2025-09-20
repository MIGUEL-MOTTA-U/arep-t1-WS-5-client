import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import Pagination from './Pagination';
import propertyService from '../services/propertyService';

const PropertyList = ({ onEdit, onView }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProperties();
  }, [page, size, filters]);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await propertyService.getAllProperties({
        page,
        size,
        filters
      });
      
      setProperties(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      setError(err.message);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      try {
        await propertyService.deleteProperty(id);
        fetchProperties(); // Refresh the list
      } catch (err) {
        alert(`Error al eliminar la propiedad: ${err.message}`);
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset to first page when filters change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0); // Reset to first page when size changes
  };

  if (loading) {
    return <div className="loading">Cargando propiedades...</div>;
  }

  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <h2>Listado de Propiedades</h2>
        <div className="property-count">
          {totalElements > 0 ? (
            `Mostrando ${properties.length} de ${totalElements} propiedades`
          ) : (
            'No se encontraron propiedades'
          )}
        </div>
      </div>

      <PropertyFilters 
        onFilterChange={handleFilterChange}
        onClear={() => handleFilterChange({})}
      />

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {properties.length === 0 && !loading && !error && (
        <div className="no-properties">
          <p>No hay propiedades disponibles.</p>
          <p>¿Quieres crear la primera propiedad?</p>
        </div>
      )}

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onView={onView}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={size}
          totalElements={totalElements}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default PropertyList;