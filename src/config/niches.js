export const NICHES = [
  { id: 'lawyers', name: 'Lawyers', keywords: ['lawyer', 'law firm', 'attorney'], category: 'professional' },
  { id: 'accountants', name: 'Accountants', keywords: ['accountant', 'accounting', 'bookkeeping'], category: 'professional' },
  { id: 'consultants', name: 'Consultants', keywords: ['consultant', 'consulting', 'business advisor'], category: 'professional' },
  { id: 'architects', name: 'Architects', keywords: ['architect', 'architecture firm'], category: 'professional' },
  { id: 'engineers', name: 'Engineers', keywords: ['engineer', 'engineering'], category: 'professional' },
  { id: 'clinics', name: 'Clinics', keywords: ['clinic', 'medical center', 'health center'], category: 'healthcare' },
  { id: 'dentists', name: 'Dentists', keywords: ['dentist', 'dental clinic', 'orthodontist'], category: 'healthcare' },
  { id: 'dermatologists', name: 'Dermatologists', keywords: ['dermatologist', 'skin clinic'], category: 'healthcare' },
  { id: 'physiotherapy', name: 'Physiotherapy', keywords: ['physiotherapy', 'physical therapy'], category: 'healthcare' },
  { id: 'psychologists', name: 'Psychologists', keywords: ['psychologist', 'psychology clinic', 'therapist'], category: 'healthcare' },
  { id: 'veterinary', name: 'Veterinary Clinics', keywords: ['veterinary', 'vet clinic', 'animal hospital'], category: 'healthcare' },
  { id: 'hair_salons', name: 'Hair Salons', keywords: ['hair salon', 'hairdresser', 'beauty salon'], category: 'beauty' },
  { id: 'barbershops', name: 'Barbershops', keywords: ['barbershop', 'barber'], category: 'beauty' },
  { id: 'nail_salons', name: 'Nail Salons', keywords: ['nail salon', 'manicure', 'pedicure'], category: 'beauty' },
  { id: 'spas', name: 'Spas', keywords: ['spa', 'day spa', 'wellness center'], category: 'beauty' },
  { id: 'aesthetic_clinics', name: 'Aesthetic Clinics', keywords: ['aesthetic clinic', 'cosmetic clinic'], category: 'beauty' },
  { id: 'gyms', name: 'Gyms', keywords: ['gym', 'fitness center', 'health club'], category: 'fitness' },
  { id: 'crossfit', name: 'Crossfit', keywords: ['crossfit', 'crossfit box'], category: 'fitness' },
  { id: 'yoga', name: 'Yoga Studios', keywords: ['yoga studio', 'yoga center'], category: 'fitness' },
  { id: 'pilates', name: 'Pilates Studios', keywords: ['pilates', 'pilates studio'], category: 'fitness' },
  { id: 'personal_trainers', name: 'Personal Trainers', keywords: ['personal trainer', 'fitness coach'], category: 'fitness' },
  { id: 'language_schools', name: 'Language Schools', keywords: ['language school', 'english school'], category: 'education' },
  { id: 'private_schools', name: 'Private Schools', keywords: ['private school', 'school'], category: 'education' },
  { id: 'tutoring', name: 'Tutoring Centers', keywords: ['tutoring', 'learning center'], category: 'education' },
  { id: 'music_schools', name: 'Music Schools', keywords: ['music school', 'music lessons'], category: 'education' },
  { id: 'dance_schools', name: 'Dance Schools', keywords: ['dance school', 'dance studio'], category: 'education' },
  { id: 'restaurants', name: 'Restaurants', keywords: ['restaurant'], category: 'food' },
  { id: 'bars', name: 'Bars', keywords: ['bar', 'pub', 'lounge'], category: 'food' },
  { id: 'cafes', name: 'Cafés', keywords: ['cafe', 'coffee shop'], category: 'food' },
  { id: 'bakeries', name: 'Bakeries', keywords: ['bakery', 'patisserie'], category: 'food' },
  { id: 'pizzerias', name: 'Pizzerias', keywords: ['pizzeria', 'pizza restaurant'], category: 'food' },
  { id: 'burger_joints', name: 'Burger Joints', keywords: ['burger', 'hamburger restaurant'], category: 'food' },
  { id: 'sushi', name: 'Sushi Restaurants', keywords: ['sushi', 'japanese restaurant'], category: 'food' },
  { id: 'contractors', name: 'Contractors', keywords: ['contractor', 'construction company'], category: 'construction' },
  { id: 'interior_designers', name: 'Interior Designers', keywords: ['interior designer', 'interior design'], category: 'construction' },
  { id: 'plumbers', name: 'Plumbers', keywords: ['plumber', 'plumbing service'], category: 'construction' },
  { id: 'electricians', name: 'Electricians', keywords: ['electrician', 'electrical service'], category: 'construction' },
  { id: 'roofing', name: 'Roofing', keywords: ['roofing', 'roof repair'], category: 'construction' },
  { id: 'painters', name: 'Painters', keywords: ['painter', 'painting service'], category: 'construction' },
  { id: 'car_dealerships', name: 'Car Dealerships', keywords: ['car dealership', 'auto dealer'], category: 'automotive' },
  { id: 'mechanics', name: 'Mechanics', keywords: ['mechanic', 'auto repair'], category: 'automotive' },
  { id: 'auto_repair', name: 'Auto Repair', keywords: ['auto repair', 'car service'], category: 'automotive' },
  { id: 'car_wash', name: 'Car Wash', keywords: ['car wash', 'auto detailing'], category: 'automotive' },
  { id: 'tire_shops', name: 'Tire Shops', keywords: ['tire shop', 'tire service'], category: 'automotive' },
  { id: 'electronics', name: 'Electronics Stores', keywords: ['electronics store', 'computer store'], category: 'retail' },
  { id: 'clothing', name: 'Clothing Stores', keywords: ['clothing store', 'fashion boutique'], category: 'retail' },
  { id: 'furniture', name: 'Furniture Stores', keywords: ['furniture store', 'home furnishings'], category: 'retail' },
  { id: 'pet_shops', name: 'Pet Shops', keywords: ['pet shop', 'pet store'], category: 'retail' },
  { id: 'jewelry', name: 'Jewelry Stores', keywords: ['jewelry store', 'jeweler'], category: 'retail' },
  { id: 'florists', name: 'Florists', keywords: ['florist', 'flower shop'], category: 'retail' },
  { id: 'hotels', name: 'Hotels', keywords: ['hotel', 'inn'], category: 'hospitality' },
  { id: 'hostels', name: 'Hostels', keywords: ['hostel'], category: 'hospitality' },
  { id: 'bed_breakfast', name: 'Bed & Breakfast', keywords: ['bed and breakfast', 'b&b'], category: 'hospitality' },
  { id: 'real_estate', name: 'Real Estate Agencies', keywords: ['real estate', 'property agency'], category: 'real_estate' },
  { id: 'laundry', name: 'Laundry Services', keywords: ['laundry', 'dry cleaning'], category: 'services' },
  { id: 'photography', name: 'Photography Studios', keywords: ['photographer', 'photography studio'], category: 'services' },
  { id: 'event_planning', name: 'Event Planning', keywords: ['event planner', 'event planning'], category: 'services' },
  { id: 'marketing_agencies', name: 'Marketing Agencies', keywords: ['marketing agency', 'digital marketing'], category: 'services' }
];

export function getNicheById(id) {
  return NICHES.find(n => n.id === id);
}

export function getNichesByCategory(category) {
  return NICHES.filter(n => n.category === category);
}

export function getAllCategories() {
  return [...new Set(NICHES.map(n => n.category))].sort();
}
