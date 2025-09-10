"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building2, MapPin, Phone, Mail, Star, MessageCircle, Send, User, Calendar } from "lucide-react"
import type { WasteListing } from "../types/waste"

interface SellerContactModalProps {
  listing: WasteListing
  isOpen: boolean
  onClose: () => void
  onSendMessage: (message: string) => void
}

export default function SellerContactModal({ listing, isOpen, onClose, onSendMessage }: SellerContactModalProps) {
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"details" | "contact">("details")

  // Mock seller data
  const sellerInfo = {
    name: "Rajesh Kumar",
    title: "Waste Management Coordinator",
    company: listing.company,
    location: listing.location,
    phone: "+91 98765 43210",
    email: "rajesh@" + listing.company.toLowerCase().replace(/\s+/g, "") + ".com",
    rating: 4.8,
    totalListings: 23,
    completedDeals: 156,
    joinedDate: "March 2023",
    responseTime: "Usually responds within 2 hours",
    verificationStatus: "Verified Business",
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-600" />
            Contact Seller
          </DialogTitle>
          <DialogDescription>Get in touch with the seller about this waste material</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Listing Summary */}
          <Card className="bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full sm:w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {listing.quantity} • ₹{listing.price}/kg
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{listing.category}</Badge>
                    <Badge variant="outline" className="text-green-600">
                      {listing.carbonSaved}T CO₂ saved
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Seller Details
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "contact"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("contact")}
            >
              Send Message
            </button>
          </div>

          {/* Seller Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{sellerInfo.name}</CardTitle>
                      <CardDescription>{sellerInfo.title}</CardDescription>
                    </div>
                    <div className="ml-auto">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        {sellerInfo.verificationStatus}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{sellerInfo.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{sellerInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{sellerInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{sellerInfo.email}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{sellerInfo.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <div className="font-semibold">{sellerInfo.totalListings}</div>
                      <p className="text-xs text-muted-foreground">Active Listings</p>
                    </div>
                    <div>
                      <div className="font-semibold">{sellerInfo.completedDeals}</div>
                      <p className="text-xs text-muted-foreground">Completed Deals</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">{sellerInfo.joinedDate}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">📞 {sellerInfo.responseTime}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Send Message
                  </CardTitle>
                  <CardDescription>Send a message to inquire about this waste material</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder={`Inquiry about ${listing.title}`}
                      defaultValue={`Inquiry about ${listing.title}`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Hi, I'm interested in your waste material. Could you provide more details about the quantity, pickup schedule, and any specific requirements?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleSendMessage} className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
