"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Upload } from "lucide-react"
import type { WasteListing } from "../types/waste"
import CO2Estimator from "./co2-estimator"

interface ListWasteFormProps {
  onSubmit: (listing: Omit<WasteListing, "id" | "postedDate" | "status">) => void
}

export default function ListWasteForm({ onSubmit }: ListWasteFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    location: "",
    price: "",
    company: "",
    condition: "",
    carbonSaved: "",
  })

  const [co2Estimate, setCo2Estimate] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const listing = {
      ...formData,
      price: Number.parseFloat(formData.price) || 0,
      carbonSaved: co2Estimate,
      image: "/placeholder.svg?height=200&width=300",
    }

    onSubmit(listing)

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      quantity: "",
      location: "",
      price: "",
      company: "",
      condition: "",
      carbonSaved: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          List Your Waste Material
        </CardTitle>
        <CardDescription>Turn your waste into wealth by listing it on our marketplace</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Material Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Plastic Packaging Scraps"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plastic">Plastic</SelectItem>
                  <SelectItem value="Organic">Organic</SelectItem>
                  <SelectItem value="Metal">Metal</SelectItem>
                  <SelectItem value="Chemical">Chemical</SelectItem>
                  <SelectItem value="Textile">Textile</SelectItem>
                  <SelectItem value="Paper">Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your waste material, its condition, and potential uses..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                placeholder="e.g., 500 kg"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per kg (₹) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="25"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition *</Label>
              <Select value={formData.condition} onValueChange={(value) => handleChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Your Company Name"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>CO₂ Impact Assessment</Label>
            <CO2Estimator
              onEstimateChange={setCo2Estimate}
              initialCategory={formData.category}
              initialQuantity={formData.quantity.split(" ")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Drag and drop images here, or click to browse</p>
              <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                Choose Files
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              List Material
            </Button>
            <Button type="button" variant="outline">
              Save Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
