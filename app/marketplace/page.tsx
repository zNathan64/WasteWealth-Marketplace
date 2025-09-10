"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Recycle,
  TrendingUp,
  Filter,
  SortAsc,
  MessageSquare,
  Package,
  Leaf,
  BookOpen,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import WasteListings from "../components/waste-listings"
import ListWasteForm from "../components/list-waste-form"
import Dashboard from "../components/dashboard"
import EcoGuide from "../components/eco-guide"
import type { WasteListing } from "../types/waste"
import NotificationsPanel from "../components/notifications-panel"
import ChatPanel from "../components/chat-panel"

// Enhanced mock data with unique images for each listing
const mockListings: WasteListing[] = [
  {
    id: "1",
    title: "HDPE Plastic Packaging Scraps",
    description:
      "High-quality HDPE plastic scraps from packaging operations, clean and sorted. Perfect for recycling into new packaging materials or construction applications.",
    category: "Plastic",
    quantity: "500 kg",
    location: "Mumbai, Maharashtra",
    price: 25,
    company: "PackCorp Industries",
    condition: "Good",
    carbonSaved: 1.05,
    image: "/images/plastic-scraps.jpg",
    postedDate: "2024-01-15",
    status: "available",
  },
  {
    id: "2",
    title: "Restaurant Food Waste - Vegetable Scraps",
    description:
      "Fresh vegetable waste from hotel kitchen operations, suitable for composting or biogas production. Daily collection available.",
    category: "Organic",
    quantity: "200 kg",
    location: "Delhi, NCR",
    price: 5,
    company: "Grand Hotel Chain",
    condition: "Fresh",
    carbonSaved: 0.16,
    image: "/images/food-waste.jpg",
    postedDate: "2024-01-14",
    status: "available",
  },
  {
    id: "3",
    title: "Steel Shavings & Metal Offcuts",
    description:
      "Clean steel shavings from CNC machining operations, high purity metal suitable for steel production recycling.",
    category: "Metal",
    quantity: "1000 kg",
    location: "Pune, Maharashtra",
    price: 45,
    company: "MetalWorks Ltd",
    condition: "Excellent",
    carbonSaved: 3.2,
    image: "/images/metal-scraps.jpg",
    postedDate: "2024-01-13",
    status: "available",
  },
  {
    id: "4",
    title: "Cotton Textile Waste & Fabric Scraps",
    description:
      "Mixed cotton fabric scraps from garment manufacturing, various colors. Ideal for recycling into new textiles or industrial applications.",
    category: "Textile",
    quantity: "300 kg",
    location: "Bangalore, Karnataka",
    price: 15,
    company: "Fashion Forward Ltd",
    condition: "Good",
    carbonSaved: 0.45,
    image: "/images/textile-waste.jpg",
    postedDate: "2024-01-12",
    status: "available",
  },
  {
    id: "5",
    title: "Industrial Solvents - Acetone",
    description:
      "Used but recoverable acetone from electronics manufacturing. Can be purified and reused in various industrial processes.",
    category: "Chemical",
    quantity: "150 kg",
    location: "Chennai, Tamil Nadu",
    price: 80,
    company: "ElectroTech Solutions",
    condition: "Fair",
    carbonSaved: 0.42,
    image: "/images/chemical-waste.jpg",
    postedDate: "2024-01-11",
    status: "available",
  },
  {
    id: "6",
    title: "Cardboard & Paper Waste",
    description:
      "Clean cardboard boxes and paper waste from e-commerce operations. Excellent quality for paper recycling mills.",
    category: "Paper",
    quantity: "800 kg",
    location: "Hyderabad, Telangana",
    price: 12,
    company: "QuickShip Logistics",
    condition: "Good",
    carbonSaved: 0.96,
    image: "/images/cardboard-paper-waste.png",
    postedDate: "2024-01-10",
    status: "available",
  },
  {
    id: "7",
    title: "Concrete Blocks & Construction Debris",
    description:
      "Reusable concrete blocks and aggregates from demolition site. Perfect for road construction and building foundations.",
    category: "Construction",
    quantity: "2000 kg",
    location: "Gurgaon, Haryana",
    price: 8,
    company: "BuildRight Construction",
    condition: "Fair",
    carbonSaved: 2.0,
    image: "/images/construction-waste.jpg",
    postedDate: "2024-01-09",
    status: "available",
  },
  {
    id: "8",
    title: "Sawdust & Wood Chips",
    description:
      "Clean sawdust from furniture manufacturing, perfect for biomass fuel, animal bedding, or composite materials.",
    category: "Organic",
    quantity: "400 kg",
    location: "Jaipur, Rajasthan",
    price: 10,
    company: "WoodCraft Furniture",
    condition: "Dry",
    carbonSaved: 0.32,
    image: "/images/sawdust.jpg",
    postedDate: "2024-01-08",
    status: "sold",
  },
  {
    id: "9",
    title: "Aluminum Cans & Scrap Metal",
    description:
      "Sorted aluminum cans and light metal scraps from beverage industry. High-grade aluminum perfect for recycling.",
    category: "Metal",
    quantity: "600 kg",
    location: "Kolkata, West Bengal",
    price: 65,
    company: "RefreshCo Beverages",
    condition: "Excellent",
    carbonSaved: 1.92,
    image: "/images/aluminum-cans.jpg",
    postedDate: "2024-01-07",
    status: "available",
  },
  {
    id: "10",
    title: "PET Bottles & Plastic Containers",
    description:
      "Clean PET bottles and containers from food processing unit. Excellent for recycling into new bottles or textile fibers.",
    category: "Plastic",
    quantity: "350 kg",
    location: "Ahmedabad, Gujarat",
    price: 30,
    company: "FoodPro Industries",
    condition: "Good",
    carbonSaved: 0.735,
    image: "/images/pet-bottles.jpg",
    postedDate: "2024-01-06",
    status: "available",
  },
  {
    id: "11",
    title: "Electronic Circuit Boards & Components",
    description:
      "Defective PCBs and electronic components from manufacturing. Contains precious metals suitable for recovery and recycling.",
    category: "Electronic",
    quantity: "75 kg",
    location: "Noida, Uttar Pradesh",
    price: 120,
    company: "TechCircuit Manufacturing",
    condition: "Fair",
    carbonSaved: 0.21,
    image: "/images/electronic-waste.png",
    postedDate: "2024-01-16",
    status: "available",
  },
  {
    id: "12",
    title: "Mixed Glass Bottles & Containers",
    description:
      "Assorted glass bottles and containers from restaurant operations. Sorted by color, clean and ready for recycling.",
    category: "Glass",
    quantity: "450 kg",
    location: "Kochi, Kerala",
    price: 8,
    company: "Coastal Restaurants",
    condition: "Good",
    carbonSaved: 0.54,
    image: "/images/glass-bottles.png",
    postedDate: "2024-01-17",
    status: "available",
  },
  {
    id: "14",
    title: "Reclaimed Wood & Timber Offcuts",
    description:
      "High-quality reclaimed wood from construction projects. Perfect for furniture making, flooring, and craft projects.",
    category: "Wood",
    quantity: "1200 kg",
    location: "Mysore, Karnataka",
    price: 35,
    company: "Heritage Builders",
    condition: "Excellent",
    carbonSaved: 1.8,
    image: "/images/wood-waste.png",
    postedDate: "2024-01-19",
    status: "available",
  },
  {
    id: "15",
    title: "Used Lithium Batteries & Power Cells",
    description:
      "End-of-life lithium batteries from electronics. Requires specialized recycling for lithium and cobalt recovery.",
    category: "Battery",
    quantity: "25 kg",
    location: "Bangalore, Karnataka",
    price: 200,
    company: "PowerTech Solutions",
    condition: "Used",
    carbonSaved: 0.075,
    image: "/images/battery-waste.png",
    postedDate: "2024-01-20",
    status: "available",
  },
  {
    id: "16",
    title: "Ceramic Tiles & Pottery Waste",
    description:
      "Broken ceramic tiles and pottery waste from manufacturing. Can be crushed for aggregate or mosaic projects.",
    category: "Ceramic",
    quantity: "600 kg",
    location: "Morbi, Gujarat",
    price: 5,
    company: "CeramicCraft Ltd",
    condition: "Broken",
    carbonSaved: 0.72,
    image: "/images/ceramic-waste.png",
    postedDate: "2024-01-21",
    status: "available",
  },
  {
    id: "17",
    title: "Designer Fabric Scraps & Offcuts",
    description:
      "Premium fabric scraps from high-end fashion manufacturing. Various textures and colors, perfect for craft projects.",
    category: "Textile",
    quantity: "150 kg",
    location: "New Delhi, NCR",
    price: 45,
    company: "Luxury Fashion House",
    condition: "Excellent",
    carbonSaved: 0.225,
    image: "/images/fabric-scraps.png",
    postedDate: "2024-01-22",
    status: "available",
  },
]

