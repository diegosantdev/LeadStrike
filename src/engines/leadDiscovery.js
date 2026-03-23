import { PlacesService } from '../services/places.js';
import { LeadScorer } from './leadScore.js';
import dotenv from 'dotenv';

dotenv.config();

export class LeadDiscoveryEngine {
  constructor(apiKey) {
    this.placesService = new PlacesService(apiKey);
    this.scorer = new LeadScorer();
    this.minReviews = parseInt(process.env.MIN_REVIEW_COUNT) || 20;
    this.minRating = parseFloat(process.env.MIN_RATING) || 4.0;
    this.scoreThreshold = parseInt(process.env.SCORE_THRESHOLD) || 80;
  }

  async discover(config) {
    const { city, niche, language = 'en', onProgress } = config;
    const leads = [];
    const seenPlaces = new Set();

    if (onProgress) onProgress({ type: 'start', city: city.name, niche: niche.name });

    try {
      const keyword = niche.keywords[0];
      const radius = parseInt(process.env.SEARCH_RADIUS) || 5000;

      const places = await this.placesService.nearbySearch(
        city.lat,
        city.lng,
        radius,
        keyword,
        language
      );

      if (onProgress) onProgress({ type: 'found', count: places.length });

      for (const place of places) {
        if (seenPlaces.has(place.place_id)) continue;
        seenPlaces.add(place.place_id);

        try {
          const details = await this.placesService.placeDetails(place.place_id, language);

          if (!details.user_ratings_total || details.user_ratings_total < this.minReviews) {
            continue;
          }

          if (!details.rating || details.rating < this.minRating) {
            continue;
          }

          const business = {
            business_name: details.name,
            niche: niche.id,
            country: city.country,
            city: city.name,
            address: details.formatted_address,
            rating: details.rating,
            reviews: details.user_ratings_total,
            phone: details.international_phone_number || details.formatted_phone_number || null,
            website: details.website || null,
            maps_url: details.url,
            business_status: details.business_status,
            place_id: details.place_id
          };

          const scoring = this.scorer.calculate(business);
          
          if (scoring.score >= this.scoreThreshold) {
            const qualifiedLead = {
              ...business,
              score: scoring.score,
              category: scoring.category,
              opportunity_signals: scoring.signals
            };
            
            leads.push(qualifiedLead);

            if (onProgress) onProgress({ type: 'qualified', lead: qualifiedLead });
          }

          await new Promise(resolve => setTimeout(resolve, 300));

        } catch (error) {
          if (onProgress) onProgress({ type: 'error', error: error.message });
        }
      }

      if (onProgress) onProgress({ type: 'complete', total: leads.length });

    } catch (error) {
      if (onProgress) onProgress({ type: 'error', error: error.message });
      throw error;
    }

    return leads.sort((a, b) => b.score - a.score);
  }

  async discoverMultiple(configs) {
    const allLeads = [];

    for (const config of configs) {
      const leads = await this.discover(config);
      allLeads.push(...leads);
    }

    const uniqueLeads = Array.from(
      new Map(allLeads.map(lead => [lead.place_id, lead])).values()
    );

    return uniqueLeads.sort((a, b) => b.score - a.score);
  }
}
