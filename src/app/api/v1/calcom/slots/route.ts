import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const apiKey = process.env.CALCOM_API_KEY;
    const eventTypeId = process.env.CALCOM_EVENT_TYPE_ID;

    if (!apiKey || !eventTypeId) {
      return NextResponse.json(
        { error: "Cal.com API Key or Event Type ID not configured." },
        { status: 500 }
      );
    }

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Missing startDate or endDate" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.cal.com/v1/slots?startTime=${startDate}&endTime=${endDate}&eventTypeId=${eventTypeId}`,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Cal.com Slots Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
