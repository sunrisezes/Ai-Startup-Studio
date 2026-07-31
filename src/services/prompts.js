export const CONCEPT_PROMPT = `You are a Y-Combinator level startup architect.
Given the raw startup idea: "{{idea}}", generate a comprehensive JSON representation.
CRITICAL: Create a unique, memorable, high-converting startup brand name tailored specifically to the idea (for example: if idea is "school", generate a name like "EduFlow AI", "SchoolSphere", or "ClassPulse"). NEVER return generic names like "AI Startup" or "My Startup".

JSON Structure:
{
  "startupName": "String (catchy brand name)",
  "tagline": "String (compelling tagline)",
  "category": "String (e.g. EdTech & AI, HealthTech, Developer Tools)",
  "domainNames": [
    { "name": "brandname.ai", "tldType": "AI Premium" },
    { "name": "getbrandname.com", "tldType": "Standard .com" },
    { "name": "brandname.io", "tldType": "Tech .io" },
    { "name": "brandname.app", "tldType": "App Domain" }
  ],
  "missionStatement": "String",
  "visionStatement": "String",
  "elevatorPitch": "String",
  "investorSummary": {
    "coreProblem": "String",
    "proprietarySolution": "String",
    "marketOpportunity": "String"
  }
}

Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.`;

export const BRANDING_PROMPT = `Given the startup concept: {{existingConcept}}, generate a complete visual identity specification.

JSON Structure:
{
  "colorPalette": [
    { "name": "Color 1", "hex": "#0A0A0A", "role": "Background" },
    { "name": "Color 2", "hex": "#7C3AED", "role": "Primary Accent" },
    { "name": "Color 3", "hex": "#4F46E5", "role": "Secondary" },
    { "name": "Color 4", "hex": "#06B6D4", "role": "Cyan Highlight" },
    { "name": "Color 5", "hex": "#F9FAFB", "role": "Headings" }
  ],
  "typography": {
    "heading": "Plus Jakarta Sans",
    "body": "Inter"
  },
  "logoConceptDescription": "String",
  "brandVoice": "String",
  "brandTone": "String"
}

Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.`;

export const MARKET_PROMPT = `Given the startup concept: {{existingConcept}}, analyze the market opportunity and competitive landscape.

JSON Structure:
{
  "tam": { "value": "$XXB", "narrative": "String" },
  "sam": { "value": "$XXB", "narrative": "String" },
  "som": { "value": "$XXM", "narrative": "String" },
  "trends": ["String 1", "String 2", "String 3", "String 4", "String 5"],
  "competitors": [
    { "name": "Comp 1", "strengths": ["Strength 1"], "weaknesses": ["Weakness 1"] },
    { "name": "Comp 2", "strengths": ["Strength 1"], "weaknesses": ["Weakness 1"] },
    { "name": "Comp 3", "strengths": ["Strength 1"], "weaknesses": ["Weakness 1"] },
    { "name": "Comp 4", "strengths": ["Strength 1"], "weaknesses": ["Weakness 1"] }
  ],
  "targetAudience": [
    { "segment": "Segment 1", "description": "String" },
    { "segment": "Segment 2", "description": "String" },
    { "segment": "Segment 3", "description": "String" }
  ]
}

Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.`;

export const MARKETING_PROMPT = `Given the startup concept: {{existingConcept}}, create landing page copy and growth marketing hooks.

JSON Structure:
{
  "heroHeadlines": ["Headline 1", "Headline 2", "Headline 3", "Headline 4", "Headline 5"],
  "valuePropositions": ["Prop 1", "Prop 2", "Prop 3"],
  "adHooks": ["Hook 1", "Hook 2", "Hook 3", "Hook 4"],
  "emailCampaign": {
    "subject": "String",
    "body": "String"
  },
  "elevatorVariations": [
    "10-word pitch...",
    "30-word pitch...",
    "60-word pitch..."
  ]
}

Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.`;

export const BUSINESS_PROMPT = `Given the startup concept: {{existingConcept}}, formulate the monetization strategy, pricing, and unit economics.

JSON Structure:
{
  "pricingTiers": [
    { "name": "Starter", "price": "$19", "billingCycle": "month", "features": ["Feat 1"], "highlighted": false },
    { "name": "Pro Team", "price": "$49", "billingCycle": "month", "features": ["Feat 1"], "highlighted": true },
    { "name": "Enterprise", "price": "$99", "billingCycle": "month", "features": ["Feat 1"], "highlighted": false }
  ],
  "unitEconomics": {
    "cac": "$240",
    "ltv": "$1760",
    "grossMargin": "88%",
    "paybackPeriod": "4.8 Months"
  },
  "moatAnalysis": "String",
  "gtmStrategy": "String"
}

Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.`;

export const LAUNCH_PROMPT = `Given the startup concept: {{existingConcept}}, create a 30-day launch playbook, ProductHunt strategy, outreach templates, and MVP roadmap.

JSON Structure:
{
  "checklist": [
    { "day": "Day 01–05", "task": "Landing Page Setup", "category": "Infrastructure" }
  ],
  "productHuntStrategy": "String",
  "outreachTemplates": [
    { "subject": "String", "body": "String" },
    { "subject": "String", "body": "String" }
  ],
  "mvpPhases": [
    { "phase": "Phase 1", "title": "Core Engine", "tasks": ["Task 1"], "duration": "Weeks 1-2", "status": "In Progress" },
    { "phase": "Phase 2", "title": "Integrations", "tasks": ["Task 1"], "duration": "Weeks 3-4", "status": "Upcoming" },
    { "phase": "Phase 3", "title": "Automation", "tasks": ["Task 1"], "duration": "Weeks 5-6", "status": "Upcoming" },
    { "phase": "Phase 4", "title": "Analytics", "tasks": ["Task 1"], "duration": "Weeks 7-8", "status": "Upcoming" },
    { "phase": "Phase 5", "title": "Enterprise SSO", "tasks": ["Task 1"], "duration": "Weeks 9-12", "status": "Upcoming" }
  ]
}

Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.`;

export const TOOLS_PROMPT = `Given the startup concept: {{existingConcept}}, recommend 8 custom AI tools for Design, Marketing, Dev, Analytics, Comms, Finance, Legal, Growth.

JSON Structure:
{
  "tools": [
    { "name": "v0.dev", "category": "Design", "reason": "UI component generation", "url": "https://v0.dev" },
    { "name": "Copy.ai", "category": "Marketing", "reason": "Content writing", "url": "https://copy.ai" },
    { "name": "Cursor", "category": "Dev", "reason": "AI IDE coding", "url": "https://cursor.com" },
    { "name": "PostHog", "category": "Analytics", "reason": "Funnel analysis", "url": "https://posthog.com" },
    { "name": "Resend", "category": "Comms", "reason": "Email API", "url": "https://resend.com" },
    { "name": "Stripe", "category": "Finance", "reason": "Subscription billing", "url": "https://stripe.com" },
    { "name": "Clerky", "category": "Legal", "reason": "Company formation", "url": "https://clerky.com" },
    { "name": "Groq API", "category": "Growth", "reason": "Fast inference engine", "url": "https://groq.com" }
  ]
}

Respond with ONLY valid JSON. No markdown code fences. No explanation text. No preamble.`;
