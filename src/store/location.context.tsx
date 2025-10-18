import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  currentCity: string;
  currentCountry: string;
  setLocation: (city: string, country?: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [currentCity, setCurrentCity] = useState<string>(() => {
    return localStorage.getItem('currentCity') || 'Kakinada';
  });
  const [currentCountry, setCurrentCountry] = useState<string>(() => {
    return localStorage.getItem('currentCountry') || 'India';
  });

  useEffect(() => {
    localStorage.setItem('currentCity', currentCity);
    localStorage.setItem('currentCountry', currentCountry);
  }, [currentCity, currentCountry]);

  const setLocation = (city: string, country?: string) => {
    setCurrentCity(city);
    setCurrentCountry(country || 'India');
  };

  return (
    <LocationContext.Provider value={{ currentCity, currentCountry, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};