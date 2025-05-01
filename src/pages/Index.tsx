
import React, { useEffect, useState } from 'react';
import Clock from '@/components/Clock';
import DateDisplay from '@/components/DateDisplay';
import Weather from '@/components/Weather';
import { AuroraBackground } from '@/components/ui/aurora-background';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // To prevent hydration mismatch, we render the components only after mounting
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse h-4 w-4 bg-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <AuroraBackground>
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10">
          {/* Time */}
          <Clock className="mb-4" />
          
          {/* Date */}
          <DateDisplay className="mb-6" />
          
          {/* Weather */}
          <Weather className="w-full" />
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Index;
