
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ClockProps {
  className?: string;
}

const Clock: React.FC<ClockProps> = ({ className }) => {
  const [time, setTime] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const secs = now.getSeconds().toString().padStart(2, '0');
      
      setTime(`${hours}:${minutes}`);
      setSeconds(secs);
    };

    // Update immediately
    updateTime();
    
    // Update every second
    const intervalId = setInterval(updateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn("flex items-end justify-center transition-all", className)}>
      <div className="text-7xl md:text-9xl font-bold tracking-tighter animate-fade-in">
        {time}
      </div>
      <div className="text-2xl md:text-4xl mb-1 ml-1 font-light text-muted-foreground animate-pulse-light">
        {seconds}
      </div>
    </div>
  );
};

export default Clock;
