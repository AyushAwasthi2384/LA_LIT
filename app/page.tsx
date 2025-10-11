"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Brain, MessageCircle, Zap, ArrowRight, Sparkles, Star, Users, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';

const AnimatedTitle = () => {
  const words = "Your Custom Support Vala Assistant".split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-[8rem] pt-[2rem] cursor-default"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="flex h-[10rem] flex-wrap justify-center gap-x-4 gap-y-4 text-5xl md:text-6xl font-bold">
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={child}
            className="inline-block h-[10rem]"
          >
            <motion.span
              className="h-[10rem] inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200"
              whileHover={{
                scale: 1.1,
                rotate: [-1, 1, -1, 1, 0],
                transition: {
                  duration: 0.3,
                  rotate: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.5
                  }
                }
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: idx * 0.2
                }
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        ))}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-screen h-[1px] mb-[1rem] bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{
          scaleX: [1, 0, 1],
          x: ["-100%", "0%", "100%"],
        }} 
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stats = [
  { value: 99, label: "Accuracy", suffix: "%", icon: TrendingUp },
  { value: 24, label: "Support", suffix: "/7", icon: Users },
  { value: 50000, label: "Potential Users", suffix: "+", icon: Star }
];

export default function Home() {
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
        {/* Hero Section */}
        <motion.section
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedTitle />
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Harness the power of AI to understand your customers like never before
          </motion.p>
          <motion.div 
            className="space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button asChild size="lg" className="group btn-primary">
              <Link href="/sentiment-analysis">
                Try Sentiment Analysis
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-secondary">
              <Link href="/chatbot">Chat with our Bot</Link>
            </Button>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="text-center glass hover:shadow-2xl transition-all duration-300 group-hover:border-white/40">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <Icon className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      <CountUp end={stat.value} duration={2.5} separator="," />
                      {stat.suffix}
                    </div>
                    <p className="text-white/80">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.section>

        {/* Features Carousel */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent>
              {[
                {
                  title: "Sentiment Analysis",
                  description: "Get instant insights into customer feedback",
                  icon: Brain,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "AI Chatbot",
                  description: "24/7 intelligent customer support",
                  icon: MessageCircle,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Easy Integration",
                  description: "Seamless API integration with your systems",
                  icon: Zap,
                  color: "from-green-500 to-emerald-500"
                }
              ].map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    className="h-full p-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full glass hover:shadow-2xl transition-all duration-300 group">
                      <CardHeader>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white">{feature.title}</CardTitle>
                        <CardDescription className="text-white/80">{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/70">
                          Experience the power of AI with our advanced {feature.title.toLowerCase()} solutions.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white hover:bg-white/20" />
            <CarouselNext className="text-white hover:bg-white/20" />
          </Carousel>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Card className="glass border-white/30 hover:border-white/50 transition-all duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-white/80" />
              </div>
              <CardTitle className="text-3xl text-white">Ready to Get Started?</CardTitle>
              <CardDescription className="text-white/80">Join thousands of satisfied users today</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="mt-4 btn-primary group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}