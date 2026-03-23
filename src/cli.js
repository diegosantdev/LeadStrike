#!/usr/bin/env node

import dotenv from 'dotenv';
import chalk from 'chalk';
import enquirer from 'enquirer';
import cliProgress from 'cli-progress';
import { LeadDiscoveryEngine } from './engines/leadDiscovery.js';
import { JSONExporter } from './exports/jsonExporter.js';
import { NICHES, getAllCategories } from './config/niches.js';
import { COUNTRIES } from './config/countries.js';

dotenv.config();

const { Select, MultiSelect, Confirm } = enquirer;

const customStyles = {
  primary: chalk.white,
  success: chalk.green,
  danger: chalk.red,
  warning: chalk.yellow,
  muted: chalk.gray,
  disabled: chalk.gray,
  dark: chalk.gray,
  underline: chalk.white,
  heading: chalk.white.bold,
  info: chalk.white,
  em: chalk.white,
  strong: chalk.white.bold
};

function isCancelError(err) {
  return err === '' ||
    err?.message === 'readline was closed' ||
    err?.code === 'ERR_USE_AFTER_CLOSE' ||
    err?.isTtyError;
}

process.on('uncaughtException', (err) => {
  if (isCancelError(err)) {
    console.log(chalk.gray('\n\n👋 Cancelled. See you next time!\n'));
    process.exit(0);
  }
  throw err;
});

process.on('SIGINT', () => {
  console.log(chalk.gray('\n\n👋 Cancelled. See you next time!\n'));
  process.exit(0);
});

async function showSplash() {
  console.clear();

  const textLogo = `
   __                   _______ __       _ __     
  / /   ___  ____ _____/ / ___// /______(_) /_____
 / /   / _ \\/ __ \`/ __  /\\__ \\/ __/ ___/ / //_/ _ \\
/ /___/  __/ /_/ / /_/ /___/ / /_/ /  / / ,< /  __/
/_____/\\___/\\__,_/\\__,_//____/\\__/_/  /_/_/|_|\\___/
  `;

  console.log(chalk.white.bold(textLogo));
  console.log(chalk.white('High-Intent Lead Discovery Engine v1.0'));
  console.log(chalk.gray('Find businesses losing money due to weak digital presence\n'));
}

async function startCLI() {
  try {
    await showSplash();

    if (!process.env.GOOGLE_PLACES_API_KEY) {
      console.log(chalk.red('❌ GOOGLE_PLACES_API_KEY not found in .env file'));
      console.log(chalk.yellow('\nPlease create a .env file with your API key:'));
      console.log(chalk.gray('  cp .env.example .env'));
      console.log(chalk.white('  GOOGLE_PLACES_API_KEY=your_key_here\n'));
      process.exit(1);
    }

    const modePrompt = new Select({
      name: 'mode',
      message: 'Select discovery mode:',
      choices: [
        { name: 'single',  message: '⚡ Quick Hunt - Single city + niche (2-5 min)' },
        { name: 'multi',   message: '📦 Batch Prospecting - Multiple targets (10-30 min)' },
        { name: 'country', message: '🌍 Market Sweep - Entire country coverage (1-3 hours)' }
      ],
      styles: customStyles
    });

    const mode = await modePrompt.run();

    let searchConfigs = [];

    if (mode === 'single') {
      searchConfigs = await configureSingleSearch();
    } else if (mode === 'multi') {
      searchConfigs = await configureMultiSearch();
    } else {
      searchConfigs = await configureCountrySearch();
    }

    const estimatedMinutes = Math.max(1, Math.ceil(searchConfigs.length * 1.5));

    console.log(chalk.white('\n' + '═'.repeat(60)));
    console.log(chalk.white.bold('🎯 Ready to Start'));
    console.log(chalk.white('═'.repeat(60)));
    console.log(chalk.white(`\n   Searches: ${searchConfigs.length}`));
    console.log(chalk.gray(`   Time: ~${estimatedMinutes} minute${estimatedMinutes > 1 ? 's' : ''}`));
    console.log(chalk.white(`   Expected: ${Math.ceil(searchConfigs.length * 3)}-${Math.ceil(searchConfigs.length * 8)} opportunities`));
    console.log(chalk.white('\n' + '═'.repeat(60) + '\n'));

    const confirmPrompt = new Confirm({
      name: 'confirm',
      message: 'Start discovery?',
      styles: customStyles
    });

    if (!await confirmPrompt.run()) {
      console.log(chalk.gray('Operation cancelled.'));
      process.exit(0);
    }

    await executeSearch(searchConfigs);

  } catch (err) {
    if (isCancelError(err)) {
      console.log(chalk.gray('\n👋 Cancelled. See you next time!\n'));
      process.exit(0);
    }

    console.error(chalk.red('\n❌ Error:'), err.message);
    process.exit(1);
  }
}

