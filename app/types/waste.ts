export interface WasteListing {
  id: string
  title: string
  description: string
  category: string
  quantity: string
  location: string
  price: number
  company: string
  condition: string
  carbonSaved: number
  image: string
  postedDate: string
  status: "available" | "sold" | "pending"
}
