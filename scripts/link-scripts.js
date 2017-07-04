#!/usr/bin/env node

const { resolve, join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

const readdir = promisify(fs.readdir);

const sourceDir = resolve(__dirname, '../dist');

const getInDesignDir = async () => {
  const apps = await readdir('/Applications', 'utf8');
  const inDesignDir = apps.find(entry => entry.includes('Adobe InDesign'));

  return resolve('/Applications', inDesignDir, 'Scripts/Scripts Panel');
};

const getScripts = async () => {
  const scripts = await readdir(sourceDir, 'utf8');
  return scripts;
};

const copyFile = (source, dest) => {
  fs.createReadStream(source).pipe(fs.createWriteStream(dest));
};

const run = async () => {
  try {
    const destDir = await getInDesignDir();
    const scripts = await getScripts();

    scripts.forEach(script => {
      const source = resolve(sourceDir, script);
      const dest = resolve(destDir, script);

      copyFile(source, dest);
    });
  } catch (e) {
    console.error(e);
  }
};

run();
