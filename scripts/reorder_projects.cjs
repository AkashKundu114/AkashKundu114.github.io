const fs = require('fs');

const file = 'src/data/projects.ts';
let content = fs.readFileSync(file, 'utf8');

// Find the projects array definition
const startMarker = 'export const projects: Project[] = [';
const endMarker = '];\n\nexport function getProjectById';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers');
  process.exit(1);
}

const before = content.substring(0, startIndex + startMarker.length);
const arrayBody = content.substring(startIndex + startMarker.length, endIndex);
const after = content.substring(endIndex);

// Parse the items from the array body using TS AST or eval-like extraction
// Since projects are objects separated by commas at the root of array:
// Let's use ts to extract each object literal
const ts = require('typescript');
const sf = ts.createSourceFile('projects.ts', content, ts.ScriptTarget.Latest, true);

let projectsArrayNode = null;
function findArray(node) {
  if (
    ts.isVariableDeclaration(node) &&
    node.name.text === 'projects' &&
    node.initializer &&
    ts.isArrayLiteralExpression(node.initializer)
  ) {
    projectsArrayNode = node.initializer;
  }
  ts.forEachChild(node, findArray);
}
findArray(sf);

if (!projectsArrayNode) {
  console.error('Could not find projects array node');
  process.exit(1);
}

const elements = projectsArrayNode.elements.map((e) => {
  return content.substring(e.pos, e.end).trim();
});

console.log(`Found ${elements.length} project items.`);

// Extract id for each element
const elementsWithId = elements.map((elemText) => {
  const match = elemText.match(/id:\s*['"]([^'"]+)['"]/);
  return { id: match ? match[1] : 'unknown', text: elemText };
});

console.log(
  'Current order:',
  elementsWithId.map((e) => e.id)
);

const desiredOrder = [
  'copper-ai-assistant',
  'eye-disease-predictor',
  'icc-clustering',
  'ai-sathi',
  'ai-hardware-benchmark',
  'e2ee-chat',
  'portfolio-cms',
];

const reordered = [];
for (const id of desiredOrder) {
  const found = elementsWithId.find((e) => e.id === id);
  if (found) reordered.push(found);
  else console.warn(`Missing id: ${id}`);
}

console.log(
  'New order:',
  reordered.map((e) => e.id)
);

const newArrayContent = '\n  ' + reordered.map((e) => e.text).join(',\n\n  ') + '\n';
const newFullContent = before + newArrayContent + after;

fs.writeFileSync(file, newFullContent, 'utf8');
console.log('Successfully reordered projects in src/data/projects.ts');
