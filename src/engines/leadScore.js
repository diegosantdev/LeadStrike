import dotenv from 'dotenv';
dotenv.config();

export class LeadScorer {
  constructor() {
    this.weights = {
      noWebsite: parseInt(process.env.SCORE_NO_WEBSITE) || 40,
      badWebsite: parseInt(process.env.SCORE_BAD_WEBSITE) || 25,
      highReviews: parseInt(process.env.SCORE_HIGH_REVIEWS) || 30,
      goodRating: parseInt(process.env.SCORE_GOOD_RATING) || 25,
      hasContact: parseInt(process.env.SCORE_HAS_CONTACT) || 20,
      operational: parseInt(process.env.SCORE_OPERATIONAL) || 10,
    };

    const maxPossible = Object.values(this.weights).reduce((a, b) => a + b, 0);
    if (maxPossible < 100) {
      console.warn('[LeadScorer] Weights sum below 100 — HOT leads may be unreachable');
    }
  }

  calculate(business) {
    let score = 0;
    const signals = [];

    if (!business.website) {
      score += this.weights.noWebsite;
      signals.push('no website - losing 70% of search traffic');
    } else if (this.isWeakWebsite(business.website)) {
      score += this.weights.badWebsite;
      signals.push('social media only - no owned digital presence');
    }

    if (business.reviews >= 100) {
      score += this.weights.highReviews;
      signals.push(`${business.reviews} reviews - high demand, proven market`);
    } else if (business.reviews >= 50) {
      score += Math.floor(this.weights.highReviews * 0.7);
      signals.push(`${business.reviews} reviews - active customer base`);
    } else if (business.reviews >= 20) {
      score += Math.floor(this.weights.highReviews * 0.4);
      signals.push(`${business.reviews} reviews - established business`);
    }

    if (business.rating >= 4.5) {
      score += this.weights.goodRating;
      signals.push(`${business.rating}★ rating - customers love them`);
    } else if (business.rating >= 4.0) {
      score += Math.floor(this.weights.goodRating * 0.7);
      signals.push(`${business.rating}★ rating - solid reputation`);
    }

    if (business.phone) {
      score += this.weights.hasContact;
      signals.push('phone available - ready for immediate contact');
    }

    if (business.business_status === 'OPERATIONAL') {
      score += this.weights.operational;
      signals.push('operational business - money on the table NOW');
    }

    const cappedScore = Math.min(score, 100);

    return {
      score: cappedScore,
      signals,
      category: this.categorize(cappedScore),
      website_status: this.getWebsiteStatus(business.website)
    };
  }

  isWeakWebsite(url) {
    const weakDomains = [
      'facebook.com',
      'instagram.com',
      'linkedin.com',
      'twitter.com',
      'tiktok.com'
    ];

    return weakDomains.some(domain => url.toLowerCase().includes(domain));
  }

  getWebsiteStatus(url) {
    if (!url) return 'none';
    if (this.isWeakWebsite(url)) return 'social_only';
    return 'has_website';
  }

  categorize(score) {
    if (score >= 80) return 'HOT';
    if (score >= 60) return 'WARM';
    return 'COLD';
  }
}