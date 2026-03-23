import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export class PlacesService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async withRetry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  async nearbySearch(lat, lng, radius, keyword, language = 'en') {
    try {
      let results = [];
      let nextPageToken = null;

      do {
        const params = {
          location: { lat, lng },
          radius,
          keyword,
          key: this.apiKey,
          language,
        };

        if (nextPageToken) params.pagetoken = nextPageToken;

        const response = await this.withRetry(() =>
          client.placesNearby({ params, timeout: 30000 })
        );

        results = results.concat(response.data.results);
        nextPageToken = response.data.next_page_token;

        if (nextPageToken) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } while (nextPageToken && results.length < 60);

      return results;
    } catch (error) {
      error.message = `Nearby search failed: ${error.message}`;
      throw error;
    }
  }

  async placeDetails(placeId, language = 'en') {
    try {
      const response = await this.withRetry(() =>
        client.placeDetails({
          params: {
            place_id: placeId,
            fields: [
              'place_id', 'name', 'formatted_address',
              'user_ratings_total', 'rating',
              'formatted_phone_number', 'international_phone_number',
              'website', 'url', 'business_status'
            ],
            key: this.apiKey,
            language,
          },
          timeout: 30000,
        })
      );

      return response.data.result;
    } catch (error) {
      error.message = `Place details failed: ${error.message}`;
      throw error;
    }
  }
}