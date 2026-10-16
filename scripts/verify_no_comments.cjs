const fs = require('fs');
const path = require('path');
const ts = require('typescript');

let failureCount = 0;
const violations = [];

function checkTsFile(filepath) {
  const sourceText = fs.readFileSync(filepath, 'utf8');
  const sf = ts.createSourceFile(
    filepath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.LanguageVariant.JSX
  );
  const fileViolations = [];
  const seen = new Set();

  function addViolation(r) {
    const key = `${r.pos}-${r.end}`;
    if (!seen.has(key)) {
      seen.add(key);
      fileViolations.push({
        pos: r.pos,
        end: r.end,
        text: sourceText.substring(r.pos, r.end).trim(),
      });
    }
  }

  // Scan all tokens in source file for trivia comments
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    false,
    ts.LanguageVariant.JSX,
    sourceText
  );
  let token = scanner.scan();
  while (token !== ts.SyntaxKind.EndOfFileToken) {
    const leading = ts.getLeadingCommentRanges(sourceText, scanner.getTokenPos());
    if (leading) leading.forEach(addViolation);
    const trailing = ts.getTrailingCommentRanges(sourceText, scanner.getTextPos());
    if (trailing) trailing.forEach(addViolation);
    token = scanner.scan();
  }
  const trailingEof = ts.getTrailingCommentRanges(sourceText, scanner.getTextPos());
  if (trailingEof) trailingEof.forEach(addViolation);

  // Also check AST JsxExpression nodes for empty comment containers { /* ... */ }
  function checkNode(node) {
    if (ts.isJsxExpression(node) && !node.expression) {
      const innerText = sourceText.substring(node.pos, node.end);
      if (/\/\*[\s\S]*?\*\//.test(innerText) || /\/\//.test(innerText)) {
        addViolation({ pos: node.pos, end: node.end });
      }
    }
    ts.forEachChild(node, checkNode);
  }
  checkNode(sf);

  if (fileViolations.length > 0) {
    violations.push({ file: filepath, count: fileViolations.length, samples: fileViolations });
    failureCount += fileViolations.length;
  }
}

function checkCssFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const matches = content.match(/\/\*[\s\S]*?\*\//g);
  if (matches && matches.length > 0) {
    violations.push({
      file: filepath,
      count: matches.length,
      samples: matches.map((m) => ({ text: m.trim() })),
    });
    failureCount += matches.length;
  }
}

function checkHtmlFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const matches = content.match(/<!--[\s\S]*?-->/g);
  if (matches && matches.length > 0) {
    violations.push({
      file: filepath,
      count: matches.length,
      samples: matches.map((m) => ({ text: m.trim() })),
    });
    failureCount += matches.length;
  }
}

function walk(dir) {
  let list = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      list.push(...walk(full));
    } else if (full.endsWith('.ts') || full.endsWith('.tsx') || full.endsWith('.css')) {
      list.push(full);
    }
  }
  return list;
}

const files = walk('src');
if (fs.existsSync('index.html')) files.push('index.html');

for (const f of files) {
  if (f.endsWith('.ts') || f.endsWith('.tsx')) {
    checkTsFile(f);
  } else if (f.endsWith('.css')) {
    checkCssFile(f);
  } else if (f.endsWith('.html')) {
    checkHtmlFile(f);
  }
}

console.log('--- STRICT AST COMMENT VERIFICATION ---');
if (failureCount === 0) {
  console.log(
    `SUCCESS: Verified ${files.length} source files. Exactly 0 comment nodes found across src/**/*.{ts,tsx,css} and index.html.`
  );
  process.exit(0);
} else {
  console.error(
    `FAILURE: Found ${failureCount} comment violations across ${violations.length} files:`
  );
  for (const v of violations) {
    console.error(`- ${v.file}: ${v.count} violations`);
    v.samples
      .slice(0, 3)
      .forEach((s) => console.error(`    Sample: ${s.text ? s.text.substring(0, 80) : ''}`));
  }
  process.exit(1);
}
