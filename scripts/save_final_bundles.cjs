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

const finalData = {
  timestamp: new Date().toISOString(),
  totalBundles: bundles.length,
  totalSizeKB: bundles.reduce((sum, b) => sum + parseFloat(b.sizeKB), 0).toFixed(2),
  bundles,
};

fs.writeFileSync(
  'REMEDIATION/site_logs/final_bundle_sizes.json',
  JSON.stringify(finalData, null, 2)
);
console.log('Saved REMEDIATION/site_logs/final_bundle_sizes.json');

if (fs.existsSync('REMEDIATION/baseline/bundle_sizes.json')) {
  const baseline = JSON.parse(fs.readFileSync('REMEDIATION/baseline/bundle_sizes.json', 'utf8'));
  console.log(`Baseline Total Size: ${baseline.totalSizeKB} KB (${baseline.totalBundles} chunks)`);
  console.log(
    `Final Total Size:    ${finalData.totalSizeKB} KB (${finalData.totalBundles} chunks)`
  );
  const diffKB = (parseFloat(finalData.totalSizeKB) - parseFloat(baseline.totalSizeKB)).toFixed(2);
  console.log(`Net Change:          ${diffKB > 0 ? '+' : ''}${diffKB} KB`);
}
