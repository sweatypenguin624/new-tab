
import React from 'react';
import { useWeather } from '@/hooks/useWeather';
import { cn } from '@/lib/utils';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Loader2,
  Wind,
  Droplets,
  Thermometer,
} from 'lucide-react';

interface WeatherProps {
  className?: string;
}

const Weather: React.FC<WeatherProps> = ({ className }) => {
  const { weather, loading, error } = useWeather();

  // Function to render the appropriate weather icon
  const renderWeatherIcon = (iconName: string, className?: string) => {
    const iconProps = { 
      className: cn("weather-icon", className),
      size: 24,
    };

    switch (iconName) {
      case 'cloud':
        return <Cloud {...iconProps} />;
      case 'cloud-drizzle':
        return <CloudDrizzle {...iconProps} />;
      case 'cloud-fog':
        return <CloudFog {...iconProps} />;
      case 'cloud-lightning':
        return <CloudLightning {...iconProps} />;
      case 'cloud-rain':
        return <CloudRain {...iconProps} />;
      case 'cloud-snow':
        return <CloudSnow {...iconProps} />;
      case 'cloud-sun':
        return <CloudSun {...iconProps} />;
      case 'sun':
      default:
        return <Sun {...iconProps} />;
    }
  };

  if (loading) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-4", className)}>
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground mt-2">Loading weather data...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={cn("text-center p-4", className)}>
        <p className="text-sm text-muted-foreground">
          {error || "Weather data unavailable"}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-md animate-fade-in", className)}>
      {/* Current Weather */}
      <div className="glassmorphism rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{weather.location}</h3>
        </div>
        
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center">
              {renderWeatherIcon(weather.icon, "w-10 h-10")}
              <div className="ml-3">
                <p className="text-3xl font-semibold">{weather.temperature}{weather.tempUnit}</p>
                <p className="text-sm text-muted-foreground">{weather.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center text-xs">
                <Thermometer className="w-3 h-3 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Feels:</span>
                <span className="ml-1 font-medium">{weather.feelsLike}{weather.tempUnit}</span>
              </div>
              
              <div className="flex items-center text-xs">
                <Droplets className="w-3 h-3 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Humidity:</span>
                <span className="ml-1 font-medium">{weather.humidity}%</span>
              </div>
              
              <div className="flex items-center text-xs col-span-2">
                <Wind className="w-3 h-3 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Wind:</span>
                <span className="ml-1 font-medium">{weather.windSpeed} {weather.windUnit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 5-Day Forecast */}
      <div className="flex justify-between glassmorphism rounded-xl p-3">
        {weather.forecast.map((day, index) => (
          <div key={index} className="text-center hover-lift">
            <p className="text-xs font-medium mb-1">{day.day}</p>
            <div className="flex justify-center mb-1">
              {renderWeatherIcon(day.icon, "w-5 h-5")}
            </div>
            <p className="text-xs font-medium">{day.tempMax}°</p>
            <p className="text-xs text-muted-foreground">{day.tempMin}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
