import os, glob, shutil
import re

# We will restore everything again to be safe
os.system('git checkout -- src/components src/pages src/context src/hooks src/App.jsx src/main.jsx')

# Rename the newly restored files to .tsx/.ts
[os.rename(f, f[:-4] + '.tsx') for f in glob.glob('src/**/*.jsx', recursive=True)]
[os.rename(f, f[:-3] + '.ts') for f in glob.glob('src/hooks/*.js', recursive=True)]
    
# Now, smart comment removal that ONLY removes lines that are pure comments
def strip_comments_safe(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove lines that start with optional whitespace and then //
    content = re.sub(r'^\s*//.*$', '', content, flags=re.MULTILINE)
    # We will NOT try to remove block comments or inline comments as it's too risky for JSX
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css')):
            strip_comments_safe(os.path.join(root, file))

print('Restored, renamed, and safely stripped comments!')