async function configureSingleSearch() {
  const countryPrompt = new Select({
    name: 'country',
    message: 'Select country:',
    choices: COUNTRIES.map(c => ({ name: c.code, message: `${c.name} (${c.code})` })),
    styles: customStyles
  });

  const countryCode = await countryPrompt.run();
  const country = COUNTRIES.find(c => c.code === countryCode);

  const cityPrompt = new Select({
    name: 'city',
    message: 'Select city:',
    choices: country.cities.map(c => c.name),
    styles: customStyles
  });

  const cityName = await cityPrompt.run();
  const city = country.cities.find(c => c.name === cityName);

  const categoryPrompt = new Select({
    name: 'category',
    message: 'Select niche category:',
    choices: getAllCategories(),
    styles: customStyles
  });

  const category = await categoryPrompt.run();
  const nichesInCategory = NICHES.filter(n => n.category === category);

  const nichePrompt = new Select({
    name: 'niche',
    message: 'Select niche:',
    choices: nichesInCategory.map(n => ({ name: n.id, message: n.name })),
    styles: customStyles
  });

  const nicheId = await nichePrompt.run();
  const niche = NICHES.find(n => n.id === nicheId);

  return [{
    city: { ...city, country: countryCode, language: country.language },
    niche,
    language: country.language
  }];
}

async function configureMultiSearch() {
  const countriesPrompt = new MultiSelect({
    name: 'countries',
    message: 'Select countries (space to select, enter to confirm):',
    choices: COUNTRIES.map(c => ({ name: c.code, message: `${c.name} (${c.code})` })),
    limit: 10,
    styles: customStyles
  });

  const selectedCountries = await countriesPrompt.run();

  const categoryPrompt = new MultiSelect({
    name: 'categories',
    message: 'Select niche categories:',
    choices: getAllCategories(),
    limit: 10,
    styles: customStyles
  });

  const selectedCategories = await categoryPrompt.run();
  const selectedNiches = NICHES.filter(n => selectedCategories.includes(n.category));

  const configs = [];
  for (const countryCode of selectedCountries) {
    const country = COUNTRIES.find(c => c.code === countryCode);
    for (const city of country.cities) {
      for (const niche of selectedNiches) {
        configs.push({
          city: { ...city, country: countryCode, language: country.language },
          niche,
          language: country.language
        });
      }
    }
  }

  return configs;
}

async function configureCountrySearch() {
  const countryPrompt = new Select({
    name: 'country',
    message: 'Select country to scan:',
    choices: COUNTRIES.map(c => ({ name: c.code, message: `${c.name} (${c.code})` })),
    styles: customStyles
  });

  const countryCode = await countryPrompt.run();
  const country = COUNTRIES.find(c => c.code === countryCode);

  const categoryPrompt = new MultiSelect({
    name: 'categories',
    message: 'Select niche categories:',
    choices: getAllCategories(),
    limit: 10,
    styles: customStyles
  });

  const selectedCategories = await categoryPrompt.run();
  const selectedNiches = NICHES.filter(n => selectedCategories.includes(n.category));

  const configs = [];
  for (const city of country.cities) {
    for (const niche of selectedNiches) {
      configs.push({
        city: { ...city, country: countryCode, language: country.language },
        niche,
        language: country.language
      });
    }
  }

  return configs;
}

