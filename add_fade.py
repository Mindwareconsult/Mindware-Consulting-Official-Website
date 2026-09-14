import os

PAGES_DIR = "src/pages"
IMPORT_STMT = 'import { FadeInSection } from "../components/FadeInSection";\n'

for filename in os.listdir(PAGES_DIR):
    if not filename.endswith(".tsx"):
        continue
    filepath = os.path.join(PAGES_DIR, filename)
    with open(filepath, "r") as f:
        content = f.read()
    
    if "<section" in content and "FadeInSection" not in content:
        # Replace <section with <FadeInSection
        # and </section> with </FadeInSection>
        new_content = content.replace("<section", "<FadeInSection")
        new_content = new_content.replace("</section>", "</FadeInSection>")
        
        # Add import statement after the last import
        lines = new_content.split("\n")
        last_import_idx = -1
        for i, line in enumerate(lines):
            if line.startswith("import "):
                last_import_idx = i
        
        if last_import_idx != -1:
            lines.insert(last_import_idx + 1, 'import { FadeInSection } from "../components/FadeInSection";')
        else:
            lines.insert(0, 'import { FadeInSection } from "../components/FadeInSection";')
            
        with open(filepath, "w") as f:
            f.write("\n".join(lines))
        print(f"Updated {filename}")
