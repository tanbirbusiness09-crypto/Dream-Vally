const { Jimp } = require('jimp');

async function removeBackground() {
  try {
    const img = await Jimp.read('public/assets/hero/hero_app_shopping.jpg');
    const width = img.bitmap.width;
    const height = img.bitmap.height;
    
    // Visited array
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Push all border pixels
    for (let x = 0; x < width; x++) {
      queue.push(x, 0);
      queue.push(x, height - 1);
      visited[x] = 1;
      visited[(height - 1) * width + x] = 1;
    }
    for (let y = 0; y < height; y++) {
      queue.push(0, y);
      queue.push(width - 1, y);
      visited[y * width] = 1;
      visited[y * width + (width - 1)] = 1;
    }

    let head = 0;
    while (head < queue.length) {
      const x = queue[head++];
      const y = queue[head++];
      const idx = (y * width + x) * 4;
      
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      // If it's a background pixel (neutral grey/white with low saturation)
      const isBg = (min > 175 && diff < 35) || (min > 210);
      
      if (isBg) {
        // Make transparent
        img.bitmap.data[idx + 3] = 0;
        
        // Check 4 neighbors
        const neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1]
        ];
        
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nPos = ny * width + nx;
            if (!visited[nPos]) {
              visited[nPos] = 1;
              queue.push(nx, ny);
            }
          }
        }
      }
    }

    // Secondary pass: feather any remaining pixels with min > 220
    img.scan(0, 0, width, height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      if (r > 230 && g > 230 && b > 230) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await img.write('public/assets/hero/hero_app_shopping_clean.png');
    console.log("Hero cutout background saved to hero_app_shopping_clean.png!");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

removeBackground();

removeBackground();