export default function WasteMarketplace() {
  const [listings, setListings] = useState<WasteListing[]>(mockListings)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("browse")
  const [sortBy, setSortBy] = useState("newest")
  const [filterCategory, setFilterCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "message",
      title: "New message from PackCorp Industries",
      description: "Inquiry about HDPE Plastic Packaging Scraps",
      time: "2 minutes ago",
      read: false,
      icon: MessageSquare,
    },
    {
      id: "2",
      type: "listing",
      title: "Your listing has been viewed",
      description: "Steel Shavings & Metal Offcuts - 5 new views",
      time: "1 hour ago",
      read: false,
      icon: Package,
    },
    {
      id: "3",
      type: "environmental",
      title: "CO₂ Impact Milestone",
      description: "You've helped save 10 tonnes of CO₂ this month!",
      time: "3 hours ago",
      read: true,
      icon: Leaf,
    },
  ])

  const [conversations, setConversations] = useState([
    {
      id: "1",
      participantName: "Rajesh Kumar",
      participantCompany: "PackCorp Industries",
      lastMessage: "Is the material still available?",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      messages: [
        {
          id: "1",
          senderId: "other",
          senderName: "Rajesh Kumar",
          message: "Hi, I'm interested in your HDPE plastic scraps. Can you tell me more about the quality?",
          timestamp: "10:30 AM",
          read: true,
        },
        {
          id: "2",
          senderId: "me",
          senderName: "You",
          message: "Hello! The HDPE scraps are high quality, clean and sorted. Perfect for recycling applications.",
          timestamp: "10:35 AM",
          read: true,
        },
        {
          id: "3",
          senderId: "other",
          senderName: "Rajesh Kumar",
          message: "Is the material still available?",
          timestamp: "10:45 AM",
          read: false,
        },
      ],
    },
  ])

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleSendChatMessage = (conversationId: string, message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, newMessage], lastMessage: message, lastMessageTime: "now" }
          : conv,
      ),
    )
  }

  const handleAddListing = (newListing: Omit<WasteListing, "id" | "postedDate" | "status">) => {
    const listing: WasteListing = {
      ...newListing,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split("T")[0],
      status: "available",
    }
    setListings([listing, ...listings])
    setActiveTab("browse")
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  let filteredListings = listings.filter(
    (listing) =>
      (listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "all" || listing.category === filterCategory),
  )

  // Sort listings
  filteredListings = filteredListings.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "carbon":
        return b.carbonSaved - a.carbonSaved
      case "newest":
      default:
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    }
  })

  const stats = {
    totalListings: listings.length,
    activeUsers: 1247,
    carbonSaved: listings.reduce((sum, listing) => sum + listing.carbonSaved, 0),
    transactions: 89,
  }

  return (
    <div className="min-h-screen bg-nature-light dark:bg-nature-dark transition-colors duration-300">
      {/* Enhanced Header */}
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
              <NotificationsPanel
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                onDeleteNotification={handleDeleteNotification}
              />
              <ChatPanel conversations={conversations} onSendMessage={handleSendChatMessage} />
              <ThemeToggle />
              <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                Sign In
              </Button>
              <Button size="sm" className="bg-earth-gradient hover:opacity-90 hover-lift">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Stats Bar */}
      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-green-200 dark:border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center group hover-lift">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                {stats.totalListings}
              </div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </div>
            <div className="text-center group hover-lift">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                {stats.activeUsers}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center group hover-lift">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                {stats.carbonSaved.toFixed(1)}T
              </div>
              <div className="text-sm text-muted-foreground">CO₂ Saved</div>
            </div>
            <div className="text-center group hover-lift">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                {stats.transactions}
              </div>
              <div className="text-sm text-muted-foreground">Transactions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="browse" className="flex items-center gap-2 hover-lift">
              <Search className="h-4 w-4" />
              Browse Waste
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2 hover-lift">
              <Plus className="h-4 w-4" />
              List Waste
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 hover-lift">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="eco-guide" className="flex items-center gap-2 hover-lift">
              <BookOpen className="h-4 w-4" />
              Eco Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Enhanced Search and Filters */}
            <Card className="hover-lift bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Find Waste Materials
                </CardTitle>
                <CardDescription>Discover valuable waste materials from businesses in your area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by material type, location, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/50 dark:bg-gray-900/50"
                    />
                  </div>
                  <Button className="bg-earth-gradient hover:opacity-90 hover-lift">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[180px] bg-white/50 dark:bg-gray-900/50">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Plastic">Plastic</SelectItem>
                        <SelectItem value="Organic">Organic</SelectItem>
                        <SelectItem value="Metal">Metal</SelectItem>
                        <SelectItem value="Chemical">Chemical</SelectItem>
                        <SelectItem value="Textile">Textile</SelectItem>
                        <SelectItem value="Paper">Paper</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Electronic">Electronic</SelectItem>
                        <SelectItem value="Glass">Glass</SelectItem>
                        <SelectItem value="Rubber">Rubber</SelectItem>
                        <SelectItem value="Wood">Wood</SelectItem>
                        <SelectItem value="Battery">Battery</SelectItem>
                        <SelectItem value="Ceramic">Ceramic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] bg-white/50 dark:bg-gray-900/50">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="carbon">Highest CO₂ Impact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <WasteListings listings={filteredListings} favorites={favorites} onToggleFavorite={toggleFavorite} />
          </TabsContent>

          <TabsContent value="list">
            <ListWasteForm onSubmit={handleAddListing} />
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard listings={listings} />
          </TabsContent>

          <TabsContent value="eco-guide">
            <EcoGuide />
          </TabsContent>
        </Tabs>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-earth-gradient p-2 rounded-lg">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold">WasteWealth</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming waste into wealth through smart marketplace solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Browse Waste</li>
                <li className="hover:text-white cursor-pointer transition-colors">List Materials</li>
                <li className="hover:text-white cursor-pointer transition-colors">AI Matching</li>
                <li className="hover:text-white cursor-pointer transition-colors">Carbon Tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Guidelines</li>
                <li className="hover:text-white cursor-pointer transition-colors">Safety</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Impact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Sustainability Report</li>
                <li className="hover:text-white cursor-pointer transition-colors">Carbon Calculator</li>
                <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
                <li className="hover:text-white cursor-pointer transition-colors">Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 WasteWealth Marketplace. All rights reserved. 🌱</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
