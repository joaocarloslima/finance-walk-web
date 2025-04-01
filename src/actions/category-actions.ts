import { redirect } from "next/navigation"

const API_URL = "http://localhost:8080/categories"

export async function getCategories() {
    const response = await fetch(API_URL)
    return await response.json()
}

export async function createCategory(initialValue: any, formData: FormData) {

    const data = {
        name: formData.get("name"),
        icon: formData.get("icon")
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(API_URL, options)

    if (!response.ok) {
        const json = await response.json()
        const errors = json.errors

        return {
            values: {
                name: formData.get("name"),
                icon: formData.get("icon")
            },
            errors: {
                name: errors.find(e => e.field === "name")?.defaultMessage,
                icon: errors.find(e => e.field === "icon")?.defaultMessage
            }
        }
    }

    redirect("/categories")
}