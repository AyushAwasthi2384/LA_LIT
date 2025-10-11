
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Bot, Send, Loader2, MessageCircle, User, Sparkles } from 'lucide-react'
import Sentiment from 'sentiment'
import { GoogleGenerativeAI } from "@google/generative-ai"

type Message = {
  role: 'user' | 'model'
  text: string
  sentiment?: string
  score?: number
  timestamp?: string
}

type ChatSession = {
  id: string
  date: string
  time: string
  messages: Message[]
}

export default function Chatbot() {
  const createNewSession = (): ChatSession => {
    const now = new Date()
    const id = `${now.toISOString().slice(2, 10).replace(/-/g, '')}_${now.toTimeString().slice(0, 5).replace(':', '')}`
    return {
      id,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      messages: [
        {
          role: 'user',
          text: "Your name is Lalit. You are a support assistant at an e-commerce platform called Snikre, a company specializing in premium brand shoes. Snikre is the ultimate destination for luxury footwear, offering a curated collection for Gen Z with exclusive collaborations and the latest drops from top-tier brands. You can explore the frontpage collection here: https://www.snikre.com/collections/frontpage. Snikre is committed to making luxury accessible with competitive pricing on premium sneakers, boots, and more: https://www.snikre.com. The platform ensures a seamless shopping experience with secure checkouts, reliable shipping, and a 7-day return policy: https://www.snikre.com/pages/return-and-refund. Our diverse range of products includes high-performance running shoes, which you can browse here: https://www.snikre.com/collections/running-shoes. Thank you for assisting customers with their needs and helping them discover Snikre’s exceptional offerings! (if you don't have relevant links to provide, give this https://snikre.com). firstly ask the language to continue and next ask about the product. Respond in nice MD format"
        },
        {
          role: 'model',
          text: '**Hey!** How can I help you today?',
        },
      ],
    }
  }

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentSession, setCurrentSession] = useState<ChatSession>(() => createNewSession())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API || '')
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const saveToLocalStorage = (sessions: ChatSession[]) => {
    localStorage.setItem('chatHistories', JSON.stringify(sessions))
  }

  const loadSessionsFromLocalStorage = (): ChatSession[] => {
    const savedSessions = localStorage.getItem('chatHistories')
    return savedSessions ? JSON.parse(savedSessions) : []
  }

  const updateSessionHistory = (newSession: ChatSession) => {
    const allSessions = loadSessionsFromLocalStorage()
    allSessions.push(newSession)
    saveToLocalStorage(allSessions)
  }

  const sendMessageToGemini = async (message: string) => {
    try {
      const chat = model.startChat({
        history: currentSession.messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      })

      const response = await chat.sendMessageStream(message)
      let responseText = ''

      for await (const chunk of response.stream) {
        responseText += chunk.text()
      }

      return responseText
    } catch (error) {
      console.error('Error interacting with Gemini API:', error)
      throw new Error('Failed to get response from Gemini API.')
    }
  }

  const analyzeSentiment = (text: string) => {
    const sentiment = new Sentiment()
    const result = sentiment.analyze(text)
    const sentimentLabel = result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral'
    return { sentiment: sentimentLabel, score: result.score }
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    }
    const sentimentData = analyzeSentiment(input)
    userMessage.sentiment = sentimentData.sentiment
    userMessage.score = sentimentData.score

    const updatedMessages = [...currentSession.messages, userMessage]
    setCurrentSession((prev) => ({ ...prev, messages: updatedMessages }))

    setInput('')
    setIsLoading(true)

    try {
      const botResponse = await sendMessageToGemini(input)

      const botMessage: Message = {
        role: 'model',
        text: botResponse,
        timestamp: new Date().toISOString(),
      }

      setCurrentSession((prev) => {
        const updated = { ...prev, messages: [...prev.messages, botMessage] }
        updateSessionHistory(updated)
        return updated
      })
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const savedSessions = loadSessionsFromLocalStorage()
    if (savedSessions.length) {
      saveToLocalStorage([...savedSessions, currentSession])
    } else {
      saveToLocalStorage([currentSession])
    }
  }, [currentSession])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">Chat with Lalit</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your AI-powered support assistant for Snikre's premium footwear collection
          </p>
        </motion.div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-white/20 hover:border-white/40 transition-all duration-300 h-[70vh] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {currentSession.messages.slice(1).map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={`px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                            : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                        }`}>
                          <div className="prose prose-invert max-w-none">
                            <ReactMarkdown className="text-sm leading-relaxed">
                              {message.text}
                            </ReactMarkdown>
                          </div>
                          {message.role === 'user' && message.sentiment && (
                            <div className="text-xs mt-2 opacity-70">
                              Sentiment: {message.sentiment} ({message.score})
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Loading Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Lalit is typing...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/20">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Type your message to Lalit..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="input"
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    onClick={sendMessage} 
                    disabled={isLoading || !input.trim()}
                    className="btn-primary group"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {[
              {
                title: "24/7 Support",
                description: "Always available to help with your queries",
                icon: MessageCircle,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Smart Responses",
                description: "AI-powered intelligent responses",
                icon: Bot,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Sentiment Analysis",
                description: "Understands the tone of your messages",
                icon: Sparkles,
                color: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/70">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
