'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Users, Target, Code, Palette, Brain, Sparkles } from 'lucide-react'

const teamMembers = [
  { name: 'Ayush Awasthi', role: 'Team Leader and AI Developer', github: 'https://www.github.com/AyushAwasthi2384', linkedin: 'https://www.linkedin.com/in/ayush2384' },
  { name: 'Ayush Gauniyal', role: 'Full Stack Developer', github: 'https://www.github.com/agpersonal6104', linkedin: 'https://www.linkedin.com/in/ayush-gauniyal-15ba7b2b3/' },
  { name: 'Avichal Saxena', role: 'AI Developer and Project Planner', github: 'https://www.github.com/avichal077', linkedin: 'https://www.linkedin.com/in/avichal-saxena-709396331/' },
  { name: 'Amay Mishra', role: 'UI/UX Designer and Frontend Developer', github: 'https://www.github.com/crucie', linkedin: 'https://www.linkedin.com/in/kshimate/' }
]

export default function About() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">About Our Project</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover the innovative AI-powered platform that revolutionizes customer support and sentiment analysis
          </p>
        </motion.div>

        {/* Project Goals */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="glass border-white/20 hover:border-white/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2 text-3xl">
                <Target className="w-8 h-8" />
                <span>Project Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/90 leading-relaxed">
                Our project aims to demonstrate the power of AI in sentiment analysis and
                customer support. We&apos;ve built a platform that combines advanced natural language
                processing for sentiment analysis with an intelligent chatbot to provide efficient and
                insightful customer service solutions.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Analysis",
                description: "Advanced machine learning models for accurate sentiment analysis",
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Modern Design",
                description: "Beautiful, responsive UI with glass morphism effects",
                icon: Palette,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Smart Integration",
                description: "Seamless API integration with existing systems",
                icon: Code,
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
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center space-x-3">
            <Sparkles className="w-8 h-8" />
            <span>Our Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass hover:shadow-2xl transition-all duration-300 group h-full">
                  <CardHeader>
                    <CardTitle className="text-white text-center">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-white/80 mb-6">{member.role}</p>
                    <div className="flex justify-center space-x-4">
                      <a 
                        href={member.github} 
                        className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub size={24} />
                      </a>
                      <a 
                        href={member.linkedin} 
                        className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin size={24} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

