import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60; // Allow more time for AI processing

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if we have an OpenRouter API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: { message: "OpenRouter API Key not configured." } },
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.SITE_URL || "https://blueelephanttravels.com",
        "X-Title": "Royal Journeys AI",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("OpenRouter API Error:", error);
    return NextResponse.json(
      { error: { message: error.message || "Internal Server Error" } },
      { status: 500 }
    );
  }
}
