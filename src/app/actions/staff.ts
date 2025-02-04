"use server"

import { revalidatePath } from "next/cache"

export type StaffMember = {
  id: string
  name: string
  position: string
  email: string
  phone: string
  education: string
  birthDate: string
  nationality: string
  language: string
  address: string
  image?: string
  status: "active" | "inactive"
  createdAt: Date
}

export async function createStaff(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {

    await new Promise((resolve) => setTimeout(resolve, 1000))


    const name = formData.get("name") as string
    const position = formData.get("position") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const education = formData.get("education") as string
    const birthDate = formData.get("birthDate") as string
    const nationality = formData.get("nationality") as string
    const language = formData.get("language") as string
    const address = formData.get("address") as string


    if (!name || !position || !email || !phone) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }


    const newStaff: StaffMember = {
      id: `ST${Math.floor(Math.random() * 10000)}`,
      name,
      position,
      email,
      phone,
      education,
      birthDate,
      nationality,
      language,
      address,
      status: "active",
      createdAt: new Date(),
    }

    // Revalidate the staff list page
    revalidatePath("/staff")

    return {
      success: true,
      message: "Staff member added successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to add staff member",
    }
  }
}

