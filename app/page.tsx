"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  Leaf,
  TrendingUp,
  Users,
  Globe,
  Recycle,
  Truck,
  Building2,
  Heart,
  Star,
  Award,
  Zap,
  Shield,
  Brain,
  Target,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  const [animatedStats, setAnimatedStats] = useState({
    co2Reduced: 0,
    wasteProcessed: 0,
    businesses: 0,
    transactions: 0,
  })

  const finalStats = {
    co2Reduced: 2500,
    wasteProcessed: 15000,
    businesses: 1247,
    transactions: 5890,
  }

  // Animate counters on load
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        co2Reduced: Math.floor(finalStats.co2Reduced * progress),
        wasteProcessed: Math.floor(finalStats.wasteProcessed * progress),
        businesses: Math.floor(finalStats.businesses * progress),
        transactions: Math.floor(finalStats.transactions * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const impactStats = [
    {
      label: "CO₂ Reduced",
      value: animatedStats.co2Reduced,
      unit: "tonnes",
      icon: Leaf,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "Waste Processed",
      value: animatedStats.wasteProcessed,
      unit: "tonnes",
      icon: Recycle,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Active Businesses",
      value: animatedStats.businesses,
      unit: "companies",
      icon: Building2,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Transactions",
      value: animatedStats.transactions,
      unit: "deals",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  const wasteCategories = [
    {
      name: "Industrial Plastics",
      description: "HDPE, PET, PP scraps from manufacturing",
      co2Saving: "2.1 tonnes CO₂/tonne",
      examples: ["Packaging scraps", "Injection molding waste", "Film offcuts"],
      color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
      progress: 85,
    },
    {
      name: "Organic Waste",
      description: "Food waste, agricultural residues, biomass",
      co2Saving: "0.8 tonnes CO₂/tonne",
      examples: ["Restaurant food waste", "Crop residues", "Wood chips"],
      color: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
      progress: 92,
    },
    {
      name: "Metal Scraps",
      description: "Steel, aluminum, copper from manufacturing",
      co2Saving: "3.2 tonnes CO₂/tonne",
      examples: ["Steel shavings", "Aluminum cuttings", "Copper wire"],
      color: "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700",
      progress: 78,
    },
    {
      name: "Textile Waste",
      description: "Fabric scraps, cotton waste, synthetic fibers",
      co2Saving: "1.5 tonnes CO₂/tonne",
      examples: ["Fabric offcuts", "Cotton waste", "Denim scraps"],
      color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800",
      progress: 67,
    },
    {
      name: "Chemical Byproducts",
      description: "Safe industrial chemicals and solvents",
      co2Saving: "2.8 tonnes CO₂/tonne",
      examples: ["Solvents", "Catalysts", "Process chemicals"],
      color: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
      progress: 54,
    },
    {
      name: "Construction Materials",
      description: "Concrete, bricks, aggregates, timber",
      co2Saving: "1.2 tonnes CO₂/tonne",
      examples: ["Concrete blocks", "Brick waste", "Timber offcuts"],
      color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
      progress: 73,
    },
  ]

  const achievements = [
    { icon: Award, title: "Carbon Neutral Certified", description: "Verified environmental impact" },
    { icon: Star, title: "Top Rated Platform", description: "4.9/5 user satisfaction" },
    { icon: Zap, title: "AI-Powered Matching", description: "Smart waste-to-buyer connections" },
  ]

  const differentiators = [
    {
      icon: Brain,
      title: "AI-Powered Smart Matching",
      description:
        "Advanced algorithms match waste materials with the most suitable buyers based on location, quantity, and processing capabilities.",
      highlight: "95% match accuracy",
    },
    {
      icon: Shield,
      title: "Verified Business Network",
      description:
        "All businesses undergo rigorous verification including environmental compliance, financial stability, and operational capacity.",
      highlight: "100% verified sellers",
    },
    {
      icon: Target,
      title: "Real-Time CO₂ Impact Tracking",
      description:
        "Live carbon footprint calculator showing exact environmental impact of each transaction with detailed sustainability metrics.",
      highlight: "Live impact tracking",
    },
    {
      icon: Truck,
      title: "Integrated Logistics Network",
      description:
        "Built-in logistics partners for seamless pickup, transportation, and delivery with real-time tracking and insurance coverage.",
      highlight: "End-to-end logistics",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance System",
      description:
        "Multi-level quality checks including photo verification, sample testing, and third-party inspections before transactions.",
      highlight: "Quality guaranteed",
    },
    {
      icon: Globe,
      title: "Regulatory Compliance Hub",
      description:
        "Automated compliance checking with environmental regulations, waste management laws, and industry standards across all states.",
      highlight: "Auto-compliance",
    },
  ]

  return (
    <div className="min-h-screen bg-nature-light dark:bg-nature-dark transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-green-200 dark:border-green-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-earth-gradient p-2 rounded-lg animate-pulse-green">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  WasteWealth
                </h1>
                <p className="text-xs text-muted-foreground">Smart Waste-to-Wealth Marketplace</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/marketplace">
                <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                  Browse Marketplace
                </Button>
              </Link>
              <Button size="sm" className="bg-earth-gradient hover:opacity-90 hover-lift">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 dark:from-green-900/20 dark:to-blue-900/20"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100 animate-float">
            🌍 Fighting Climate Change Through Circular Economy
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Turn Your{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Waste into Wealth
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join India's largest digital marketplace for industrial waste trading. Transform your company's waste into
            another's raw material while reducing carbon footprint and generating revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button size="lg" className="bg-earth-gradient text-lg px-8 hover:opacity-90 hover-lift">
                Explore Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 hover-lift bg-transparent">
              List Your Waste
            </Button>
          </div>

          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover-lift bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <achievement.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-green-50 dark:bg-green-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/texture-pattern.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="text-4xl font-serif text-green-700 dark:text-green-300 italic mb-4">
            "One man's trash is another man's treasure"
          </div>
          <p className="text-lg text-muted-foreground">
            The philosophy that drives our marketplace and the circular economy
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-24 bg-earth-gradient rounded-full"></div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              🚀 Innovation & Excellence
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">What Makes WasteWealth Different</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Unlike traditional waste management platforms, we combine cutting-edge technology with environmental
              science to create the most efficient and impactful waste trading ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((feature, index) => (
              <Card
                key={index}
                className="hover-lift transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm group"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Platform Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">Features</th>
                    <th className="text-center py-4 px-4 font-semibold text-green-600">WasteWealth</th>
                    <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Traditional Platforms</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="py-3 px-4">AI-Powered Matching</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">Manual Search</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Real-time CO₂ Tracking</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">Not Available</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Integrated Logistics</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">External Partners</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Quality Assurance</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">Basic Verification</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Regulatory Compliance</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">Manual Process</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Impact Stats */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Climate Impact</h2>
            <p className="text-lg text-muted-foreground">Real numbers, real change for our planet</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className={`text-center hover-lift transition-all duration-300 ${stat.bgColor}`}>
                <CardContent className="pt-6">
                  <div className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-3`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                    {stat.value.toLocaleString()}
                    <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Waste Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Waste Categories We Handle</h2>
            <p className="text-lg text-muted-foreground">Diverse materials, maximum environmental impact</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteCategories.map((category, index) => (
              <Card key={index} className={`${category.color} hover-lift transition-all duration-300 group`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.co2Saving}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Market Activity</span>
                      <span className="font-medium">{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Common Examples:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.examples.map((example, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Climate Impact & UN SDGs Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/earth-pattern.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              🌍 Climate Action & Sustainability
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Mitigating Climate Change Through Circular Economy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              WasteWealth directly contributes to global climate action by transforming waste into valuable resources,
              supporting multiple UN Sustainable Development Goals and India's climate commitments.
            </p>
          </div>

          {/* Climate Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover-lift bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">🌡️</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">-45%</div>
                <p className="text-sm text-muted-foreground">
                  Carbon Intensity Reduction Target by 2030 (India's NDC Commitment)
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover-lift bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">♻️</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">75%</div>
                <p className="text-sm text-muted-foreground">Waste Diversion from Landfills Through Our Platform</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-lift bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">2070</div>
                <p className="text-sm text-muted-foreground">Supporting India's Net-Zero Emissions Goal</p>
              </CardContent>
            </Card>
          </div>

          {/* UN SDGs Section */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Supporting UN Sustainable Development Goals</h3>
              <p className="text-muted-foreground">
                Our platform directly contributes to achieving multiple UN SDGs through waste-to-wealth transformation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center group hover-lift">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  6
                </div>
                <h4 className="font-semibold text-sm mb-1">Clean Water</h4>
                <p className="text-xs text-muted-foreground">
                  Reducing water pollution through proper waste management
                </p>
              </div>

              <div className="text-center group hover-lift">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  7
                </div>
                <h4 className="font-semibold text-sm mb-1">Clean Energy</h4>
                <p className="text-xs text-muted-foreground">Converting organic waste to renewable energy sources</p>
              </div>

              <div className="text-center group hover-lift">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  8
                </div>
                <h4 className="font-semibold text-sm mb-1">Economic Growth</h4>
                <p className="text-xs text-muted-foreground">
                  Creating jobs and economic opportunities in circular economy
                </p>
              </div>

              <div className="text-center group hover-lift">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  9
                </div>
                <h4 className="font-semibold text-sm mb-1">Innovation</h4>
                <p className="text-xs text-muted-foreground">
                  Digital platform innovation for sustainable industry practices
                </p>
              </div>

              <div className="text-center group hover-lift">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  12
                </div>
                <h4 className="font-semibold text-sm mb-1">Responsible Consumption</h4>
                <p className="text-xs text-muted-foreground">
                  Promoting circular economy and sustainable production patterns
                </p>
              </div>

              <div className="text-center group hover-lift">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  13
                </div>
                <h4 className="font-semibold text-sm mb-1">Climate Action</h4>
                <p className="text-xs text-muted-foreground">
                  Direct CO₂ reduction through waste diversion and recycling
                </p>
              </div>
            </div>
          </div>

          {/* Climate Commitments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover-lift bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  India's Climate Commitments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="text-sm">Reduce carbon intensity by 45% by 2030</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="text-sm">Achieve 50% renewable energy capacity by 2030</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="text-sm">Net-zero emissions by 2070</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="text-sm">Create additional carbon sink of 2.5-3 billion tonnes CO₂</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Our Platform's Contribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm">Diverting 15,000+ tonnes of waste from landfills</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm">Preventing 2,500+ tonnes of CO₂ emissions</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm">Supporting 1,200+ businesses in circular economy</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm">Creating green jobs and sustainable livelihoods</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 rounded-full px-6 py-3 mb-6">
              <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-300 font-medium">Be Part of the Climate Solution</span>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Every waste transaction on our platform contributes to a more sustainable future and helps achieve global
              climate goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-earth-gradient hover:opacity-90 hover-lift">
                Start Your Climate Impact
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                Learn About SDGs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-16 bg-earth-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Heart className="h-4 w-4 text-white animate-pulse-green" />
            <span className="text-white text-sm font-medium">Join the Green Revolution</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of businesses already transforming waste into wealth while fighting climate change
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 hover-lift bg-white text-green-700 hover:bg-white/90"
              >
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 text-white border-white hover:bg-white/10 bg-transparent hover-lift"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-earth-gradient p-2 rounded-lg">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold">WasteWealth</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                India's leading platform for sustainable waste trading and circular economy solutions.
              </p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
                <Users className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
                <Truck className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Browse Marketplace</li>
                <li className="hover:text-white cursor-pointer transition-colors">List Materials</li>
                <li className="hover:text-white cursor-pointer transition-colors">AI Matching</li>
                <li className="hover:text-white cursor-pointer transition-colors">Carbon Calculator</li>
                <li className="hover:text-white cursor-pointer transition-colors">Analytics Dashboard</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Sustainability Guide</li>
                <li className="hover:text-white cursor-pointer transition-colors">Waste Categories</li>
                <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
                <li className="hover:text-white cursor-pointer transition-colors">Climate Impact</li>
                <li className="hover:text-white cursor-pointer transition-colors">Industry Reports</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Safety Guidelines</li>
                <li className="hover:text-white cursor-pointer transition-colors">Compliance</li>
                <li className="hover:text-white cursor-pointer transition-colors">Partner Program</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 WasteWealth Marketplace. All rights reserved. | Fighting climate change, one transaction at a
              time. 🌱
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
