import fs from 'fs';
import path from 'path';
import stripComments from 'strip-comments';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src');
let strippedCount = 0;

files.forEach(file => {
    const original = fs.readFileSync(file, 'utf8');
    
    // strip-comments does a good job, but for JSX `{/* */}` it might leave the `{}` if not careful.
    // Let's first manually remove JSX comments specifically to avoid empty `{}` blocks left behind in JSX.
    let content = original.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    
    // Now use strip-comments for standard // and /* */
    content = stripComments(content);
    
    // Also remove empty lines that might have been left behind (optional, prettier will handle most, but let's do a basic cleanup)
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        strippedCount++;
    }
});

console.log(`Stripped comments from ${strippedCount} files.`);
