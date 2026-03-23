# LeadStrike - Project Structure Documentation

## Overview
LeadStrike is a global lead intelligence engine that discovers and qualifies local business leads using Google Places API.

## Architecture

```
LeadStrike/
│
├── src/
│   ├── cli.js                    # Interactive CLI interface
│   ├── index.js                  # Main entry point
│   │
│   ├── config/
│   │   ├── niches.js            # 65+ business niches configuration
│   │   └── countries.js         # 17 countries with major cities
│   │
│   ├── engines/
│   │   ├── leadDiscovery.js     # Lead discovery engine
│   │   └── leadScore.js         # Lead scoring algorithm
│   │
│   ├── services/
│   │   └── places.js            # Google Places API wrapper
│   │
│   └── exports/
│       └── jsonExporter.js      # JSON/CSV export functionality
│
├── output/                       # Generated lead files (auto-created)
├── .env                         # Environment configuration
├── .env.example                 # Environment template
├── package.json                 # Dependencies and scripts
├── README.md                    # User documentation
├── LICENSE                      # MIT License
└── STRUCTURE.md                 # This file

```

## Core Components

### 1. CLI Interface (`src/cli.js`)
Interactive command-line interface with three modes:
- **Single Search**: One city + one niche (fast)
- **Multi Search**: Multiple cities/niches (batch)
- **Country Scan**: Entire country coverage (slow)

Features:
- Beautiful ASCII art splash screen
- Progress bars with real-time stats
- Export options (JSON/CSV)
- Error handling and validation

### 2. Configuration

#### Niches (`src/config/niches.js`)
65+ business niches organized by category:
- Professional Services (lawyers, accountants, consultants)
- Healthcare (clinics, dentists, physiotherapy)
- Beauty (salons, barbershops, spas)
- Fitness (gyms, crossfit, yoga)
- Education (schools, tutoring)
- Food & Beverage (restaurants, cafés)
- Construction (contractors, plumbers, electricians)
- Automotive (mechanics, car wash)
- Retail (electronics, clothing, furniture)
- Hospitality (hotels, hostels)

Each niche includes:
- Unique ID
- Display name
- Search keywords
- Category classification

#### Countries (`src/config/countries.js`)
17 countries with major cities:
- US, BR, CA, UK, AU, DE, FR, ES, IT, NL, PT, MX, AR, SG, AE, JP, IN

Each country includes:
- Country code
- Language
- Major cities with coordinates

### 3. Lead Discovery Engine (`src/engines/leadDiscovery.js`)

Main discovery workflow:
1. Search Google Places API by location + keyword
2. Fetch detailed business information
3. Filter by minimum criteria (reviews, rating)
4. Calculate lead score
5. Return qualified leads sorted by score

Features:
- Progress callbacks for real-time updates
- Duplicate detection by place_id
- Rate limiting to respect API quotas
- Multi-search support

### 4. Lead Scoring (`src/engines/leadScore.js`)

Scoring algorithm (max 100 points):

| Criterion | Points | Description |
|-----------|--------|-------------|
| No Website | 40 | Business has no website |
| Weak Website | 25 | Only social media presence |
| High Reviews | 30 | 100+ reviews (scaled) |
| Good Rating | 25 | 4.5+ rating (scaled) |
| Has Contact | 20 | Phone number available |
| Operational | 10 | Business is operational |

Lead categories:
- **HOT** (80+): High priority, weak digital presence
- **WARM** (60-79): Medium priority, can improve
- **COLD** (<60): Low priority, strong presence

### 5. Google Places Service (`src/services/places.js`)

Wrapper for Google Places API:
- `nearbySearch()`: Find businesses by location + keyword
- `placeDetails()`: Get detailed business information

Features:
- Automatic pagination handling
- Multi-language support
- Error handling and retries
- Rate limiting

### 6. Export System (`src/exports/jsonExporter.js`)

Export formats:
- **JSON**: Structured data with metadata
- **CSV**: Spreadsheet-compatible format

Output includes:
- Generation timestamp
- Total leads count
- Category breakdown (HOT/WARM/COLD)
- Average score
- Full lead details

## Data Flow

```
User Input (CLI)
    ↓
Configuration (Country, City, Niche)
    ↓
Lead Discovery Engine
    ↓
Google Places API
    ↓
Lead Scoring Algorithm
    ↓
Filter by Threshold
    ↓
Export (JSON/CSV)
```

## Lead Object Structure

```json
{
  "business_name": "Example Restaurant",
  "niche": "restaurant",
  "country": "BR",
  "city": "São Paulo",
  "address": "Rua Example, 123",
  "rating": 4.5,
  "reviews": 120,
  "phone": "+551199999999",
  "website": null,
  "maps_url": "https://maps.google.com/?cid=...",
  "score": 87,
  "category": "HOT",
  "opportunity_signals": [
    "no website",
    "high reviews",
    "operational business"
  ]
}
```

## Environment Variables

```env
# Required
GOOGLE_PLACES_API_KEY=your_key_here

# Optional (with defaults)
MIN_REVIEW_COUNT=20
MIN_RATING=4.0
SEARCH_RADIUS=5000
SCORE_THRESHOLD=80

# Scoring weights
SCORE_NO_WEBSITE=40
SCORE_BAD_WEBSITE=25
SCORE_HIGH_REVIEWS=30
SCORE_GOOD_RATING=25
SCORE_HAS_CONTACT=20
SCORE_OPERATIONAL=10
```

## Usage Examples

### Single City Search
```bash
npm start
# Select: Single City + Niche
# Choose: Brazil → São Paulo → Restaurants
# Output: hot-leads-2026-03-23.json
```

### Multi-City Batch
```bash
npm start
# Select: Multiple Cities/Niches
# Choose: US, BR, UK
# Choose: Healthcare, Beauty, Fitness
# Output: Leads from all combinations
```

### Country Scan
```bash
npm start
# Select: Entire Country Scan
# Choose: Brazil
# Choose: All categories
# Output: Comprehensive country coverage
```

## API Rate Limits

Google Places API quotas:
- Nearby Search: 1000 requests/day (free tier)
- Place Details: 1000 requests/day (free tier)

LeadStrike implements:
- 300ms delay between place details
- 1000ms delay between searches
- Automatic pagination handling

## Extensibility

### Adding New Niches
Edit `src/config/niches.js`:
```javascript
{ 
  id: 'new_niche', 
  name: 'New Niche', 
  keywords: ['keyword1', 'keyword2'], 
  category: 'category' 
}
```

### Adding New Countries
Edit `src/config/countries.js`:
```javascript
{ 
  code: 'XX', 
  name: 'Country Name', 
  language: 'en', 
  cities: [
    { name: 'City', lat: 0.0, lng: 0.0 }
  ]
}
```

### Custom Scoring
Edit `src/engines/leadScore.js` to adjust weights or add new criteria.

## Future Enhancements (Roadmap)

### v2.0
- Website analysis (speed, SEO, mobile-friendly)
- Multi-language messaging templates
- Email extraction from websites
- Social media presence detection

### v3.0
- AI-powered lead scoring
- Predictive analytics (conversion probability)
- CRM integrations (Salesforce, HubSpot)
- Automated outreach campaigns

## License

MIT License - See LICENSE file for details
