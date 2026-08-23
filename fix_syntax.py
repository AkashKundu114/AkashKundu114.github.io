import re

f='src/pages/Contact.tsx'
with open(f,'r') as file:
    content = file.read()
content = content.replace("{ borderColor: 'var(--danger)' } : \n", "{ borderColor: 'var(--danger)' } : {}\n")
content = content.replace("{ borderColor: 'var(--danger)' } : }", "{ borderColor: 'var(--danger)' } : {}}")
with open(f,'w') as file:
    file.write(content)

f='src/setupTests.ts'
with open(f,'r') as file:
    content = file.read()
content = content.replace("dispatchEvent: () => {}false,", "dispatchEvent: () => false,")
with open(f,'w') as file:
    file.write(content)
