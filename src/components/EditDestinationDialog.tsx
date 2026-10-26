"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { PencilIcon } from "lucide-react";



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
import { Destination } from "./destination-card";

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



const EditDestinationDialog = ({ destination }: { destination: Destination }) => {
     

    const [form, setForm] = React.useState(destination)
    const [category, setCategory] = React.useState<string | null>(null)
    const [submitted, setSubmitted] = React.useState(false)

    function update(field: keyof typeof destination, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
        setSubmitted(false)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const { _id, ...restDestination } = form
        const res = await fetch(`http://localhost:8000/destinations/${destination._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(restDestination),
        })
        const data = await res.json()
        console.log(data)
    }

    function handleCancel() {
        setForm(destination)
        setCategory(null)
        setSubmitted(false)
    }

    return (
        <Dialog>
            <DialogTrigger><Button
                type="button"
                variant="outline"
                className="border-zinc-200 bg-white"
            >
                <PencilIcon className="h-4 w-4" />
                Edit
            </Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader >
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
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
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;