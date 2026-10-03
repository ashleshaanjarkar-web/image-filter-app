var originalImage = null;
var filterImage = null;
var canvas = document.getElementById("canvas");

// Load user uploaded image reliably across desktop and mobile devices
function upload() {
  var fileInput = document.getElementById("finput");
  
  if (fileInput.files && fileInput.files[0]) {
    // Create new SimpleImage instances from the selected file
    originalImage = new SimpleImage(fileInput);
    filterImage = new SimpleImage(fileInput);
    
    // Draw directly to canvas once loaded
    originalImage.drawTo(canvas);
  }
}

// Check if image is loaded and valid before applying filters
function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Please upload an image first!");
    return false;
  }
  return true;
}

// Reset image back to original upload
function resetImage() {
  if (imageIsLoaded(originalImage)) {
    originalImage.drawTo(canvas);
    var fileInput = document.getElementById("finput");
    filterImage = new SimpleImage(fileInput);
  }
}

// 1. Grayscale Filter Logic
function makeGrayscale() {
  if (imageIsLoaded(filterImage)) {
    for (var pixel of filterImage.pixels()) {
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
    filterImage.drawTo(canvas);
  }
}

// 2. Red Tint Filter Logic
function makeRed() {
  if (imageIsLoaded(filterImage)) {
    for (var pixel of filterImage.pixels()) {
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    }
    filterImage.drawTo(canvas);
  }
}

// 3. Rainbow Filter Logic
function makeRainbow() {
  if (imageIsLoaded(filterImage)) {
    var height = filterImage.getHeight();
    for (var pixel of filterImage.pixels()) {
      var y = pixel.getY();
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

      // Split into 7 horizontal bands (Red, Orange, Yellow, Green, Blue, Indigo, Violet)
      if (y < height / 7) {
        // Red band
        if (avg < 128) {
          pixel.setRed(2 * avg); pixel.setGreen(0); pixel.setBlue(0);
        } else {
          pixel.setRed(255); pixel.setGreen(2 * avg - 255); pixel.setBlue(2 * avg - 255);
        }
      } else if (y < (height * 2) / 7) {
        // Orange band
        if (avg < 128) {
          pixel.setRed(2 * avg); pixel.setGreen(0.8 * avg); pixel.setBlue(0);
        } else {
          pixel.setRed(255); pixel.setGreen(1.2 * avg - 51); pixel.setBlue(2 * avg - 255);
        }
      } else if (y < (height * 3) / 7) {
        // Yellow band
        if (avg < 128) {
          pixel.setRed(2 * avg); pixel.setGreen(2 * avg); pixel.setBlue(0);
        } else {
          pixel.setRed(255); pixel.setGreen(255); pixel.setBlue(2 * avg - 255);
        }
      } else if (y < (height * 4) / 7) {
        // Green band
        if (avg < 128) {
          pixel.setRed(0); pixel.setGreen(2 * avg); pixel.setBlue(0);
        } else {
          pixel.setRed(2 * avg - 255); pixel.setGreen(255); pixel.setBlue(2 * avg - 255);
        }
      } else if (y < (height * 5) / 7) {
        // Blue band
        if (avg < 128) {
          pixel.setRed(0); pixel.setGreen(0); pixel.setBlue(2 * avg);
        } else {
          pixel.setRed(2 * avg - 255); pixel.setGreen(2 * avg - 255); pixel.setBlue(255);
        }
      } else if (y < (height * 6) / 7) {
        // Indigo band
        if (avg < 128) {
          pixel.setRed(0.8 * avg); pixel.setGreen(0); pixel.setBlue(2 * avg);
        } else {
          pixel.setRed(1.2 * avg - 51); pixel.setGreen(2 * avg - 255); pixel.setBlue(255);
        }
      } else {
        // Violet band
        if (avg < 128) {
          pixel.setRed(1.6 * avg); pixel.setGreen(0); pixel.setBlue(1.6 * avg);
        } else {
          pixel.setRed(0.4 * avg + 153); pixel.setGreen(2 * avg - 255); pixel.setBlue(0.4 * avg + 153);
        }
      }
    }
    filterImage.drawTo(canvas);
  }
}
