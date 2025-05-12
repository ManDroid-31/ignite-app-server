#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// __dirname workaround for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const targetDir = process.cwd(); // Where user runs the CLI
const templateDir = path.resolve(__dirname, '../templates');

console.log(chalk.green.bold('\n🚀 Setting up your GeoFinance Backend...\n'));

fs.copy(templateDir, targetDir, { overwrite: true })
  .then(() => {
    console.log(chalk.blue('✅ Files copied to your project folder'));
    console.log(chalk.yellow('📦 Now run:'));
    console.log(chalk.cyan('\n   npm install\n   npm run dev\n'));
    console.log(chalk.green('🔥 Your backend is ready!\n'));
  })
  .catch(err => {
    console.error(chalk.red('❌ Failed to scaffold project:'), err);
    process.exit(1);
  });
