'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart3, Brain, Loader2, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function SentimentAnalysis() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ sentiment: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="w-8 h-8 text-green-400" />;
      case 'negative':
        return <TrendingDown className="w-8 h-8 text-red-400" />;
      default:
        return <Minus className="w-8 h-8 text-yellow-400" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'from-green-500 to-emerald-500';
      case 'negative':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-yellow-500 to-orange-500';
    }
  };

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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">Sentiment Analysis</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover the emotional tone and sentiment behind any text with our advanced AI-powered analysis
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="glass border-white/20 hover:border-white/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Brain className="w-6 h-6" />
                  <span>Enter your text for analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type or paste your text here to analyze its sentiment..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={6}
                  className="input resize-none"
                />
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={analyzeSentiment} 
                    disabled={isLoading || !input.trim()}
                    className="btn-primary group"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Sentiment
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass border-white/20 hover:border-white/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <span>Analysis Result</span>
                    {getSentimentIcon(result.sentiment)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getSentimentColor(result.sentiment)} text-white font-semibold`}>
                        {result.sentiment.toUpperCase()}
                      </div>
                      {result.confidence && (
                        <div className="text-white/80">
                          Confidence: {(result.confidence * 100).toFixed(1)}%
                        </div>
                      )}
                    </div>
                    <div className="text-white/90">
                      <p className="text-lg">
                        The sentiment analysis indicates a <strong className="text-white">{result.sentiment}</strong> tone in your text.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Features */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {[
              {
                title: "Real-time Analysis",
                description: "Get instant sentiment analysis results",
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "High Accuracy",
                description: "Advanced AI models for precise results",
                icon: TrendingUp,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Easy Integration",
                description: "Simple API for seamless integration",
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
