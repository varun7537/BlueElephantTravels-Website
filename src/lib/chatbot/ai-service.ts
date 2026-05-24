import { callAIAPI, fetchDestinationImages, getAvailableSlots, bookMeeting } from './api';
import { CONFIG } from './config';

export const SYSTEM_PROMPT = {
  role: 'system',
  content: `You are a world-class, luxury travel agent for Royal Journeys. Your goal is to curate unforgettable, highly detailed travel experiences.

CRITICAL RULES:
1. NO MARKDOWN SYMBOLS: Never use asterisks (*) for bold/italics, and never use hashtags (#).
2. USE CLEAN TEXT FORMATTING for easy reading: Use line breaks, uppercase letters for headers, and simple dashes (-) for lists to make it readable.
3. BE A PRO: If the user asks for a trip plan or itinerary, provide a high-level, exciting day-by-day summary. Keep each day brief and punchy (1-2 lines per day) so it is easy to read in a chat window.
4. Be warm, enthusiastic, and highly professional. Offer insider tips.
5. PRICING GUIDELINES: Quote the following baseline prices when asked:
   - Luxury Europe (7 days): Starts at $3,500/person
   - Tropical Escapes (Maldives/Bali): Starts at $2,500/person
   - Asian Tours (Japan/Thailand): Starts at $2,800/person
   - Quick Getaways (3-4 days): Starts at $900/person
6. Contact: ${CONFIG.CONTACT_PHONE} (Call/WhatsApp). You can offer to schedule a consultation, but DO NOT show the calendar unless the user explicitly says they want to book or schedule a meeting.
7. CRITICAL REQUIREMENT FOR SCHEDULING: You MUST call the "show_calendar_ui" tool IMMEDIATELY whenever the user asks to "book a meeting", "schedule a call", or "see the calendar". Do not just say you will schedule it; you are REQUIRED to trigger the tool!
8. INTERACTIVE BUTTONS: Instead of asking the user to type out choices, provide clickable buttons for them. Use the format [BUTTON:Button Text]. For example, if asking about destinations, output: 'Where would you like to go?\\n[BUTTON:Maldives]\\n[BUTTON:Japan]'. ALWAYS use this for options, yes/no questions, or categories.`,
};

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'show_calendar_ui',
      description: 'Shows the visual interactive calendar widget to the user. ONLY call this when the user EXPLICITLY asks to schedule a meeting, book a consultation, or see the calendar.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_available_slots',
      description: 'Get available meeting slots for a specific date range from the Cal.com API.',
      parameters: {
        type: 'object',
        properties: {
          startDate: { type: 'string', description: 'Start date in YYYY-MM-DD format' },
          endDate: { type: 'string', description: 'End date in YYYY-MM-DD format' },
        },
        required: ['startDate', 'endDate'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'book_meeting',
      description: 'Book a meeting on behalf of the user for a specific time slot.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'User name' },
          email: { type: 'string', description: 'User email' },
          startTime: { type: 'string', description: 'Start time in ISO format' },
        },
        required: ['name', 'email', 'startTime'],
      },
    },
  },
];

function stripThinkingBlocks(text: string) {
  if (!text) return '';
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

async function executeTool(toolCall: any, toolImageUrls: any) {
  const functionName = toolCall.function.name;
  const args = JSON.parse(toolCall.function.arguments || '{}');
  let functionResult = '';

  switch (functionName) {
    case 'show_calendar_ui':
      functionResult = 'Calendar UI has been shown to the user. Say the calendar is shown.';
      break;
    case 'get_available_slots':
      const slotsData = await getAvailableSlots(args.startDate, args.endDate);
      functionResult = JSON.stringify(slotsData);
      break;
    case 'book_meeting':
      const bookingData = await bookMeeting(args.name, args.email, args.startTime);
      functionResult = JSON.stringify(bookingData);
      break;
    default:
      functionResult = `Unknown function: ${functionName}`;
  }
  return functionResult;
}

async function processToolCalls(responseMessage: any, messages: any[]) {
  const toolImageUrls: any = {};
  const toolMessages: any[] = [];

  for (const toolCall of responseMessage.tool_calls) {
    const functionResult = await executeTool(toolCall, toolImageUrls);
    toolMessages.push({
      role: 'tool',
      tool_call_id: toolCall.id,
      name: toolCall.function.name,
      content: functionResult,
    });
  }

  const finalMessages = [...messages, responseMessage, ...toolMessages];
  const secondData = await callAIAPI(finalMessages, TOOLS, null);
  let finalAiResponse = stripThinkingBlocks(secondData.choices?.[0]?.message?.content) || '';

  if (!finalAiResponse) {
    finalAiResponse = "I've pulled up the information for you. Let me know if you need anything else!";
  }

  if (responseMessage.tool_calls.some((tc: any) => tc.function.name === 'show_calendar_ui')) {
    finalAiResponse += '\n[SHOW_CALENDAR]';
  }

  return {
    response: finalAiResponse,
    messages: [responseMessage, ...toolMessages],
  };
}

export function getContextualQuickReplies(response: string, historyLength: number) {
  const lowerResponse = response.toLowerCase();
  if (lowerResponse.includes('destination') || lowerResponse.includes('recommend')) {
    return ['Tell me more', 'Show other options', 'Book a consultation'];
  }
  if (lowerResponse.includes('price') || lowerResponse.includes('cost')) {
    return ['Schedule a call', 'Show budget options', 'Tell me more'];
  }
  if (historyLength <= 4) {
    return ['Show me destinations', 'Help plan a trip', 'Talk to an agent'];
  }
  return [];
}

export async function getAIResponse(userMessage: string, chatHistory: any[]) {
  chatHistory.push({ role: 'user', content: userMessage });
  const messages = [SYSTEM_PROMPT, ...chatHistory];

  const data = await callAIAPI(messages, TOOLS, 'auto');
  const responseMessage = data.choices?.[0]?.message;

  if (responseMessage && responseMessage.reasoning) {
    delete responseMessage.reasoning;
  }

  let finalResponse;
  let historyUpdates: any[] = [];

  if (responseMessage?.tool_calls && responseMessage.tool_calls.length > 0) {
    const result = await processToolCalls(responseMessage, messages);
    finalResponse = result.response;
    historyUpdates = result.messages;
  } else {
    finalResponse = stripThinkingBlocks(responseMessage?.content) || "I'm having trouble connecting right now.";
    historyUpdates = [responseMessage];
  }

  historyUpdates.forEach(msg => {
    const sanitized = { ...msg };
    if (sanitized.role === 'assistant') {
      sanitized.content = sanitized.content || '';
      delete sanitized.tool_calls;
    }
    chatHistory.push(sanitized);
  });

  chatHistory.push({ role: 'assistant', content: finalResponse });
  const quickReplies = getContextualQuickReplies(finalResponse, chatHistory.length);

  return { response: finalResponse, quickReplies, updatedHistory: chatHistory };
}
