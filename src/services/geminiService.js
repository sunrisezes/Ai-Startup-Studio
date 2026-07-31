const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
export const GROQ_MODELS = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'gemma2-9b-it'];

const sanitizeKey = (key) => {
  if (!key) return '';
  return key.trim().replace(/^["']|["']$/g, '').trim();
};

export function getApiKey() {
  const sessionKey = sanitizeKey(sessionStorage.getItem('groqKey'));
  if (sessionKey && sessionKey !== 'gsk_...') {
    return sessionKey;
  }
  const localKey = sanitizeKey(localStorage.getItem('groq_api_key'));
  if (localKey && localKey !== 'gsk_...') {
    return localKey;
  }
  const envKey = sanitizeKey(import.meta.env.VITE_GROQ_API_KEY);
  if (envKey && envKey !== 'gsk_...') {
    return envKey;
  }
  return '';
}

export async function generateChatCompletion({ preferredModel, messages, maxTokens = 1200 }) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error('Groq API Key is missing. Please configure your API key in settings or .env.local.');
  }

  const cappedTokens = Math.min(maxTokens || 1200, 2048);
  const backoffDelays = [800, 1500, 3000];
  let lastError = null;

  const modelsToTry = preferredModel ? [preferredModel, ...GROQ_MODELS.filter(m => m !== preferredModel)] : GROQ_MODELS;

  for (let attempt = 0; attempt < modelsToTry.length; attempt++) {
    const currentModel = modelsToTry[attempt];

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: currentModel,
          messages,
          max_tokens: cappedTokens,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.choices?.[0]?.message?.content) {
          return data.choices[0].message.content;
        }
      }

      const errData = await response.json().catch(() => ({}));
      const errorMessage = errData?.error?.message || `Groq API HTTP Error ${response.status}`;
      lastError = errorMessage;

      if (
        response.status === 429 ||
        response.status === 400 ||
        response.status >= 500 ||
        errorMessage.includes('TPM') ||
        errorMessage.includes('tokens per minute') ||
        errorMessage.includes('Request too large') ||
        errorMessage.includes('limit')
      ) {
        console.warn(`[Groq Model ${currentModel} limit/error]: ${errorMessage}. Retrying with model ${GROQ_MODELS[(attempt + 1) % GROQ_MODELS.length]}...`);
        await new Promise((res) => setTimeout(res, backoffDelays[attempt] || 1000));
        continue;
      }

      throw new Error(errorMessage);
    } catch (err) {
      lastError = err.message;
      if (
        attempt < GROQ_MODELS.length - 1 &&
        (err.message.includes('429') ||
          err.message.includes('500') ||
          err.message.includes('fetch') ||
          err.message.includes('TPM') ||
          err.message.includes('limit') ||
          err.message.includes('Request too large'))
      ) {
        await new Promise((res) => setTimeout(res, backoffDelays[attempt] || 1000));
        continue;
      }
      throw new Error(`Groq API Completion Failed: ${err.message}`);
    }
  }

  throw new Error(`Groq API failed after trying all available models. ${lastError || ''}`);
}

export const generateStartupPack = async (ideaPrompt) => {
  return await generateChatCompletion({
    messages: [{ role: 'user', content: ideaPrompt }],
  });
};
