// src/services/sensorService.ts

import api from '../api';  // Asegúrate de que `api` esté configurado correctamente.

export const getSensorData = async () => {
  try {
    const response = await api.get('/sensors/data');  // Realiza la solicitud al backend
    return response.data;  // Devuelve los datos de los sensores
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;  // Manejo de errores
  }
};
