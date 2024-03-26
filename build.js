import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

let ctx = null;
let watcher = null

const distDir = 'dist'

async function main () {
  await setup();
  await watch();
}


async function setup() {

  console.log("running setup")

  fs.rmSync(distDir, { recursive: true, force: true });
  
  await copyFile("src/styles.css", `${distDir}/styles.css`, true)
  await copyFile("src/index.html", `${distDir}/index.html`, false)

  await build({
    entryPoints: [
      'src/main.js', 
    ],
    bundle: true,
    entryNames: '[name]-[hash]',
    format: 'esm',
    loader: {
      '.html': 'text',
      '.css': 'text',
      '.js': 'js',
    },
    outdir: 'dist',
  })

  await loadHashedFileNames()
}

/**
 * Loads html file
 * @param {string} source - Source file path.
 * @param {string} destination - Destination file path.
 * @param {boolean} shouldHash - Should filename be hashed.
 */
async function copyFile(source, destination, shouldHash) {

  if(shouldHash){
    const timestamp = Date.now();
    const splitDestination = destination.split('.')
    
    const destinationPath = splitDestination[0]
    const fileExtension = splitDestination[1]

    const newFilePath = `${destinationPath}-${timestamp}.${fileExtension}`;


    destination = newFilePath
  } 
  
  try {
    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination)

    // Check if path exists
    await fs.promises.access(sourcePath)
    
    let destinationDir = path.dirname(destinationPath)
    // Make directory if it not already exists
    await fs.promises.mkdir(destinationDir, {recursive: true})
    await fs.promises.copyFile(sourcePath, destinationPath);

  } catch (error) {
    console.error(`Error copying file '${source}' to '${destination}':`, error);
  }

} 



async function loadHashedFileNames(){
  const htmlFile = fs.readFileSync("dist/index.html", 'utf-8')

  const jsFile = fs.readdirSync(distDir).find(file => file.endsWith('.js'));
  const cssFile = fs.readdirSync(distDir).find(file => file.endsWith('.css'));

  const modifiedHtml = htmlFile.replace('__JS__', jsFile).replace('__CSS__', cssFile);
 
  fs.promises.writeFile("dist/index.html", modifiedHtml,'utf-8');
}

async function watch() {
  console.log("Watching on changes")
  watcher = fs.watch('./src', { recursive: true, }, (eventType, filename) => {
    console.log("Changes happening")
    setup();
  });
}


process.on("SIGTERM", () => {
  if(ctx != null){
    ctx.dispose()
  }
  watcher.close();
  process.exit();
});

process.on("SIGINT", () => {
  if(ctx != null){
    ctx.dispose()
  }
  watcher.close();
  process.exit();
});

main();