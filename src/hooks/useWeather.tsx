
import { useState, useEffect } from 'react';
import { WeatherData, getMockWeatherData } from '@/utils/weatherUtils';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch from a weather API
        // For now, we'll use mock data
        const data = getMockWeatherData();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setWeather(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return { weather, loading, error };
}
