// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // const prompt = "Explain how AI works";

// // const result = await model.generateContent(prompt);
// // console.log(result.response.text());

// export async function GET(request: Request) {
//     const { prompt } = await request.json();
//     const result = await model.generateContent(prompt);
//     return NextResponse.json({ message: 'Received!', data: result.response.text() });
// }

// export async function POST(request: Request) {
//     const body = await request.json();
//     return NextResponse.json({ message: 'Received!', data: body });
// }



import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: any) {
    try {
        const { text } = await request.json();

        const prompt = `Analyze the sentiment of the following text and provide the sentiment (Positive, Negative, Neutral) and confidence level(Structure like this: "Sentiment: Positive, Confidence: 0.95"): "${text}"`;
        const response = await model.generateContent(prompt);

        const responseText = response.response?.text();
        // const [sentimentPart, confidencePart] = responseText?.split(',').map((item) => item.trim());

        // const result = {
        //     sentiment: sentimentPart.replace('Sentiment:', '').trim(),
        //     confidence: parseFloat(confidencePart.replace('Confidence:', '').trim()),
        // };

        return NextResponse.json({ success: true, result: responseText });
    } catch (error) {
        console.error('Error analyzing sentiment with Gemini API:', error);
        return NextResponse.json({ success: false, error: 'Failed to analyze sentiment.' }, { status: 500 });
    }
}
