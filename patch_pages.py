import os
import glob

SEO_IMPORTS = {
    "Home": 'import { SEO } from "../components/SEO";\n',
    "About": 'import { SEO } from "../components/SEO";\n',
    "Contact": 'import { SEO } from "../components/SEO";\n',
    "Insights": 'import { SEO } from "../components/SEO";\n',
    "InsightDetail": 'import { SEO } from "../components/SEO";\n',
    "Portfolio": 'import { SEO } from "../components/SEO";\n',
    "Services": 'import { SEO } from "../components/SEO";\n',
    "ServiceDetail": 'import { SEO } from "../components/SEO";\n',
    "Training": 'import { SEO } from "../components/SEO";\n',
}

SEO_COMPONENTS = {
    "Home": '<SEO title="Mindware Consulting | Digital Growth Lab" description="Mindware Consulting empowers businesses with strategy and technology." />',
    "About": '<SEO title="About Us | Mindware Consulting" description="Learn about Mindware Consulting, our vision, and our leadership." />',
    "Contact": '<SEO title="Contact Us | Mindware Consulting" description="Get in touch with Mindware Consulting." />',
    "Insights": '<SEO title="Insights | Mindware Consulting" description="Insights, strategies, and perspectives on navigating the digital economy." />',
    "InsightDetail": '<SEO title={`${article.title} | Mindware Consulting`} description={article.excerpt} />',
    "Portfolio": '<SEO title="Portfolio | Mindware Consulting" description="Explore our recent projects and success stories." />',
    "Services": '<SEO title="Our Services | Mindware Consulting" description="Explore the digital growth services we offer." />',
    "ServiceDetail": '<SEO title={`${service.title} | Mindware Consulting`} description={service.tagline} />',
    "Training": '<SEO title="Training & Workshops | Mindware Consulting" description="Corporate training and digital upskilling programs." />',
}

pages_dir = "src/pages"

for file_name in os.listdir(pages_dir):
    if not file_name.endswith(".tsx"):
        continue
        
    page_name = file_name[:-4]
    if page_name not in SEO_COMPONENTS:
        continue
        
    filepath = os.path.join(pages_dir, file_name)
    with open(filepath, 'r') as f:
        content = f.read()
        
    if "import { SEO }" in content:
        continue
        
    # Insert import after the last import statement
    import_index = content.rfind("import ")
    if import_index != -1:
        end_of_import = content.find("\n", import_index) + 1
        content = content[:end_of_import] + SEO_IMPORTS[page_name] + content[end_of_import:]
    else:
        content = SEO_IMPORTS[page_name] + content
        
    # Insert component right after the main container element of the page
    # E.g., <div className="bg-mw-dark"> or <div className="bg-mw-dark min-h-screen"> or <main>
    # We'll find the first return (...) block for the page component.
    
    # Try to find: return ( \n <div
    import re
    # Match the main return statement of the component
    match = re.search(r'return\s*\(\s*<[a-zA-Z0-9_.\-]+[^>]*>', content)
    if match:
        insert_pos = match.end()
        # Ensure we're inserting safely
        content = content[:insert_pos] + f"\n      {SEO_COMPONENTS[page_name]}" + content[insert_pos:]
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Patched {page_name}")
    else:
        print(f"Failed to find return statement for {page_name}")
