import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';
import PropertyDetail from './components/PropertyDetail';
import ConfigStatus from './components/ConfigStatus';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit', 'detail'
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const handleCreateNew = () => {
    setSelectedPropertyId(null);
    setCurrentView('create');
  };

  const handleEdit = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setCurrentView('edit');
  };

  const handleView = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setCurrentView('detail');
  };

  const handleSave = (savedProperty) => {
    console.log('Property saved:', savedProperty);
    setCurrentView('list');
    setSelectedPropertyId(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedPropertyId(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPropertyId(null);
  };

  const renderNavigation = () => (
    <div className="navigation">
      <div className="nav-buttons">
        <button 
          className={`btn ${currentView === 'list' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentView('list')}
        >
          📋 Ver Propiedades
        </button>
        <button 
          className={`btn ${currentView === 'create' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={handleCreateNew}
        >
          ➕ Crear Propiedad
        </button>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'list':
        return (
          <PropertyList 
            onEdit={handleEdit}
            onView={handleView}
          />
        );
      
      case 'create':
        return (
          <PropertyForm 
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      
      case 'edit':
        return (
          <PropertyForm 
            propertyId={selectedPropertyId}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      
      case 'detail':
        return (
          <PropertyDetail 
            propertyId={selectedPropertyId}
            onEdit={handleEdit}
            onBack={handleBackToList}
          />
        );
      
      default:
        return (
          <PropertyList 
            onEdit={handleEdit}
            onView={handleView}
          />
        );
    }
  };

  return (
    <Layout>
      {renderNavigation()}
      {renderCurrentView()}
      <ConfigStatus />
    </Layout>
  );
}

export default App;