"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Recycle,
  RefreshCw,
  Lightbulb,
  Leaf,
  Home,
  Utensils,
  Shirt,
  Droplets,
  CheckCircle,
  ArrowRight,
  Target,
  Calendar,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react"

interface ImpactData {
  recycled: number
  reused: number
  repurposed: number
  co2Saved: number
}

export default function EcoGuide() {
  const [impactData, setImpactData] = useState<ImpactData>({
    recycled: 127,
    reused: 45,
    repurposed: 23,
    co2Saved: 89,
  })

  const [newAction, setNewAction] = useState({
    type: "recycled" as keyof Omit<ImpactData, "co2Saved">,
    quantity: 1,
    material: "",
  })

  // CO2 savings per kg for different materials
  const co2Factors = {
    paper: 1.2,
    plastic: 2.1,
    glass: 0.3,
    metal: 3.2,
    organic: 0.8,
    textile: 1.5,
    electronic: 5.0,
    battery: 8.0,
  }

  const addAction = () => {
    if (!newAction.material || newAction.quantity <= 0) return

    const materialFactor = co2Factors[newAction.material as keyof typeof co2Factors] || 1.0
    const co2Impact = newAction.quantity * materialFactor

    setImpactData((prev) => ({
      ...prev,
      [newAction.type]: prev[newAction.type] + newAction.quantity,
      co2Saved: prev.co2Saved + co2Impact,
    }))

    // Reset form
    setNewAction({
      type: "recycled",
      quantity: 1,
      material: "",
    })
  }

  const resetImpact = () => {
    setImpactData({
      recycled: 0,
      reused: 0,
      repurposed: 0,
      co2Saved: 0,
    })
  }

  const recycleGuides = [
    {
      category: "Paper & Cardboard",
      icon: "📄",
      items: [
        { name: "Newspapers & Magazines", method: "Clean, dry, bundle together", impact: "1 tonne saves 17 trees" },
        { name: "Cardboard Boxes", method: "Flatten, remove tape/staples", impact: "Reduces landfill by 75%" },
        {
          name: "Office Paper",
          method: "Remove clips, sort by type",
          impact: "1 tonne saves 3.3 cubic yards landfill",
        },
      ],
      color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20",
    },
    {
      category: "Plastic Items",
      icon: "🥤",
      items: [
        { name: "PET Bottles", method: "Remove caps, rinse clean", impact: "1 bottle = 1 new bottle fiber" },
        { name: "Food Containers", method: "Clean thoroughly, check recycling code", impact: "Reduces ocean plastic" },
        { name: "Shopping Bags", method: "Return to store collection points", impact: "1 bag = 4 new bags" },
      ],
      color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20",
    },
    {
      category: "Electronic Waste",
      icon: "📱",
      items: [
        { name: "Old Phones", method: "Data wipe, battery removal", impact: "Recovers precious metals" },
        { name: "Batteries", method: "Separate by type, special collection", impact: "Prevents toxic leaching" },
        { name: "Cables & Chargers", method: "Sort by type, bundle together", impact: "Copper recovery 95%" },
      ],
      color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20",
    },
    {
      category: "Glass & Metal",
      icon: "🍶",
      items: [
        { name: "Glass Bottles", method: "Remove caps, sort by color", impact: "100% recyclable infinitely" },
        { name: "Aluminum Cans", method: "Rinse clean, crush to save space", impact: "95% energy savings" },
        { name: "Steel Cans", method: "Remove labels, rinse clean", impact: "Magnetic separation easy" },
      ],
      color: "bg-gray-50 border-gray-200 dark:bg-gray-900/20",
    },
  ]

  const reuseIdeas = [
    {
      category: "Household Items",
      icon: "🏠",
      ideas: [
        { item: "Glass Jars", uses: ["Storage containers", "Planters", "Candle holders", "Organizers"] },
        { item: "Plastic Containers", uses: ["Seed starters", "Paint palettes", "Tool organizers", "Lunch boxes"] },
        { item: "Old T-shirts", uses: ["Cleaning rags", "Plant ties", "Dust covers", "Pet bedding"] },
        { item: "Cardboard Boxes", uses: ["Storage", "Cat houses", "Organizers", "Moving supplies"] },
      ],
      color: "bg-green-50 border-green-200 dark:bg-green-900/20",
    },
    {
      category: "Creative Projects",
      icon: "🎨",
      ideas: [
        { item: "Wine Bottles", uses: ["Vases", "Candle holders", "Garden borders", "Bird feeders"] },
        { item: "Egg Cartons", uses: ["Seed starters", "Paint palettes", "Organizers", "Fire starters"] },
        { item: "Tin Cans", uses: ["Planters", "Pencil holders", "Lanterns", "Bird houses"] },
        { item: "Newspaper", uses: ["Gift wrap", "Mulch", "Fire starter", "Craft projects"] },
      ],
      color: "bg-pink-50 border-pink-200 dark:bg-pink-900/20",
    },
  ]

  const repurposeProjects = [
    {
      title: "Furniture Makeover",
      difficulty: "Medium",
      time: "2-4 hours",
      materials: ["Old furniture", "Paint", "Sandpaper", "Brushes"],
      steps: [
        "Clean and sand the surface",
        "Apply primer if needed",
        "Paint with desired color",
        "Add protective finish",
      ],
      impact: "Saves 80% vs buying new",
      icon: "🪑",
    },
    {
      title: "Garden Planters",
      difficulty: "Easy",
      time: "30 minutes",
      materials: ["Plastic containers", "Drill", "Potting soil", "Plants"],
      steps: ["Clean containers thoroughly", "Drill drainage holes", "Add potting soil", "Plant your seeds/seedlings"],
      impact: "Reduces plastic waste 100%",
      icon: "🌱",
    },
    {
      title: "Storage Solutions",
      difficulty: "Easy",
      time: "1 hour",
      materials: ["Boxes", "Fabric", "Glue", "Labels"],
      steps: ["Cover boxes with fabric", "Secure with glue", "Add labels for organization", "Stack and organize"],
      impact: "Organizes without buying new",
      icon: "📦",
    },
  ]

  const dailyTips = [
    {
      category: "Kitchen",
      icon: Utensils,
      tips: [
        "Use both sides of aluminum foil",
        "Repurpose glass jars for storage",
        "Compost food scraps",
        "Use cloth napkins instead of paper",
      ],
      impact: "30% waste reduction",
    },
    {
      category: "Bathroom",
      icon: Droplets,
      tips: [
        "Use refillable containers",
        "Cut open tubes to get last bits",
        "Use old towels as cleaning rags",
        "Make DIY cleaning solutions",
      ],
      impact: "25% plastic reduction",
    },
    {
      category: "Office",
      icon: Home,
      tips: ["Print on both sides", "Reuse envelopes and folders", "Use digital receipts", "Refill ink cartridges"],
      impact: "40% paper savings",
    },
    {
      category: "Wardrobe",
      icon: Shirt,
      tips: [
        "Donate clothes you don't wear",
        "Repair instead of replacing",
        "Use old clothes as cleaning rags",
        "Shop at thrift stores",
      ],
      impact: "50% textile waste reduction",
    },
  ]

  const challenges = [
    {
      title: "Zero Waste Week",
      description: "Try to produce no waste for 7 days",
      difficulty: "Hard",
      duration: "7 days",
      reward: "Environmental Champion Badge",
      participants: 1250,
    },
    {
      title: "Plastic-Free Day",
      description: "Avoid all single-use plastics for one day",
      difficulty: "Medium",
      duration: "1 day",
      reward: "Plastic Warrior Badge",
      participants: 3400,
    },
    {
      title: "Upcycle Challenge",
      description: "Create something new from 3 waste items",
      difficulty: "Easy",
      duration: "Weekend",
      reward: "Creative Recycler Badge",
      participants: 2100,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
          🌱 Sustainable Living Guide
        </Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">Everyday Eco-Friendly Practices</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn how to reduce, reuse, and repurpose everyday items to minimize waste and maximize environmental impact
        </p>
      </div>

      <Tabs defaultValue="recycle" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="recycle" className="flex items-center gap-2">
            <Recycle className="h-4 w-4" />
            Recycle
          </TabsTrigger>
          <TabsTrigger value="reuse" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reuse
          </TabsTrigger>
          <TabsTrigger value="repurpose" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Repurpose
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Daily Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recycle" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recycleGuides.map((guide, index) => (
              <Card key={index} className={`${guide.color} hover-lift transition-all duration-300`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{guide.icon}</span>
                    {guide.category}
                  </CardTitle>
                  <CardDescription>Proper recycling methods for maximum impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {guide.items.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{item.method}</p>
                      <Badge variant="outline" className="text-xs">
                        {item.impact}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reuse" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reuseIdeas.map((category, index) => (
              <Card key={index} className={`${category.color} hover-lift transition-all duration-300`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    {category.category}
                  </CardTitle>
                  <CardDescription>Creative ways to give items a second life</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.ideas.map((idea, idx) => (
                    <div key={idx} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">{idea.item}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {idea.uses.map((use, useIdx) => (
                          <div key={useIdx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-xs">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="repurpose" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {repurposeProjects.map((project, index) => (
              <Card key={index} className="hover-lift transition-all duration-300 bg-white/70 dark:bg-gray-800/70">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{project.icon}</span>
                    <Badge
                      variant={
                        project.difficulty === "Easy"
                          ? "default"
                          : project.difficulty === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {project.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {project.time}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Materials Needed:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.materials.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Steps:</h4>
                    <ol className="text-xs space-y-1">
                      {project.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <p className="text-xs text-green-800 dark:text-green-300 font-medium">
                      💚 Impact: {project.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyTips.map((tipCategory, index) => (
              <Card key={index} className="hover-lift transition-all duration-300 bg-white/70 dark:bg-gray-800/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <tipCategory.icon className="h-6 w-6 text-green-600" />
                    {tipCategory.category}
                  </CardTitle>
                  <CardDescription>Simple daily practices for sustainable living</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tipCategory.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                      🎯 Potential Impact: {tipCategory.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Challenges */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-green-600" />
                Weekly Eco Challenges
              </CardTitle>
              <CardDescription>Join our community challenges to make a bigger impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{challenge.title}</h4>
                      <Badge
                        variant={
                          challenge.difficulty === "Easy"
                            ? "default"
                            : challenge.difficulty === "Medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{challenge.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Duration: {challenge.duration}</span>
                        <span>{challenge.participants} participants</span>
                      </div>
                      <Progress value={Math.random() * 100} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium">🏆 {challenge.reward}</span>
                        <Button size="sm" className="h-6 text-xs">
                          Join Challenge
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Functional Impact Calculator */}
      <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Your Personal Impact Calculator
          </CardTitle>
          <CardDescription>Track your daily eco-friendly actions and see the cumulative impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Impact Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{impactData.recycled}</div>
              <div className="text-xs text-muted-foreground">Items Recycled</div>
            </div>
            <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{impactData.reused}</div>
              <div className="text-xs text-muted-foreground">Items Reused</div>
            </div>
            <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{impactData.repurposed}</div>
              <div className="text-xs text-muted-foreground">Items Repurposed</div>
            </div>
            <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{impactData.co2Saved.toFixed(1)}kg</div>
              <div className="text-xs text-muted-foreground">CO₂ Saved</div>
            </div>
          </div>

          {/* Add New Action Form */}
          <Card className="bg-white/80 dark:bg-gray-800/80">
            <CardHeader>
              <CardTitle className="text-lg">Add New Eco Action</CardTitle>
              <CardDescription>Log your sustainable activities to track your environmental impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="action-type">Action Type</Label>
                  <select
                    id="action-type"
                    value={newAction.type}
                    onChange={(e) =>
                      setNewAction((prev) => ({ ...prev, type: e.target.value as keyof Omit<ImpactData, "co2Saved"> }))
                    }
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="recycled">Recycled</option>
                    <option value="reused">Reused</option>
                    <option value="repurposed">Repurposed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Material Type</Label>
                  <select
                    id="material"
                    value={newAction.material}
                    onChange={(e) => setNewAction((prev) => ({ ...prev, material: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="">Select material</option>
                    <option value="paper">Paper/Cardboard</option>
                    <option value="plastic">Plastic</option>
                    <option value="glass">Glass</option>
                    <option value="metal">Metal</option>
                    <option value="organic">Organic Waste</option>
                    <option value="textile">Textile</option>
                    <option value="electronic">Electronic</option>
                    <option value="battery">Battery</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setNewAction((prev) => ({ ...prev, quantity: Math.max(0.1, prev.quantity - 0.1) }))
                      }
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={newAction.quantity}
                      onChange={(e) =>
                        setNewAction((prev) => ({
                          ...prev,
                          quantity: Math.max(0.1, Number.parseFloat(e.target.value) || 0.1),
                        }))
                      }
                      className="text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNewAction((prev) => ({ ...prev, quantity: prev.quantity + 0.1 }))}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button onClick={addAction} className="w-full bg-earth-gradient hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Action
                  </Button>
                </div>
              </div>

              {newAction.material && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    💡 This action will save approximately{" "}
                    <strong>
                      {(
                        newAction.quantity * (co2Factors[newAction.material as keyof typeof co2Factors] || 1.0)
                      ).toFixed(1)}
                      kg CO₂
                    </strong>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Environmental Impact Visualization */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Your Environmental Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">🌳</div>
                <div className="text-lg font-bold text-green-600">{Math.round(impactData.co2Saved * 0.045)}</div>
                <div className="text-xs text-muted-foreground">Trees Equivalent</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl mb-2">🚗</div>
                <div className="text-lg font-bold text-blue-600">{Math.round(impactData.co2Saved * 2.5)}km</div>
                <div className="text-xs text-muted-foreground">Car Travel Saved</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-lg font-bold text-purple-600">{Math.round(impactData.co2Saved * 1000)}kWh</div>
                <div className="text-xs text-muted-foreground">Energy Saved</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-earth-gradient hover:opacity-90">
              Share Your Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={resetImpact} className="hover-lift bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Counter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
