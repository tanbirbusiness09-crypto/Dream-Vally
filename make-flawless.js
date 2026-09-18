const { Jimp } = require('jimp');

async function createFlawlessCutout() {
  try {
    const img = await Jimp.read('public/assets/hero/hero_app_shopping.jpg');
    const width = img.bitmap.width;
    const height = img.bitmap.height;

    // Corner background sample
    const sampleIdx = 0;
    const bgR = img.bitmap.data[0];
    const bgG = img.bitmap.data[1];
    const bgB = img.bitmap.data[2];
    console.log(`Sample corner color: R=${bgR}, G=${bgG}, B=${bgB}`);

    const visited = new Uint8Array(width * height);
    // Queue as a typed Int32Array for fast execution
    const queue = new Int32Array(width * height * 2);
    let head = 0;
    let tail = 0;

    // Push all border pixels
    for (let x = 0; x < width; x++) {
      queue[tail++] = x; queue[tail++] = 0;
      visited[x] = 1;
      const bIdx = (height - 1) * width + x;
      queue[tail++] = x; queue[tail++] = height - 1;
      visited[bIdx] = 1;
    }
    for (let y = 0; y < height; y++) {
      const lIdx = y * width;
      if (!visited[lIdx]) {
        queue[tail++] = 0; queue[tail++] = y;
        visited[lIdx] = 1;
      }
      const rIdx = y * width + (width - 1);
      if (!visited[rIdx]) {
        queue[tail++] = width - 1; queue[tail++] = y;
        visited[rIdx] = 1;
      }
    }

    while (head < tail) {
      const x = queue[head++];
      const y = queue[head++];
      const idx = (y * width + x) * 4;

      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];

      // Distance from neutral light background
      const dist = Math.hypot(r - bgR, g - bgG, b - bgB);
      const isLightNeutral = (r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25);

      if (dist < 60 || isLightNeutral) {
        img.bitmap.data[idx + 3] = 0; // completely transparent

        // Neighbors
        const neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1]
        ];

        for (let i = 0; i < 4; i++) {
          const nx = neighbors[i][0];
          const ny = neighbors[i][1];
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nPos = ny * width + nx;
            if (!visited[nPos]) {
              visited[nPos] = 1;
              queue[tail++] = nx;
              queue[tail++] = ny;
            }
          }
        }
      }
    }

    // Pass 2: Clean up any isolated light background pixels that weren't caught
    img.scan(0, 0, width, height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      if (r > 220 && g > 220 && b > 220 && Math.abs(r - g) < 15 && Math.abs(g - b) < 15) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await img.write('public/assets/hero/hero_app_shopping_flawless.png');
    console.log("Successfully created public/assets/hero/hero_app_shopping_flawless.png with zero border artifacts!");
  } catch (err) {
    console.error("Error creating flawless cutout:", err);
  }
}

createFlawlessCutout();