async function executeSearch(configs) {
  const engine = new LeadDiscoveryEngine(process.env.GOOGLE_PLACES_API_KEY);
  const exporter = new JSONExporter();

  const progressBar = new cliProgress.SingleBar({
    format: chalk.white('{bar}') + ' {percentage}% | {value}/{total} | {leads} opportunities',
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true
  });

  progressBar.start(configs.length, 0, { leads: 0 });

  const allLeads = [];
  const seenPlaceIds = new Set();
  let completed = 0;

  for (const config of configs) {
    try {
      await engine.discover({
        ...config,
        onProgress: (event) => {
          if (event.type === 'qualified') {
            if (!seenPlaceIds.has(event.lead.place_id)) {
              seenPlaceIds.add(event.lead.place_id);
              allLeads.push(event.lead);
              progressBar.update(completed, { leads: allLeads.length });
            }
          }
        }
      });

      completed++;
      progressBar.update(completed, { leads: allLeads.length });

    } catch (error) {
      completed++;
      progressBar.update(completed, { leads: allLeads.length });
      console.error(chalk.red(`\nError in ${config.city.name} - ${config.niche.name}: ${error.message}`));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  progressBar.stop();

  allLeads.sort((a, b) => b.score - a.score);

  const hotCount  = allLeads.filter(l => l.category === 'HOT').length;
  const warmCount = allLeads.filter(l => l.category === 'WARM').length;
  const coldCount = allLeads.filter(l => l.category === 'COLD').length;

  console.log(chalk.white('\n' + '═'.repeat(60)));
  console.log(chalk.white.bold('           🎯 DISCOVERY COMPLETE'));
  console.log(chalk.white('═'.repeat(60)));

  if (allLeads.length === 0) {
    console.log(chalk.yellow('\n⚠️  No opportunities found matching your criteria.'));
    console.log(chalk.gray('\nTry adjusting filters in .env:'));
    console.log(chalk.gray('  • Lower MIN_REVIEW_COUNT (currently 20)'));
    console.log(chalk.gray('  • Lower MIN_RATING (currently 4.0)'));
    console.log(chalk.gray('  • Lower SCORE_THRESHOLD (currently 80)'));
  } else {
    const avgScore = Math.round(allLeads.reduce((sum, l) => sum + l.score, 0) / allLeads.length);
    const conversionRate = Math.round((hotCount / allLeads.length) * 100);

    console.log(chalk.green(`\n✅ Found ${allLeads.length} qualified opportunities`));
    console.log('');
    console.log(chalk.red(`   🔥 ${hotCount} HOT leads`)  + chalk.gray(' - Contact immediately'));
    console.log(chalk.yellow(`   🟡 ${warmCount} WARM leads`) + chalk.gray(' - Qualified prospects'));
    console.log(chalk.gray(`   ⚪ ${coldCount} COLD leads`)  + chalk.gray(' - Nurture campaign'));
    console.log('');
    console.log(chalk.white(`📊 Average score: ${avgScore}/100`));
    console.log(chalk.white(`💰 High-intent rate: ${conversionRate}%`));
    console.log(chalk.white('\n' + '─'.repeat(60)));

    const exportPrompt = new Select({
      name: 'export',
      message: 'Export results:',
      choices: ['JSON', 'CSV', 'Both', 'Skip'],
      styles: customStyles
    });

    const exportFormat = await exportPrompt.run();

    if (exportFormat !== 'Skip') {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      console.log('');

      if (exportFormat === 'JSON' || exportFormat === 'Both') {
        const jsonPath = exporter.export(allLeads, `opportunities-${timestamp}.json`);
        console.log(chalk.green(`✅ JSON saved: ${jsonPath}`));
      }

      if (exportFormat === 'CSV' || exportFormat === 'Both') {
        const csvPath = exporter.exportCSV(allLeads, `opportunities-${timestamp}.csv`);
        console.log(chalk.green(`✅ CSV saved: ${csvPath}`));
      }

      console.log('');
      console.log(chalk.white('💡 Next Steps:'));
      console.log(chalk.gray(`   1. Start with ${hotCount} HOT leads (highest conversion)`));
      console.log(chalk.gray('   2. Use opportunity_signals for your pitch'));
      console.log(chalk.gray('   3. Expected close rate: 15-30% on HOT leads'));
    }
  }

  console.log(chalk.white('\n' + '═'.repeat(60)));
  console.log(chalk.white.bold('           LeadStrike - Mission Complete'));
  console.log(chalk.white('═'.repeat(60) + '\n'));
}

startCLI().catch(err => {
  if (isCancelError(err)) {
    console.log(chalk.gray('\n👋 Cancelled. See you next time!\n'));
    process.exit(0);
  }

  console.error(chalk.red('\n❌ Fatal Error:'), err.message);
  process.exit(1);
});