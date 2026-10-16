const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function collectAstComments(sourceText, filename = 'test.tsx') {
  const sf = ts.createSourceFile(
    filename,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.LanguageVariant.JSX
  );
  const comments = [];
  const seen = new Set();

  function addRange(r) {
    const key = `${r.pos}-${r.end}`;
    if (!seen.has(key)) {
      seen.add(key);
      comments.push(r);
    }
  }

  function visit(node) {
    const leading = ts.getLeadingCommentRanges(sourceText, node.pos);
    if (leading) leading.forEach(addRange);
    const trailing = ts.getTrailingCommentRanges(sourceText, node.end);
    if (trailing) trailing.forEach(addRange);
    ts.forEachChild(node, visit);
  }

  visit(sf);
  return comments;
}

function stripCommentsFromTs(sourceText, filename = 'test.tsx') {
  const comments = collectAstComments(sourceText, filename);
  comments.sort((a, b) => b.pos - a.pos);

  let result = sourceText;
  for (const c of comments) {
    let startPos = c.pos;
    let endPos = c.end;

    // Check if enclosed in JSX expression container: { /* ... */ } on same line
    const beforeText = result.substring(0, startPos);
    const afterText = result.substring(endPos);
    const openBrace = beforeText.match(/\{[ \t]*$/);
    const closeBrace = afterText.match(/^[ \t]*\}/);

    if (openBrace && closeBrace) {
      startPos -= openBrace[0].length;
      endPos += closeBrace[0].length;
    }

    const before = result.substring(0, startPos);
    const after = result.substring(endPos);
    const lineStart = before.lastIndexOf('\n');
    const prefix = lineStart === -1 ? before : before.substring(lineStart + 1);
    const lineEnd = after.indexOf('\n');
    const suffix = lineEnd === -1 ? after : after.substring(0, lineEnd);

    // If whole line was just the comment (and optional JSX braces)
    if (/^[ \t]*$/.test(prefix) && /^[ \t\r]*$/.test(suffix)) {
      const startCut = lineStart === -1 ? 0 : lineStart + 1;
      const endCut = lineEnd === -1 ? after.length : endPos + lineEnd + 1;
      result = result.substring(0, startCut) + result.substring(endCut);
    } else {
      result = before.replace(/[ \t]+$/, '') + after;
    }
  }

  return result;
}

function stripCommentsFromCss(sourceText) {
  return sourceText.replace(/\/\*[\s\S]*?\*\//g, '');
}

function stripCommentsFromHtml(sourceText) {
  return sourceText.replace(/<!--[\s\S]*?-->/g, '');
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
let processedCount = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  let stripped = content;
  if (f.endsWith('.ts') || f.endsWith('.tsx')) {
    stripped = stripCommentsFromTs(content, f);
  } else if (f.endsWith('.css')) {
    stripped = stripCommentsFromCss(content);
  }

  if (stripped !== content) {
    fs.writeFileSync(f, stripped, 'utf8');
    processedCount++;
    console.log(`Stripped comments from: ${f}`);
  }
}

if (fs.existsSync('index.html')) {
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  const strippedHtml = stripCommentsFromHtml(htmlContent);
  if (strippedHtml !== htmlContent) {
    fs.writeFileSync('index.html', strippedHtml, 'utf8');
    console.log('Stripped comments from: index.html');
    processedCount++;
  }
}

console.log(`Finished stripping comments from ${processedCount} files.`);
