"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Leaf, Calculator, TrendingUp } from "lucide-react"

interface CO2EstimatorProps {
  onEstimateChange?: (estimate: number) => void
  initialCategory?: string
  initialQuantity?: string
}

const co2Factors = {
  Plastic: {
    factor: 2.1,
    description: "Recycling plastic saves energy and reduces virgin plastic production",
    unit: "tonnes CO₂/tonne",
  },
  Organic: {
    factor: 0.8,
    description: "Composting/biogas prevents methane emissions from landfills",
    unit: "tonnes CO₂/tonne",
  },
  Metal: {
    factor: 3.2,
    description: "Metal recycling uses 95% less energy than virgin production",
    unit: "tonnes CO₂/tonne",
  },
  Chemical: {
    factor: 2.8,
    description: "Reusing chemicals prevents energy-intensive manufacturing",
    unit: "tonnes CO₂/tonne",
  },
  Textile: {
    factor: 1.5,
    description: "Textile reuse reduces water usage and chemical processing",
    unit: "tonnes CO₂/tonne",
  },
  Paper: {
    factor: 1.2,
    description: "Paper recycling saves trees and reduces processing energy",
    unit: "tonnes CO₂/tonne",
  },
  Construction: {
    factor: 1.0,
    description: "Reusing construction materials reduces cement and steel production",
    unit: "tonnes CO₂/tonne",
  },
}

export default function CO2Estimator({
  onEstimateChange,
  initialCategory = "",
  initialQuantity = "",
}: CO2EstimatorProps) {
  const [category, setCategory] = useState(initialCategory)
  const [quantity, setQuantity] = useState(initialQuantity)
  const [co2Saved, setCo2Saved] = useState(0)

  useEffect(() => {
    if (category && quantity) {
      const quantityNum = Number.parseFloat(quantity)
      if (!Number.isNaN(quantityNum) && quantityNum > 0) {
        const factor = co2Factors[category as keyof typeof co2Factors]?.factor || 0
        const estimate = quantityNum * factor
        setCo2Saved(estimate)
        onEstimateChange?.(estimate)
      } else {
        setCo2Saved(0)
        onEstimateChange?.(0)
      }
    } else {
      setCo2Saved(0)
      onEstimateChange?.(0)
    }
  }, [category, quantity, onEstimateChange])

  const selectedFactor = category ? co2Factors[category as keyof typeof co2Factors] : null

  const getImpactLevel = (co2: number) => {
    if (co2 >= 10) return { level: "High Impact", color: "bg-green-600", textColor: "text-green-600" }
    if (co2 >= 5) return { level: "Medium Impact", color: "bg-yellow-500", textColor: "text-yellow-600" }
    if (co2 >= 1) return { level: "Low Impact", color: "bg-blue-500", textColor: "text-blue-600" }
    return { level: "Minimal Impact", color: "bg-gray-400", textColor: "text-gray-600" }
  }

  const impact = getImpactLevel(co2Saved)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-green-600" />
          CO₂ Impact Estimator
        </CardTitle>
        <CardDescription>Calculate the environmental impact of your waste material</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Waste Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(co2Factors).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {key} ({value.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (tonnes)</Label>
            <Input
              id="quantity"
              type="number"
              step="0.1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        {selectedFactor && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{category}:</strong> {selectedFactor.description}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Carbon reduction factor: {selectedFactor.factor} {selectedFactor.unit}
            </p>
          </div>
        )}

        {co2Saved > 0 && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="font-semibold text-gray-900">Estimated CO₂ Reduction</span>
                </div>
                <Badge className={impact.color}>{impact.level}</Badge>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{co2Saved.toFixed(2)} tonnes CO₂</div>
              <p className="text-sm text-gray-600">
                Equivalent to removing a car from the road for <strong>{Math.round(co2Saved * 2500)} km</strong> or
                planting <strong>{Math.round(co2Saved * 45)} trees</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{Math.round(co2Saved * 2500)}</div>
                <div className="text-sm text-gray-600">km car travel saved</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{Math.round(co2Saved * 45)}</div>
                <div className="text-sm text-gray-600">trees equivalent</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">{Math.round(co2Saved * 1000)}</div>
                <div className="text-sm text-gray-600">kWh energy saved</div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Climate Impact</span>
              </div>
              <p className="text-sm text-yellow-700">
                This waste reuse contributes to India's commitment to reduce carbon intensity by 45% by 2030 and achieve
                net-zero emissions by 2070.
              </p>
            </div>
          </div>
        )}

        {!category && !quantity && (
          <div className="text-center py-8 text-gray-500">
            <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a category and enter quantity to see the environmental impact</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
