import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Remove the incorrectly placed SEO component
content = content.replace('      <SEO title="Mindware Consulting | Digital Growth Lab" description="Mindware Consulting empowers businesses with strategy and technology." />\n', '')

# Find the main Home component
# export function Home() { ... return ( ... ) }
# It's at the end of the file usually.
match = re.search(r'export function Home\(\)\s*\{\s*return\s*\(\s*<[a-zA-Z0-9_.\-]+[^>]*>', content)
if match:
    insert_pos = match.end()
    content = content[:insert_pos] + '\n      <SEO title="Mindware Consulting | Digital Growth Lab" description="Mindware Consulting empowers businesses with strategy and technology." />' + content[insert_pos:]
    with open('src/pages/Home.tsx', 'w') as f:
        f.write(content)
    print("Fixed Home.tsx")
else:
    print("Could not find Home component")
