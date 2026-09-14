import re

with open("src/data/content.ts", "r") as f:
    content = f.read()

# Replace the first portfolio item
old_item = r'''    {
        id: "fintech-platform",
        title: "Fintech Dashboard Redesign",
        client: "Confidential Client",
        industry: "Finance",
        service: "App Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71\?auto=format&fit=crop&q=80&w=800",
        challenge: "Legacy platform was causing high user churn and support tickets.",
        result: "40% increase in user retention and 60% reduction in support queries."
    },'''

new_item = '''    {
        id: "temamost-construction",
        title: "Construction Company Website",
        client: "Temamost Nigeria Ltd",
        industry: "Construction & Engineering",
        service: "Website Design",
        image: "/assets/Mindware Website Design .png",
        challenge: "Needed a professional digital presence to showcase their engineering projects and attract high-value contracts in Port Harcourt.",
        result: "Designed and built a responsive, portfolio-driven website establishing strong digital authority.",
        link: "https://www.constructionstemamost.com/"
    },'''

content = re.sub(old_item, new_item, content)

with open("src/data/content.ts", "w") as f:
    f.write(content)
