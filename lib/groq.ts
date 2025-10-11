// Direct API implementation without SDK
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Calls the Groq API with the provided messages and parameters
 * Uses environment variable GROQ_API_KEY for authentication
 */
export async function callGroqAPI(messages: any[], model: string = 'llama3-70b-8192', temperature: number = 0.7, max_tokens: number = 1024) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY environment variable is not defined');
  }

  try {
    // Log a masked version of the key to verify it's present (for debugging)
    const maskedKey = apiKey.substring(0, 6) + "****";
    console.log(`Using Groq API key: ${maskedKey}`);
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error response:', errorData);
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}

export default { callGroqAPI };