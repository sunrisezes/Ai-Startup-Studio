import { generateChatCompletion, GROQ_MODELS } from './geminiService';
import {
  CONCEPT_PROMPT,
  BRANDING_PROMPT,
  MARKET_PROMPT,
  MARKETING_PROMPT,
  BUSINESS_PROMPT,
  LAUNCH_PROMPT,
  TOOLS_PROMPT,
} from './prompts';

const PROMPT_MAP = {
  concept: CONCEPT_PROMPT,
  overview: CONCEPT_PROMPT,
  branding: BRANDING_PROMPT,
  market: MARKET_PROMPT,
  marketing: MARKETING_PROMPT,
  business: BUSINESS_PROMPT,
  strategy: BUSINESS_PROMPT,
  launch: LAUNCH_PROMPT,
  tools: TOOLS_PROMPT,
};

function formatStartupName(rawName, idea) {
  const genericNames = ['ai startup', 'my startup', 'startup', 'untitled', 'new concept', 'ai saas'];
  const nameTrimmed = (rawName || '').trim();
  if (nameTrimmed && !genericNames.includes(nameTrimmed.toLowerCase())) {
    return nameTrimmed;
  }

  const words = (idea || '').trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  if (words.length === 1 && words[0]) {
    const word = words[0];
    if (word.toLowerCase() === 'school') return 'EduFlow AI';
    return `${word}Sphere AI`;
  }
  if (words.length > 0 && words[0]) {
    return `${words.join('')} AI`;
  }
  return 'EduFlow AI';
}

function extractCoreContext(existingConcept = {}) {
  if (typeof existingConcept === 'string') {
    return { idea: existingConcept };
  }
  return {
    startupName: existingConcept.name || existingConcept.concept?.startupName || 'AI Startup',
    tagline: existingConcept.tagline || existingConcept.concept?.tagline || '',
    category: existingConcept.category || existingConcept.concept?.category || 'AI SaaS',
    missionStatement: existingConcept.mission || existingConcept.concept?.missionStatement || '',
    visionStatement: existingConcept.vision || existingConcept.concept?.visionStatement || '',
    elevatorPitch: existingConcept.elevatorPitch || existingConcept.concept?.elevatorPitch || '',
  };
}

export async function generateSection(sectionKey, existingConcept = {}) {
  const rawPromptTemplate = PROMPT_MAP[sectionKey] || CONCEPT_PROMPT;
  let formattedPrompt = rawPromptTemplate;
  const compactContext = extractCoreContext(existingConcept);
  const compactContextString = JSON.stringify(compactContext);

  if (sectionKey === 'concept' || sectionKey === 'overview') {
    const rawIdea = existingConcept?.idea || existingConcept?.name || 'AI Startup';
    formattedPrompt = rawPromptTemplate.replace('{{idea}}', rawIdea);
  } else {
    formattedPrompt = rawPromptTemplate.replace('{{existingConcept}}', compactContextString);
  }

  const messages = [
    { role: 'system', content: formattedPrompt },
    {
      role: 'user',
      content: sectionKey === 'concept' || sectionKey === 'overview'
        ? `Generate startup concept JSON for idea: ${existingConcept?.idea || existingConcept?.name || 'AI Startup'}`
        : `Generate structured JSON output for: ${compactContextString}`,
    },
  ];

  const responseText = await generateChatCompletion({
    model: GROQ_MODELS[0],
    messages,
    maxTokens: 1200,
  });

  try {
    const cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (err) {
    console.warn(`JSON parse failed for section ${sectionKey}, returning raw output wrapper:`, err);
    return { raw: responseText };
  }
}

export async function generateStartupConcept(idea) {
  const result = await generateSection('concept', { idea });
  const name = formatStartupName(result?.startupName, idea);
  const tagline = result?.tagline || `Intelligent AI platform powering ${idea}`;

  if (result && !result.raw) {
    result.startupName = name;
    result.tagline = tagline;

    return {
      id: `concept-${Date.now()}`,
      name,
      tagline,
      category: result.category || 'EdTech & AI',
      domains: result.domainNames || [],
      mission: result.missionStatement || '',
      vision: result.visionStatement || '',
      elevatorPitch: result.elevatorPitch || '',
      problem: result.investorSummary?.coreProblem || '',
      solution: result.investorSummary?.proprietarySolution || '',
      marketOpportunity: result.investorSummary?.marketOpportunity || '',
      concept: result,
      createdAt: new Date().toISOString(),
    };
  }

  return {
    id: `concept-${Date.now()}`,
    name,
    tagline,
    category: 'EdTech & AI',
    createdAt: new Date().toISOString(),
  };
}
