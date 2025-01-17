// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// import { GoogleGenerativeAI } from "@google/generative-ai";

// type Message = {
//   role: 'user' | 'model'
//   parts: { text: string }[]
// }

// export default function Chatbot() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'model',
//       parts: [{ text: 'Hello! How can I assist you today?' }],
//     },
//   ])
//   const [input, setInput] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const genAI: any = new GoogleGenerativeAI(process.env.GEMINI_API);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const chat = model.startChat({
//     history: [{
//       role: 'user',
//       parts: [{ text: 'Hello! You are supposed to act like a support assistant at an ecommerce platform?' }],
//     } ,...messages],
//   });

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const chatSession = async () => {
//     let result = await chat.sendMessageStream("I have 2 dogs in my house.");
//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       process.stdout.write(chunkText);
//     }
//     console.log("result", result)

//     let result2 = await chat.sendMessageStream("How many paws are in my house?");
//     for await (const chunk of result2.stream) {
//       const chunkText = chunk.text();
//       process.stdout.write(chunkText);
//     }
//   }

//   useEffect(scrollToBottom, [messages])

//   const sendMessage = async () => {
//     if (!input.trim()) return

//     const userMessage: Message = { role: 'user', parts: [{ text: input }] }
//     setMessages((prev) => [...prev, userMessage])
//     setInput('')
//     setIsLoading(true)

//     try {
//       const response = await fetch('/api/chatbot', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       })
//       const data = await response.json()
//       const botMessage: Message = { role: 'model', parts: [{ text: data.response }] }
//       setMessages((prev) => [...prev, botMessage])
//     } catch (error) {
//       console.error('Error sending message:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8">Chat with our AI</h1>
//       <Card className="mb-4">
//         <CardHeader>
//           <CardTitle>Chat History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 overflow-y-auto mb-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'
//                   }`}
//               >
//                 <span
//                   className={`inline-block p-2 rounded-lg ${message.role === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 text-gray-800'
//                     }`}
//                 >
//                   {message.parts.map((part, partIndex) => (
//                     <span key={partIndex}>{part.text}</span>
//                   ))}
//                 </span>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex space-x-2">
//         <Input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <Button onClick={sendMessage} disabled={isLoading}>
//           {isLoading ? 'Sending...' : 'Send'}
//         </Button>
//       </div>
//     </div>
//   )
// }



// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
// import { GoogleGenerativeAI } from "@google/generative-ai";

// type Message = {
//   role: 'user' | 'model'
//   text: string
// }

// export default function Chatbot() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'model',
//       text: 'Hello! How can I assist you today?',
//     },
//   ])
//   const [input, setInput] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || 'AIzaSyCDG0wArUJBQB5C8zcVRepFxUe6Vj0S5f8');
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const sendMessageToGemini = async (message: string) => {
//     try {
//       const chat = model.startChat({
//         history: [{
//           role: 'user',
//           parts: [{ text: "Hello" }],
//         }, ...messages].map((msg) => ({
//           role: msg.role,
//           parts: [{ text: msg.text }],
//         })),
//       });

//       const response = await chat.sendMessageStream(message);
//       let responseText = '';

//       for await (const chunk of response.stream) {
//         responseText += chunk.text();
//       }

//       return responseText;
//     } catch (error) {
//       console.error('Error interacting with Gemini API:', error);
//       throw new Error('Failed to get response from Gemini API.');
//     }
//   }

//   useEffect(scrollToBottom, [messages])

//   const sendMessage = async () => {
//     if (!input.trim()) return

//     const userMessage: Message = { role: 'user', text: input }
//     setMessages((prev) => [...prev, userMessage])
//     setInput('')
//     setIsLoading(true)

//     try {
//       const botResponse = await sendMessageToGemini(input);
//       const botMessage: Message = { role: 'model', text: botResponse }
//       setMessages((prev) => [...prev, botMessage])
//     } catch (error) {
//       const errorMessage: Message = { role: 'model', text: 'Oops! Something went wrong. Please try again.' }
//       setMessages((prev) => [...prev, errorMessage])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8">Chat with our AI</h1>
//       <Card className="mb-4">
//         <CardHeader>
//           <CardTitle>Chat History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-96 overflow-y-auto mb-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'
//                   }`}
//               >
//                 <span
//                   className={`inline-block p-2 rounded-lg ${message.role === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 text-gray-800'
//                     }`}
//                 >
//                   {message.text}
//                 </span>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex space-x-2">
//         <Input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <Button onClick={sendMessage} disabled={isLoading}>
//           {isLoading ? 'Sending...' : 'Send'}
//         </Button>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { GoogleGenerativeAI } from "@google/generative-ai";

type Message = {
  role: 'user' | 'model'
  text: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'user',
      text: 'You are a support assistant at an e-commerce platform. Greet the user and assist them.',
    },
    {
      role: 'model',
      text: 'Hey! How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || 'AIzaSyCDG0wArUJBQB5C8zcVRepFxUe6Vj0S5f8');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessageToGemini = async (message: string) => {
    try {
      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      });

      const response = await chat.sendMessageStream(message);
      let responseText = '';

      for await (const chunk of response.stream) {
        responseText += chunk.text();
      }

      return responseText;
    } catch (error) {
      console.error('Error interacting with Gemini API:', error);
      throw new Error('Failed to get response from Gemini API.');
    }
  }

  useEffect(scrollToBottom, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const botResponse = await sendMessageToGemini(input);
      const botMessage: Message = { role: 'model', text: botResponse }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = { role: 'model', text: 'Oops! Something went wrong. Please try again.' }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Chat with our AI</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Chat History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto mb-4">
            {messages.slice(1).map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                    }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  )
}
