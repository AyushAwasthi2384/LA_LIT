import { NextRequest, NextResponse } from "next/server";
import groq from "@/lib/groq";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { text }: { text: string } = await request.json();

        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is not defined in environment variables");
            return NextResponse.json(
                { success: false, error: "API configuration error. Please check server logs." },
                { status: 500 }
            );
        }

        const messages = [
            {
                role: "system",
                content: "You are a sentiment analysis assistant. Analyze the sentiment of the provided text and respond with the sentiment (Positive, Negative, or Neutral) and a confidence level between 0 and 1."
            },
            {
                role: "user",
                content: `Analyze the sentiment of the following text: "${text}". Respond in this format only: "Sentiment: [sentiment], Confidence: [confidence]"`
            }
        ];

        const completion = await groq.callGroqAPI(
            messages,
            "llama3-70b-8192",
            0.2,
            100
        );

        if (!completion || !completion.choices || !completion.choices[0] || !completion.choices[0].message) {
            console.error("Invalid response from Groq API:", completion);
            return NextResponse.json(
                { success: false, error: "Invalid response from API." },
                { status: 500 }
            );
        }

        const responseText = completion.choices[0].message.content;

        return NextResponse.json({ success: true, result: responseText }, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error analyzing sentiment with Groq API:", errorMessage);

        return NextResponse.json(
            { success: false, error: "Failed to analyze sentiment. " + errorMessage },
            { status: 500 }
        );
    }
}
