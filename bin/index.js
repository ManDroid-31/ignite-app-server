#!/usr/bin/env node

import { copy } from 'fs-extra';
import { resolve } from 'path';
import { bold, blue, yellow, cyan, green, red } from 'chalk';

// Paths
const targetDir = process.cwd();
const templateDir = resolve(__dirname, '../templates');

console.log(bold.green('\n🚀 Setting up your Ignite App Server...\n'));

copy(templateDir, targetDir, { overwrite: true })
  .then(() => {
    console.log(blue('✅ Project files copied!'));
    console.log(yellow('\n📦 Run the following commands:'));
    console.log(cyan('\n   npm install'));
    console.log(cyan('   npm run dev\n'));
    console.log(green.bold('🔥 Your backend server is ready!\n'));
  })
  .catch((err) => {
    console.error(red.bold('❌ Error while copying template:'), err);
    process.exit(1);
  });
