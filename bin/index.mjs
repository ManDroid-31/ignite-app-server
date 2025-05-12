#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const targetDir = process.cwd();
const templateDir = path.resolve(__dirname, '../templates');

console.log(chalk.green.bold('\n🚀 Setting up your GeoFinance Backend...\n'));

async function copyFiles(srcDir, destDir) {
  try {
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    await Promise.all(entries.map(async (entry) => {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await copyFiles(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }));
  } catch (err) {
    console.error(chalk.red('❌ Failed during copying:'), err);
    process.exit(1);
  }
}

(async () => {
  await copyFiles(templateDir, targetDir);
  console.log(chalk.blue('✅ Files copied to your project folder'));
  console.log(chalk.yellow('📦 Now run:'));
  console.log(chalk.cyan('\n   npm install\n   npm run dev\n'));
  console.log(chalk.green('🔥 Your backend is ready!\n'));
})();
