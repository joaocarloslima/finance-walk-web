"use server"
import { redirect } from "next/navigation"
import { api } from "./api"

export async function getCategories() {
    const response = await api("/categories")
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

    const response = await api("/categories", options)

    if (!response.ok) {
        const json = await response.json()
        const errors = json.errors

        return {
            values: {
                name: formData.get("name"),
                icon: formData.get("icon")
            },
            errors: {
                name: errors.find((e: any) => e.field === "name")?.defaultMessage,
                icon: errors.find((e: any) => e.field === "icon")?.defaultMessage
            }
        }
    }

    redirect("/categories")
}

export async function deleteCategory(id: number) {
    const response = await api(`/categories/${id}`, {method: "DELETE"})

    if (response.status === 404) {
        throw new Error("categoria não encontrada. ela pode ter sido removida por outro usuário")
    }

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Erro ao apagar categoria");
    }
    
}


export async function getCategoryById(id: number) {
    const response = await api(`/categories/${id}`)

    if (!response.ok) {
        throw new Error('Categoria não encontrada')
    }

    return await response.json()
}

export async function updateCategory(prevState: any, formData: FormData) {
    
    const data = {
        name: formData.get('name'),
        icon: formData.get('icon'),
    }

    const options = {
        method: "PUT",
        body: JSON.stringify(data)
    }

    const response = await api(`/categories/${formData.get('id')}`, options)

    if (!response.ok) {
        const errors = await response.json()
        return {
            values: {
                name: formData.get("name")?.toString() ?? "",
                icon: formData.get("icon")?.toString() ?? ""
            },
            errors: {
                name: errors.find((e: any) => e.field === "name")?.message,
                icon: errors.find((e: any) => e.field === "icon")?.message
            }
        }
    }

    redirect('/categories')
    
}