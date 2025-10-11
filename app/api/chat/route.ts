import { NextRequest, NextResponse } from "next/server";
import groq from "@/lib/groq";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { messages } = await request.json();
    
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined in environment variables");
      return NextResponse.json(
        { success: false, error: "API configuration error. Please check server logs." },
        { status: 500 }
      );
    }
    
    const completion = await groq.callGroqAPI(
      messages,
      "llama3-70b-8192",
      0.7,
      1024
    );

    if (!completion || !completion.choices || !completion.choices[0] || !completion.choices[0].message) {
      console.error("Invalid response from Groq API:", completion);
      return NextResponse.json(
        { success: false, error: "Invalid response from API." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      result: completion.choices[0].message.content 
    }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error with Groq API:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Failed to generate response. " + errorMessage },
      { status: 500 }
    );
  }
}