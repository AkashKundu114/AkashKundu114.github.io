const fs = require('fs');
const path = require('path');

const distAssets = 'dist/assets';
const bundles = [];

if (fs.existsSync(distAssets)) {
  const files = fs.readdirSync(distAssets);
  for (const f of files) {
    const full = path.join(distAssets, f);
    const stat = fs.statSync(full);
    bundles.push({
      file: f,
      sizeBytes: stat.size,
      sizeKB: (stat.size / 1024).toFixed(2),
    });
  }
}

bundles.sort((a, b) => b.sizeBytes - a.sizeBytes);

fs.writeFileSync(
  'REMEDIATION/baseline/bundle_sizes.json',
  JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      totalBundles: bundles.length,
      totalSizeKB: bundles.reduce((sum, b) => sum + parseFloat(b.sizeKB), 0).toFixed(2),
      bundles,
    },
    null,
    2
  )
);

console.log('Saved baseline bundle sizes to REMEDIATION/baseline/bundle_sizes.json');
