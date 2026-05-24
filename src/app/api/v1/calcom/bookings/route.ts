import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const apiKey = process.env.CALCOM_API_KEY;
    const eventTypeId = process.env.CALCOM_EVENT_TYPE_ID;

    if (!apiKey || !eventTypeId) {
      return NextResponse.json(
        { error: "Cal.com API Key or Event Type ID not configured." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.cal.com/v1/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        eventTypeId: Number(eventTypeId),
        start: body.startTime,
        responses: {
          name: body.name,
          email: body.email,
        },
        timeZone: body.timeZone,
        language: "en",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Cal.com Bookings Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
