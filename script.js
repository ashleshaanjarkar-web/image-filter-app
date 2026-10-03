let originalImageData = null;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Load user uploaded image reliably using standard HTML Canvas & FileReader
function uploadImage() {
  const fileInput = document.getElementById("finput");
  const file = fileInput.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      // Set canvas dimensions to match image resolution
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw uploaded image onto canvas
      ctx.drawImage(img, 0, 0);

      // Store original pixel data backup for resets
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

// Helper: Ensure an image is loaded before processing
function imageIsLoaded() {
  if (!originalImageData) {
    alert("Please choose an image first!");
    return false;
  }
  return true;
}

// Reset canvas back to original image
function resetImage() {
  if (imageIsLoaded()) {
    ctx.putImageData(originalImageData, 0, 0);
  }
}

// 1. Grayscale Filter
function makeGrayscale() {
  if (!imageIsLoaded()) return;

  // Reset to base image first before applying filter
  ctx.putImageData(originalImageData, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;     // Red
    data[i + 1] = avg; // Green
    data[i + 2] = avg; // Blue
  }

  ctx.putImageData(imageData, 0, 0);
}

// 2. Red Tint Filter
function makeRed() {
  if (!imageIsLoaded()) return;

  ctx.putImageData(originalImageData, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (avg < 128) {
      data[i] = 2 * avg;
      data[i + 1] = 0;
      data[i + 2] = 0;
    } else {
      data[i] = 255;
      data[i + 1] = 2 * avg - 255;
      data[i + 2] = 2 * avg - 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// 3. Rainbow Filter
function makeRainbow() {
  if (!imageIsLoaded()) return;

  ctx.putImageData(originalImageData, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const height = canvas.height;
  const width = canvas.width;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

      // 7 Horizontal Bands (Red, Orange, Yellow, Green, Blue, Indigo, Violet)
      if (y < height / 7) {
        // Red
        if (avg < 128) {
          data[i] = 2 * avg; data[i + 1] = 0; data[i + 2] = 0;
        } else {
          data[i] = 255; data[i + 1] = 2 * avg - 255; data[i + 2] = 2 * avg - 255;
        }
      } else if (y < (height * 2) / 7) {
        // Orange
        if (avg < 128) {
          data[i] = 2 * avg; data[i + 1] = 0.8 * avg; data[i + 2] = 0;
        } else {
          data[i] = 255; data[i + 1] = 1.2 * avg - 51; data[i + 2] = 2 * avg - 255;
        }
      } else if (y < (height * 3) / 7) {
        // Yellow
        if (avg < 128) {
          data[i] = 2 * avg; data[i + 1] = 2 * avg; data[i + 2] = 0;
        } else {
          data[i] = 255; data[i + 1] = 255; data[i + 2] = 2 * avg - 255;
        }
      } else if (y < (height * 4) / 7) {
        // Green
        if (avg < 128) {
          data[i] = 0; data[i + 1] = 2 * avg; data[i + 2] = 0;
        } else {
          data[i] = 2 * avg - 255; data[i + 1] = 255; data[i + 2] = 2 * avg - 255;
        }
      } else if (y < (height * 5) / 7) {
        // Blue
        if (avg < 128) {
          data[i] = 0; data[i + 1] = 0; data[i + 2] = 2 * avg;
        } else {
          data[i] = 2 * avg - 255; data[i + 1] = 2 * avg - 255; data[i + 2] = 255;
        }
      } else if (y < (height * 6) / 7) {
        // Indigo
        if (avg < 128) {
          data[i] = 0.8 * avg; data[i + 1] = 0; data[i + 2] = 2 * avg;
        } else {
          data[i] = 1.2 * avg - 51; data[i + 1] = 2 * avg - 255; data[i + 2] = 255;
        }
      } else {
        // Violet
        if (avg < 128) {
          data[i] = 1.6 * avg; data[i + 1] = 0; data[i + 2] = 1.6 * avg;
        } else {
          data[i] = 0.4 * avg + 153; data[i + 1] = 2 * avg - 255; data[i + 2] = 0.4 * avg + 153;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
