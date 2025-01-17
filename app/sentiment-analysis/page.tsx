// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// export default function SentimentAnalysis() {
//   const [input, setInput] = useState('')
//   const [result, setResult] = useState<{ sentiment: string; confidence: number } | null>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const analyzeSentiment = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch('/api/sentiment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: input }),
//       })
//       const data = await response.json()
//       setResult(data)
//     } catch (error) {
//       console.error('Error analyzing sentiment:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8">Sentiment Analysis</h1>
//       <div className="mb-6">
//         <Textarea
//           placeholder="Enter your text here..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           rows={5}
//           className="w-full"
//         />
//       </div>
//       <Button onClick={analyzeSentiment} disabled={isLoading}>
//         {isLoading ? 'Analyzing...' : 'Analyze'}
//       </Button>
//       {result && (
//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Analysis Result</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Sentiment: {result.sentiment}</p>
//             <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }


'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function SentimentAnalysis() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);


  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || 'AIzaSyCDG0wArUJBQB5C8zcVRepFxUe6Vj0S5f8')
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const analyzeSentimentWithGemini = async (text: string) => {
    try {
      const prompt = `Analyze the sentiment of the following text and provide the sentiment (Positive, Negative, Neutral) and confidence level(Structure like this: "Sentiment: Positive, Confidence: 0.95"): "${text}"`;
      const response = await model.generateContent(prompt);

      const responseText: any = response.response?.text || '';
      // Assuming the response returns a structured text like "Sentiment: Positive, Confidence: 0.95"
      const [sentimentPart, confidencePart] = responseText.split(',').map((item: any) => item.trim());

      return {
        sentiment: sentimentPart.replace('Sentiment:', '').trim(),
        confidence: parseFloat(confidencePart.replace('Confidence:', '').trim()),
      };
    } catch (error) {
      console.error('Error analyzing sentiment with Gemini API:', error);
      throw new Error('Failed to analyze sentiment.');
    }
  };


  // const analyzeSentiment = async () => {
  //   setIsLoading(true)
  //   try {
  //     const analysisResult = await analyzeSentimentWithGemini(input)
  //     setResult(analysisResult)
  //   } catch (error) {
  //     console.error('Error analyzing sentiment:', error)
  //     setResult(null)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const analyzeSentiment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        console.error('API Error:', data.error);
        setResult(null);
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Sentiment Analysis</h1>
      <div className="mb-6">
        <Textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="w-full"
        />
      </div>
      <Button onClick={analyzeSentiment} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </Button>
      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result}</p>
            {/* <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p> */}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
