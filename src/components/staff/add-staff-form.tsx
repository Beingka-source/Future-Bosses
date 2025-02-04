"use client"

import { createStaff } from "@/src/app/actions/staff"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useToast } from "@/src/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const positions = [
  {
    id: "waiter",
    title: "Waiter/ Waitress",
    description:
      "Takes customer orders, serves food and beverages, ensures customer satisfaction, handles payments, and maintains cleanliness in the dining area.",
    icon: "🍽️",
  },
  {
    id: "bartender",
    title: "Bartender",
    description:
      "Prepares and serves beverages, maintains inventory, ensures cleanliness and safety, and provides excellent customer service.",
    icon: "🍸",
  },
  {
    id: "supervisor",
    title: "Supervisor",
    description:
      "Oversees staff performance, ensures smooth operations, handles customer concerns, and maintains service standards.",
    icon: "👔",
  },
  {
    id: "head-chef",
    title: "Head Chef",
    description:
      "Oversees kitchen operations, creates menus, maintains food quality standards, manages kitchen staff, and ensures food safety.",
    icon: "👨‍🍳",
  },
]

const nationalities = [
  { id: "th", name: "Thai" },
  { id: "us", name: "American" },
  { id: "uk", name: "British" },
  { id: "cn", name: "Chinese" },
  { id: "jp", name: "Japanese" },
]

const languages = [
  { id: "th", name: "Thai" },
  { id: "en", name: "English" },
  { id: "cn", name: "Chinese" },
  { id: "jp", name: "Japanese" },
]

export function AddStaffForm() {
  const [selectedPosition, setSelectedPosition] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const selectedPositionDetails = positions.find((p) => p.id === selectedPosition)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      formData.set("position", selectedPosition)

      const result = await createStaff(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        router.push("/staff")
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Staff</h1>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="position">Choose Staff Position:</Label>
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger id="position" className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((position) => (
                <SelectItem key={position.id} value={position.id}>
                  <span className="flex items-center gap-2">
                    <span>{position.icon}</span>
                    <span>{position.title}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedPositionDetails && (
          <div className="rounded-lg border bg-gray-50/50 p-4">
            <div className="flex items-center gap-2 text-lg font-medium mb-2">
              <span>{selectedPositionDetails.icon}</span>
              <span>{selectedPositionDetails.title}</span>
            </div>
            <p className="text-sm text-gray-600">{selectedPositionDetails.description}</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Fill out staff information:</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name/Surname:</Label>
              <Input id="name" name="name" placeholder="Enter Name/Surname" required />
            </div>
            <div>
              <Label htmlFor="birthDate">Birth Date:</Label>
              <Input id="birthDate" name="birthDate" type="date" required />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality:</Label>
              <Select name="nationality">
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality.id} value={nationality.id}>
                      {nationality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language:</Label>
              <Select name="language">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.id}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="education">Education:</Label>
              <Input id="education" name="education" placeholder="Enter last education" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number:</Label>
              <Input id="phone" name="phone" type="tel" placeholder="Enter phone number" required />
            </div>
            <div>
              <Label htmlFor="email">Mail Address:</Label>
              <Input id="email" name="email" type="email" placeholder="Enter email address" required />
            </div>
            <div>
              <Label htmlFor="address">Address:</Label>
              <Input id="address" name="address" placeholder="Enter current address" required />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label>Staff Image:</Label>
            <div className="mt-2 flex items-center justify-center border-2 border-dashed rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-[#f77700] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#f77700] focus-within:ring-offset-2 hover:text-[#f77700]/80"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="image" type="file" className="sr-only" accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/staff")} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" className="bg-[#f77700] hover:bg-[#f77700]/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Information"
          )}
        </Button>
      </div>
    </form>
  )
}

