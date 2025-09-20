import api from './api';

class PropertyService {
  
  async getAllProperties({ page = 0, size = 10, filters = {} } = {}) {
    try {
      const params = new URLSearchParams();
      
      params.append('page', page.toString());
      params.append('size', size.toString());
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });

      const response = await api.get(`/properties?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPropertyById(id) {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createProperty(propertyData) {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProperty(id, propertyData) {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteProperty(id) {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    let errorMessage = 'An unexpected error occurred';
    let errorCode = 500;
    
    if (error.response) {
      const { data, status } = error.response;
      errorCode = status;
      
      if (data && typeof data === 'object') {
        if (data.message) {
          errorMessage = data.message;
        } else if (data.detail) {
          errorMessage = data.detail;
        }
      } else if (typeof data === 'string') {
        errorMessage = data;
      } else {
        errorMessage = `HTTP ${status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = 'Network error: Unable to connect to the server';
      errorCode = 0;
    } else {
      errorMessage = error.message;
    }

    const customError = new Error(errorMessage);
    customError.code = errorCode;
    customError.originalError = error;
    
    return customError;
  }
}

const propertyServiceInstance = new PropertyService();
export default propertyServiceInstance;