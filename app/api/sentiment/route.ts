import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI: any = new GoogleGenerativeAI(process.env.GEMINI_API || 'AIzaSyCDG0wArUJBQB5C8zcVRepFxUe6Vj0S5f8');
const model: any = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: any) {
    try {
        const { text }: any = await request.json();

        const prompt: any = `Analyze the sentiment of the following text and provide the sentiment (Positive, Negative, Neutral) and confidence level(Structure like this: "Sentiment: Positive, Confidence: 0.95"): "${text}"`;
        const response: any = await model.generateContent(prompt);

        const responseText: any = response.response?.text();

        return NextResponse.json({ success: true, result: responseText });
    } catch (error: any) {
        console.error('Error analyzing sentiment with Gemini API:', error);
        return NextResponse.json({ success: false, error: 'Failed to analyze sentiment.' }, { status: 500 });
    }
}
