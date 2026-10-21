const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const imagesDir = path.join(projectRoot, 'public', 'images');

const imageExtensions = ['.jpg', '.jpeg', '.png'];

function getAllImages(dir, images = []) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return images;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImages(filePath, images);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        images.push(filePath);
      }
    }
  }
  
  return images;
}

async function convertImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const webpPath = inputPath.replace(ext, '.webp');
  
  // Skip if already converted
  if (fs.existsSync(webpPath)) {
    console.log(`  - Already exists: ${path.basename(webpPath)}`);
    return;
  }
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Converting: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);
    
    await image
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✓ Saved ${savings}% (${(originalSize/1024).toFixed(1)}KB → ${(webpSize/1024).toFixed(1)}KB)`);
    
  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  }
}

async function main() {
  console.log('Image Optimization Script');
  console.log('============================\n');
  
  const allImages = getAllImages(imagesDir);
  console.log(`Found ${allImages.length} images to convert\n`);
  
  // Hero images first (priority)
  const heroImages = allImages.filter(img => 
    img.includes('Homepage') || img.includes('Hero')
  );
  
  const otherImages = allImages.filter(img => 
    !img.includes('Homepage') && !img.includes('Hero')
  );
  
  console.log('Processing Hero Images (priority)...\n');
  for (const img of heroImages) {
    await convertImage(img);
  }
  
  console.log('\nProcessing Other Images...\n');
  for (const img of otherImages) {
    await convertImage(img);
  }
  
  console.log('\nImage conversion complete!');
}

main().catch(console.error);