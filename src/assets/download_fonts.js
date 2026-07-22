const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(__dirname, 'fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Download highly optimized WOFF2 font files from unpkg npm registry
const fontUrls = {
  'italiana-regular.woff2': 'https://unpkg.com/@fontsource/italiana/files/italiana-latin-400-normal.woff2',
  'montserrat-regular.woff2': 'https://unpkg.com/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2',
  'montserrat-bold.woff2': 'https://unpkg.com/@fontsource/montserrat/files/montserrat-latin-700-normal.woff2'
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    // Support absolute & relative redirects (unpkg redirects to version-specific paths)
    function get(requestUrl) {
      https.get(requestUrl, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          let redirectUrl = response.headers.location;
          if (redirectUrl.startsWith('/')) {
            redirectUrl = 'https://unpkg.com' + redirectUrl;
          }
          get(redirectUrl);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    
    get(url);
  });
}

async function start() {
  console.log("Starting Fontsource luxury font downloads for sheraz.pk...");
  for (const [filename, url] of Object.entries(fontUrls)) {
    const dest = path.join(fontsDir, filename);
    console.log(`Downloading ${filename} from npm registry CDN...`);
    try {
      await downloadFile(url, dest);
      console.log(`Successfully downloaded: ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
  console.log("Font downloads complete!");
}

start();
