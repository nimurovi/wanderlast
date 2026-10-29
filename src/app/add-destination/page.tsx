"use client"

import * as React from "react"
import { SaveIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/getTokenFromClient"

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City Break",
  "Wildlife",
  "Luxury",
]

const emptyForm = {
  destinationName: "",
  country: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
}

const fieldClassName =
  "rounded-md border-zinc-200 bg-zinc-50 placeholder:text-zinc-400"

export default function AddDestinationPage() {
  
  const [form, setForm] = React.useState(emptyForm)
  const [category, setCategory] = React.useState<string | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSubmitted(false)
  }

 async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data= await getTokenFromClient()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data}`
        },
        body: JSON.stringify(form),
    })
     const result = await res.json()
     console.log(result)
  }

  function handleCancel() {
    setForm(emptyForm)
    setCategory(null)
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16 sm:px-12">
      <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-900">
        Add New Travel Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-14 w-full max-w-[480px] rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination-name">Destination Name</Label>
            <Input
              id="destination-name"
              placeholder="Bali Paradise"
              value={form.destinationName}
              onChange={(event) => update("destinationName", event.target.value)}
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Indonesia"
                value={form.country}
                onChange={(event) => update("country", event.target.value)}
                className={fieldClassName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className="w-full border-zinc-200 bg-zinc-50"
                >
                  <SelectValue placeholder="Beach" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                className={fieldClassName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(event) => update("duration", event.target.value)}
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departure-date">Departure Date</Label>
            <Input
              id="departure-date"
              type="date"
              value={form.departureDate}
              onChange={(event) => update("departureDate", event.target.value)}
              className={fieldClassName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
              className={fieldClassName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the travel experience.."
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              className="min-h-24 rounded-md border-zinc-200 bg-zinc-50 placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {submitted && (
            <div
              role="status"
              className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
            >
              Travel package added successfully.
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-red-200 bg-white text-red-500 hover:border-red-300 hover:bg-red-50"
            >
              <Trash2Icon className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" className="bg-brand hover:bg-brand/90">
              <SaveIcon className="h-4 w-4" />
              Add Travel Package
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
