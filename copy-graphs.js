// Node.js script to copy graphs - avoids PowerShell Arabic encoding issues
const fs = require('fs');
const path = require('path');

const base = 'c:/Users/ayham/COE-AIS/WeatherData/WEB';
const srcBase = path.join(base, 'graphs');
const dstBase = path.join(base, 'public', 'graphs');

// Read actual folder names from filesystem
const folders = fs.readdirSync(srcBase, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log('Found folders:', folders);

// Map folder to english key based on prefix/content
const keyMap = {
  'مخططات درجات الحرارة': 'temperature',
  'مخطط سقوط الامطار': 'rainfall',
  'مخطط الرطوبة النسبية': 'humidity',
  'مخطط التبخر': 'evaporation',
  'مخطط سرعة الرياح': 'wind',
  'مخطط ساعات الشمس': 'sunshine',
  'مخطط الارتفاع عن سطح البحر': 'pressure',
};

let totalCopied = 0;

folders.forEach(folder => {
  const englishKey = keyMap[folder];
  if (!englishKey) {
    console.log('No mapping for:', folder);
    return;
  }

  const srcFolder = path.join(srcBase, folder);
  const dstFolder = path.join(dstBase, englishKey);

  if (!fs.existsSync(dstFolder)) {
    fs.mkdirSync(dstFolder, { recursive: true });
  }

  const files = fs.readdirSync(srcFolder).filter(f => f.endsWith('.png') || f.endsWith('.PNG'));
  files.forEach(file => {
    fs.copyFileSync(path.join(srcFolder, file), path.join(dstFolder, file));
    totalCopied++;
  });

  console.log(`${englishKey}: ${files.length} files copied`);
});

console.log(`\nTotal: ${totalCopied} files copied successfully`);
