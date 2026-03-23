import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export class PlacesService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async nearbySearch(lat, lng, radius, keyword, language = 'en') {
    try {
      let results = [];
      let nextPageToken = null;

      do {
        const response = await client.placesNearby({
          params: {
            location: { lat, lng },
            radius,
            keyword,
            key: this.apiKey,
            language,
            pagetoken: nextPageToken,
          },
          timeout: 30000,
        });

        results = results.concat(response.data.results);
        nextPageToken = response.data.next_page_token;

        if (nextPageToken) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } while (nextPageToken && results.length < 60);

      return results;
    } catch (error) {
      throw new Error(`Nearby search failed: ${error.message}`);
    }
  }

  async placeDetails(placeId, language = 'en') {
    try {
      const response = await client.placeDetails({
        params: {
          place_id: placeId,
          fields: [
            'place_id', 'name', 'formatted_address', 'geometry',
            'types', 'user_ratings_total', 'rating',
            'formatted_phone_number', 'international_phone_number',
            'website', 'url', 'business_status'
          ],
          key: this.apiKey,
          language,
        },
        timeout: 30000,
      });
      return response.data.result;
    } catch (error) {
      throw new Error(`Place details failed: ${error.message}`);
    }
  }
}
