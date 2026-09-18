const { Jimp } = require('jimp');

async function removeBackground() {
  try {
    const lightImage = await Jimp.read('public/logo-light.png');
    // For light image, remove white background
    lightImage.scan(0, 0, lightImage.bitmap.width, lightImage.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If color is very close to white, make transparent
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha
      }
    });
    await lightImage.write('public/logo-light-transparent.png');
    console.log("Light logo background removed!");

    const darkImage = await Jimp.read('public/logo-dark.png');
    // For dark image, remove black background
    darkImage.scan(0, 0, darkImage.bitmap.width, darkImage.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If color is very close to black, make transparent
      if (red < 20 && green < 20 && blue < 20) {
        this.bitmap.data[idx + 3] = 0; // Alpha
      }
    });
    await darkImage.write('public/logo-dark-transparent.png');
    console.log("Dark logo background removed!");
  } catch (err) {
    console.error("Error processing images:", err);
  }
}

removeBackground();
