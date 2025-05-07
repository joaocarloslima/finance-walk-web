import { redirect } from "next/navigation"

const API_URL = "http://localhost:8080/users"

export async function createUser(initialValue: any, formData: FormData) {

    const data = {
        email: formData.get("email"),
        password: formData.get("password")
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
                email: formData.get("email"),
                password: formData.get("password")
            },
            errors: {
                email: errors.find((e: any) => e.field === "email")?.defaultMessage,
                password: errors.find((e: any) => e.field === "password")?.defaultMessage
            }
        }
    }

    redirect("/")
}