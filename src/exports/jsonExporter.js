import fs from 'fs';
import path from 'path';

export class JSONExporter {
  export(leads, filename) {
    const timestamp = new Date().toISOString().split('T')[0];
    const outputDir = path.resolve(process.cwd(), 'output');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fullPath = path.join(outputDir, filename || `opportunities-${timestamp}.json`);

    const hotCount = leads.filter(l => l.category === 'HOT').length;
    const warmCount = leads.filter(l => l.category === 'WARM').length;
    const coldCount = leads.filter(l => l.category === 'COLD').length;

    const output = {
      generated_at: new Date().toISOString(),
      total_opportunities: leads.length,
      categories: {
        hot: hotCount,
        warm: warmCount,
        cold: coldCount
      },
      conversion_intelligence: {
        high_intent_rate: leads.length > 0 ? Math.round((hotCount / leads.length) * 100) : 0,
        average_score: leads.length > 0 
          ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)
          : 0,
        expected_close_rate: '15-30% on HOT leads'
      },
      opportunities: leads.map(lead => ({
        business_name: lead.business_name,
        niche: lead.niche,
        country: lead.country,
        city: lead.city,
        address: lead.address,
        rating: lead.rating,
        reviews: lead.reviews,
        phone: lead.phone,
        website: lead.website,
        maps_url: lead.maps_url,
        score: lead.score,
        category: lead.category,
        opportunity_signals: lead.opportunity_signals
      }))
    };

    fs.writeFileSync(fullPath, JSON.stringify(output, null, 2));
    return fullPath;
  }

  exportCSV(leads, filename) {
    const timestamp = new Date().toISOString().split('T')[0];
    const outputDir = path.resolve(process.cwd(), 'output');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fullPath = path.join(outputDir, filename || `opportunities-${timestamp}.csv`);

    const headers = [
      'Business Name',
      'Niche',
      'Country',
      'City',
      'Address',
      'Rating',
      'Reviews',
      'Phone',
      'Website',
      'Score',
      'Category',
      'Maps URL'
    ];

    const rows = leads.map(lead => [
      this.escapeCSV(lead.business_name),
      lead.niche,
      lead.country,
      lead.city,
      this.escapeCSV(lead.address),
      lead.rating,
      lead.reviews,
      lead.phone || '',
      lead.website || '',
      lead.score,
      lead.category,
      lead.maps_url
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    fs.writeFileSync(fullPath, csv);
    return fullPath;
  }

  escapeCSV(str) {
    if (!str) return '';
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }
}
