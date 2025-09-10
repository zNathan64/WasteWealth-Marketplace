"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Leaf, Building2, Heart } from "lucide-react"
import type { WasteListing } from "../types/waste"
import SellerContactModal from "./seller-contact-modal"
import { useState } from "react"

interface WasteListingsProps {
  listings: WasteListing[]
  favorites?: string[]
  onToggleFavorite?: (id: string) => void
}

const categoryColors = {
  Plastic: "bg-blue-100 text-blue-800",
  Organic: "bg-green-100 text-green-800",
  Metal: "bg-gray-100 text-gray-800",
  Chemical: "bg-red-100 text-red-800",
  Textile: "bg-purple-100 text-purple-800",
  Paper: "bg-yellow-100 text-yellow-800",
}

export default function WasteListings({ listings, favorites, onToggleFavorite }: WasteListingsProps) {
  const [selectedListing, setSelectedListing] = useState<WasteListing | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleContactSeller = (listing: WasteListing) => {
    setSelectedListing(listing)
    setIsContactModalOpen(true)
  }

  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message)
    // Here you would typically send the message to your backend
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Available Waste Materials</h2>
        <Badge variant="secondary">{listings.length} listings found</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card
            key={listing.id}
            className="hover:shadow-lg transition-all duration-300 hover-lift bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          >
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={listing.image || "/placeholder.png"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                <Badge
                  className={
                    categoryColors[listing.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"
                  }
                >
                  {listing.category}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Quantity:</span>
                  <div className="text-gray-600">{listing.quantity}</div>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <div className="text-green-600 font-semibold">₹{listing.price}/kg</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  {listing.company}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {listing.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Posted {listing.postedDate}
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Leaf className="h-4 w-4" />
                  {listing.carbonSaved}T CO₂ saved potential
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1" size="sm" onClick={() => handleContactSeller(listing)}>
                  Contact Seller
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleFavorite?.(listing.id)}
                  className={favorites?.includes(listing.id) ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${favorites?.includes(listing.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              {listing.status === "sold" && (
                <Badge variant="secondary" className="w-full justify-center">
                  Sold
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {listings.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-500 mb-4">
              <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No waste materials found</h3>
              <p>Try adjusting your search criteria or check back later for new listings.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedListing && (
        <SellerContactModal
          listing={selectedListing}
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  )
}
