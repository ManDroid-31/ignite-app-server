#!/usr/bin/env node

import { promises, createReadStream, createWriteStream } from 'fs';
import { join, resolve } from 'path';
import { green, blue, yellow, cyan, red } from 'chalk';
import { pipeline } from 'stream/promises';

// Helper to copy directory recursively
async function copyDir(src, dest) {
  await promises.mkdir(dest, { recursive: true });
  const entries = await promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await pipeline(createReadStream(srcPath), createWriteStream(destPath));
    }
  }
}

// Main
(async () => {
  const targetDir = process.cwd();
  const templateDir = resolve(__dirname, '../templates');

  console.log(green.bold('\n🚀 Setting up your Ignite App Server...\n'));

  try {
    await copyDir(templateDir, targetDir);

    console.log(blue('✅ Project files copied successfully!'));
    console.log(yellow('\n📦 Run the following commands:'));
    console.log(cyan('\n   npm install'));
    console.log(cyan('   npm run dev\n'));
    console.log(green.bold('🔥 Your backend server is ready!\n'));
  } catch (err) {
    console.error(red.bold('❌ Error while copying files:'), err);
    process.exit(1);
  }
})();
