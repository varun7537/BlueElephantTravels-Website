import { CONFIG } from './config';

async function fetchWithTimeout(resource: string, options: RequestInit & { timeout?: number } = {}) {
  const { timeout = 25000 } = options; // 25s default timeout
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
}

export async function callAIAPI(messages: any[], tools: any[] | null = null, toolChoice: string | null = null) {
  const requestBody: any = {
    model: CONFIG.AI_MODEL,
    messages: messages,
    temperature: CONFIG.AI_TEMPERATURE,
    max_tokens: CONFIG.AI_MAX_TOKENS,
    top_p: CONFIG.AI_TOP_P,
    stream: false,
  };

  if (tools && tools.length > 0) {
    requestBody.tools = tools;
    if (toolChoice) {
      requestBody.tool_choice = toolChoice;
    }
  }

  const response = await fetchWithTimeout(CONFIG.AI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
    timeout: 35000 // 35 seconds for AI calls
  });

  if (!response.ok) {
    let errorMessage = 'AI API Error';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error?.message || JSON.stringify(errorData);
    } catch (e) {
      errorMessage = `Server Error: ${response.status} ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function fetchDestinationImages(destination: string) {
  try {
    const res = await fetch(`${CONFIG.PEXELS_API_URL}?query=${encodeURIComponent(destination + ' travel')}&per_page=4`);
    if (!res.ok) throw new Error('Failed to fetch images');
    
    const data = await res.json();
    if (data && data.photos && data.photos.length > 0) {
      return data.photos.map((p: any) => p.src.medium);
    }
    return null;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
}

export async function getAvailableSlots(startDate: string, endDate: string) {
  try {
    const response = await fetch(`${CONFIG.CALCOM_SLOTS_URL}?startDate=${startDate}&endDate=${endDate}`);
    if (!response.ok) throw new Error('Failed to fetch available slots');
    return response.json();
  } catch (error: any) {
    console.error('Error fetching slots:', error);
    return { error: error.message };
  }
}

export async function bookMeeting(name: string, email: string, startTime: string) {
  try {
    const response = await fetch(CONFIG.CALCOM_BOOKINGS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        startTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    });
    if (!response.ok) throw new Error('Failed to book meeting');
    return response.json();
  } catch (error: any) {
    console.error('Error booking meeting:', error);
    return { error: error.message };
  }
}
