const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- EXHAUSTIVE SECURITY AND PRIVACY AUDIT ---');

const findings = [];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (
      f === 'node_modules' ||
      f === '.git' ||
      f === 'dist' ||
      f === 'state' ||
      f === 'REMEDIATION'
    )
      continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else {
      checkFile(full);
    }
  }
}

function checkFile(filepath) {
  // Check file size (>1MB)
  const stat = fs.statSync(filepath);
  if (stat.size > 1024 * 1024) {
    findings.push({
      type: 'LARGE_FILE',
      file: filepath,
      size: (stat.size / (1024 * 1024)).toFixed(2) + ' MB',
    });
  }

  // Text scans for code/markdown/tex/json/html/yaml
  const ext = path.extname(filepath).toLowerCase();
  const textExts = [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.json',
    '.html',
    '.css',
    '.md',
    '.yml',
    '.yaml',
    '.tex',
    '.py',
    '.txt',
  ];
  if (textExts.includes(ext) || path.basename(filepath).startsWith('.env')) {
    try {
      const content = fs.readFileSync(filepath, 'utf8');

      // 1. Phone number scan
      if (content.includes('9064349004')) {
        findings.push({ type: 'PHONE_NUMBER_EXPOSURE', file: filepath, match: '+91 9064349004' });
      }

      // 2. Secondary personal emails
      if (content.includes('akashkundu1152@gmail.com')) {
        findings.push({
          type: 'SECONDARY_PERSONAL_EMAIL',
          file: filepath,
          match: 'akashkundu1152@gmail.com',
        });
      }
      if (content.includes('anony.mousea623@gmail.com')) {
        findings.push({
          type: 'PRIVATE_SENDER_EMAIL',
          file: filepath,
          match: 'anony.mousea623@gmail.com',
        });
      }

      // 3. Cleartext credentials / App Passwords
      if (content.includes('ahucxrkplgfkovoh')) {
        findings.push({
          type: 'LIVE_SMTP_APP_PASSWORD',
          file: filepath,
          match: 'ahucxrkplgfkovoh',
        });
      }

      // 4. Admin password hash
      if (content.includes('45cbd2273491a7d411b202c15a0ca20bbc270d3fc838cfd7f363d30e8d5a83be')) {
        findings.push({ type: 'ADMIN_HASH_REFERENCE', file: filepath, match: '45cbd22...3be' });
      }

      // 5. Absolute local paths
      const localPathMatches = content.match(/[A-Z]:\\[A-Za-z0-9_.\\]+/g);
      if (localPathMatches && !filepath.includes('site_logs') && !filepath.includes('baseline')) {
        findings.push({
          type: 'ABSOLUTE_LOCAL_PATH',
          file: filepath,
          count: localPathMatches.length,
          sample: localPathMatches[0],
        });
      }

      // 6. Generic high entropy API keys
      const apiKeyPatterns = [
        /(?:sk-[a-zA-Z0-9]{32,})/, // OpenAI
        /(?:AIza[0-9A-Za-z-_]{35})/, // Google
        /(?:ghp_[0-9a-zA-Z]{36})/, // GitHub token
        /(?:xox[baprs]-[0-9a-zA-Z]{10,48})/, // Slack
      ];
      for (const re of apiKeyPatterns) {
        if (re.test(content)) {
          findings.push({ type: 'POTENTIAL_API_KEY', file: filepath, pattern: re.toString() });
        }
      }
    } catch {
      // binary or read error
    }
  }
}

walk('.');

console.log('Total Findings:', findings.length);
fs.writeFileSync('REMEDIATION/site_logs/secrets_scan.json', JSON.stringify(findings, null, 2));

const summary = {};
findings.forEach((f) => {
  summary[f.type] = (summary[f.type] || 0) + 1;
});
console.log('Summary by type:', JSON.stringify(summary, null, 2));
