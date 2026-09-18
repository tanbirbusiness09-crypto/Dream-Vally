const { Jimp } = require('jimp');

async function removeStar() {
  try {
    const darkImage = await Jimp.read('public/logo-dark-transparent.png');
    
    const width = darkImage.bitmap.width;
    const height = darkImage.bitmap.height;
    
    // The star is in the bottom right. Let's clear a 25% x 25% square in the bottom right corner.
    const startX = Math.floor(width * 0.75);
    const startY = Math.floor(height * 0.75);

    darkImage.scan(startX, startY, width - startX, height - startY, function(x, y, idx) {
      this.bitmap.data[idx + 3] = 0; // Set Alpha to 0
    });

    await darkImage.write('public/logo-dark-transparent.png');
    console.log("Star icon removed from the bottom right!");
  } catch (err) {
    console.error("Error processing images:", err);
  }
}

removeStar();
