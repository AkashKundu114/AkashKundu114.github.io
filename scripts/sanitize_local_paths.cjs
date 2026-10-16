const fs = require('fs');

const files = [
  'docs/PORTFOLIO_AUDIT_REPORT.md',
  'docs/PORTFOLIO_CHANGELOG.md',
  'docs/PORTFOLIO_RESOURCE_EFFICIENCY_REPORT.md',
  'docs/PROJECT_SYNCHRONIZATION_MATRIX.md',
  'audit_screenshots/audit_summary.json',
];

files.forEach((f) => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/D:\\akashkundu/g, './portfolio');
    content = content.replace(/D:\\C\.O\.P\.P\.E\.R/g, './copper');
    content = content.replace(/D:\\OphthalmoAI/g, './ophthalmoai');
    content = content.replace(/D:\\icc-clustering/g, './icc-clustering');
    content = content.replace(/D:\\AI-SATHI/g, './ai-sathi');
    content = content.replace(/D:\\Projects\\resumepilot/g, './resumepilot');
    content = content.replace(/D:\\Projects\\Stealth-Chat/g, './stealth-chat');
    content = content.replace(/D:\\[A-Za-z0-9_.\\]+/g, (match) => match.replace(/^D:\\/, ''));
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Sanitized: ${f}`);
  }
});
