
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DateDisplayProps {
  className?: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ className }) => {
  const [date, setDate] = useState<string>('');
  const [day, setDay] = useState<string>('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      
      // Format: Monday, January 1, 2023
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      const formattedDate = now.toLocaleDateString('en-US', options);
      const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
      
      setDate(formattedDate);
      setDay(dayOfWeek);
    };

    updateDate();
    
    // Update date at midnight
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        updateDate();
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn("text-center animate-slide-up", className)}>
      <h2 className="text-sm md:text-base font-medium uppercase tracking-widest text-muted-foreground mb-1">
        {day}
      </h2>
      <h3 className="text-base md:text-lg font-light tracking-wide">
        {date.replace(`${day}, `, '')}
      </h3>
    </div>
  );
};

export default DateDisplay;
