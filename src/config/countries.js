export const COUNTRIES = [
  { code: 'US', name: 'United States', language: 'en', cities: [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
    { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
    { name: 'Houston', lat: 29.7604, lng: -95.3698 },
    { name: 'Miami', lat: 25.7617, lng: -80.1918 }
  ]},
  { code: 'BR', name: 'Brazil', language: 'pt', cities: [
    { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Belo Horizonte', lat: -19.9167, lng: -43.9345 },
    { name: 'Brasília', lat: -15.8267, lng: -47.9218 },
    { name: 'Curitiba', lat: -25.4284, lng: -49.2733 }
  ]},
  { code: 'CA', name: 'Canada', language: 'en', cities: [
    { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
    { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
    { name: 'Montreal', lat: 45.5017, lng: -73.5673 },
    { name: 'Calgary', lat: 51.0447, lng: -114.0719 }
  ]},
  { code: 'UK', name: 'United Kingdom', language: 'en', cities: [
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Manchester', lat: 53.4808, lng: -2.2426 },
    { name: 'Birmingham', lat: 52.4862, lng: -1.8904 },
    { name: 'Edinburgh', lat: 55.9533, lng: -3.1883 }
  ]},
  { code: 'AU', name: 'Australia', language: 'en', cities: [
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
    { name: 'Brisbane', lat: -27.4698, lng: 153.0251 },
    { name: 'Perth', lat: -31.9505, lng: 115.8605 }
  ]},
  { code: 'DE', name: 'Germany', language: 'de', cities: [
    { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
    { name: 'Munich', lat: 48.1351, lng: 11.5820 },
    { name: 'Hamburg', lat: 53.5511, lng: 9.9937 },
    { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 }
  ]},
  { code: 'FR', name: 'France', language: 'fr', cities: [
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Lyon', lat: 45.7640, lng: 4.8357 },
    { name: 'Marseille', lat: 43.2965, lng: 5.3698 },
    { name: 'Toulouse', lat: 43.6047, lng: 1.4442 }
  ]},
  { code: 'ES', name: 'Spain', language: 'es', cities: [
    { name: 'Madrid', lat: 40.4168, lng: -3.7038 },
    { name: 'Barcelona', lat: 41.3851, lng: 2.1734 },
    { name: 'Valencia', lat: 39.4699, lng: -0.3763 },
    { name: 'Seville', lat: 37.3891, lng: -5.9845 }
  ]},
  { code: 'IT', name: 'Italy', language: 'it', cities: [
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Milan', lat: 45.4642, lng: 9.1900 },
    { name: 'Naples', lat: 40.8518, lng: 14.2681 },
    { name: 'Turin', lat: 45.0703, lng: 7.6869 }
  ]},
  { code: 'MX', name: 'Mexico', language: 'es', cities: [
    { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
    { name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
    { name: 'Monterrey', lat: 25.6866, lng: -100.3161 },
    { name: 'Cancún', lat: 21.1619, lng: -86.8515 }
  ]},
  { code: 'AR', name: 'Argentina', language: 'es', cities: [
    { name: 'Buenos Aires', lat: -34.6037, lng: -58.3816 },
    { name: 'Córdoba', lat: -31.4201, lng: -64.1888 },
    { name: 'Rosario', lat: -32.9442, lng: -60.6505 }
  ]},
  { code: 'PT', name: 'Portugal', language: 'pt', cities: [
    { name: 'Lisbon', lat: 38.7223, lng: -9.1393 },
    { name: 'Porto', lat: 41.1579, lng: -8.6291 }
  ]},
  { code: 'NL', name: 'Netherlands', language: 'nl', cities: [
    { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
    { name: 'Rotterdam', lat: 51.9225, lng: 4.47917 }
  ]},
  { code: 'IN', name: 'India', language: 'en', cities: [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 }
  ]},
  { code: 'SG', name: 'Singapore', language: 'en', cities: [
    { name: 'Singapore', lat: 1.3521, lng: 103.8198 }
  ]},
  { code: 'AE', name: 'United Arab Emirates', language: 'en', cities: [
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773 }
  ]},
  { code: 'JP', name: 'Japan', language: 'ja', cities: [
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Osaka', lat: 34.6937, lng: 135.5023 }
  ]}
];

export function getCountryByCode(code) {
  return COUNTRIES.find(c => c.code === code);
}

export function getAllCities() {
  return COUNTRIES.flatMap(country => 
    country.cities.map(city => ({
      ...city,
      country: country.code,
      countryName: country.name,
      language: country.language
    }))
  );
}
