/**
 * API Configuration
 * 
 * Uses environment variable REACT_APP_API_BASE_URL to determine the backend URL.
 * 
 * Development (.env.development): http://localhost:5000/api
 * Production (.env.production): https://ml-research.pef.czu.cz/api
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    CONVERT_AUGMENTED: `${API_BASE_URL}/convert-augmented`,
    PREDICT: `${API_BASE_URL}/predict`,
    PREDICT_HANDWRITTEN: `${API_BASE_URL}/predict-handwritten`,
};

export default API_BASE_URL;
