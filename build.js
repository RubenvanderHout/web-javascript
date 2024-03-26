import { context } from 'esbuild';
import { promises as fsPromises } from 'fs';
import path from 'path';

async function setup() {
  await copyFile("src/index.html", "dist/index.html")
  await copyFile("src/styles.css", "dist/styles.css")

  let ctx = await context({
    entryPoints: [
      'src/main.js', 
    ],
    bundle: true,
    loader: {
      '.html': 'text',
      '.css': 'text',
      '.js': 'js'
    },
    format: 'esm',
    outdir: 'dist',
  });

  await ctx.watch()
  console.log('Watching...');
}

/**
 * Loads html file
 * @param {string} source - Source file path.
 * @param {string} destination - Destination file path.
 */
async function copyFile(source, destination) {
  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination)

  try {
    await fsPromises.access(sourcePath)

    const destinationDir = path.dirname(destinationPath)
    
    // Make directory if it not already exists
    await fsPromises.mkdir(destinationDir, {recursive: true})
    await fsPromises.copyFile(sourcePath, destinationPath);

  } catch (error) {
    console.error(`Error copying file '${source}' to '${destination}':`, error);
  }

} 

setup();