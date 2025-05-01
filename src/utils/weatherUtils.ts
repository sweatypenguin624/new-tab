
export interface WeatherData {
  location: string;
  temperature: number;
  tempUnit: string;
  description: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windUnit: string;
  forecast: ForecastItem[];
}

export interface ForecastItem {
  day: string;
  icon: string;
  tempMax: number;
  tempMin: number;
}

// Mock weather API data to avoid requiring actual API keys
export const getMockWeatherData = (): WeatherData => {
  const weatherConditions = [
    { desc: 'Clear sky', icon: 'sun' },
    { desc: 'Few clouds', icon: 'cloud-sun' },
    { desc: 'Scattered clouds', icon: 'cloud' },
    { desc: 'Cloudy', icon: 'cloud' },
    { desc: 'Light rain', icon: 'cloud-drizzle' },
    { desc: 'Moderate rain', icon: 'cloud-rain' },
    { desc: 'Heavy rain', icon: 'cloud-rain' },
    { desc: 'Thunderstorm', icon: 'cloud-lightning' },
    { desc: 'Snow', icon: 'cloud-snow' },
    { desc: 'Fog', icon: 'cloud-fog' }
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  
  // Get a consistent weather condition based on the current date
  const date = new Date();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const weatherIndex = dayOfYear % weatherConditions.length;
  const currentWeather = weatherConditions[weatherIndex];
  
  // Generate a "realistic" temperature based on date
  const baseTemp = 20; // baseline temperature in celsius
  const tempVariation = Math.sin(dayOfYear / 365 * 2 * Math.PI) * 15; // seasonal variation
  const currentTemp = Math.round(baseTemp + tempVariation);
  
  // Generate forecast for next 5 days
  const forecast: ForecastItem[] = [];
  
  for (let i = 1; i <= 5; i++) {
    const dayIndex = (today + i) % 7;
    const forecastIndex = (weatherIndex + i) % weatherConditions.length;
    const forecastWeather = weatherConditions[forecastIndex];
    const forecastTempMax = Math.round(currentTemp + (Math.random() * 6 - 2));
    const forecastTempMin = Math.round(forecastTempMax - (4 + Math.random() * 2));
    
    forecast.push({
      day: days[dayIndex].slice(0, 3),
      icon: forecastWeather.icon,
      tempMax: forecastTempMax,
      tempMin: forecastTempMin
    });
  }
  
  return {
    location: 'Current Location',
    temperature: currentTemp,
    tempUnit: '°C',
    description: currentWeather.desc,
    icon: currentWeather.icon,
    feelsLike: Math.round(currentTemp - 2 + Math.random() * 4),
    humidity: Math.round(50 + Math.random() * 40),
    windSpeed: Math.round(5 + Math.random() * 15),
    windUnit: 'km/h',
    forecast
  };
};

export const getWeatherIconName = (icon: string): string => {
  return icon || 'sun';
};
