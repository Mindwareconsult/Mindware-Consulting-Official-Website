import re

with open("src/pages/Insights.tsx", "r") as f:
    content = f.read()

# 1. Add import INSIGHTS
content = content.replace(
    'import { FadeInSection } from "../components/FadeInSection";',
    'import { FadeInSection } from "../components/FadeInSection";\nimport { INSIGHTS } from "../data/insights";'
)

# 2. Remove local articles definition
# We will match the entire 'const articles = [' to the end of the array '];'
# Let's use regex
articles_pattern = re.compile(r'const articles = \[\s*\{.*?\}\s*\];', re.DOTALL)
content = articles_pattern.sub('', content)

# 3. Replace {articles.map with {INSIGHTS.map
content = content.replace('{articles.map', '{INSIGHTS.map')

# 4. Wrap motion.article contents in a Link
# Find <motion.article ...> ... </motion.article>
# Change motion.article to motion.div
content = content.replace('<motion.article', '<motion.div')
content = content.replace('</motion.article>', '</Link>\n              </motion.div>')
content = content.replace('className="group cursor-pointer flex flex-col h-full"', 'className="h-full"')

# Add Link right inside motion.div
content = content.replace(
    '<div className="relative aspect-[16/10]',
    '<Link to={`/insights/${article.id}`} className="group cursor-pointer flex flex-col h-full">\n                <div className="relative aspect-[16/10]'
)

with open("src/pages/Insights.tsx", "w") as f:
    f.write(content)

