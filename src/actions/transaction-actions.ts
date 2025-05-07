"use server"

import { format } from "date-fns"
import { redirect } from "next/navigation"
import { api } from "./api"
import { cookies } from "next/headers"

const API_URL = "http://localhost:8080/transactions"

interface TransactionFilters{
    page: number,
    size: number,
    sort: string,
    description?: string,
    startDate?: string,
    endDate?: string,
}

export async function getTransactions(filters: TransactionFilters) {
    //await new Promise(resolve => setTimeout(resolve, 2000))
    const params = new URLSearchParams(filters as any)
    const headers = new Headers()
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value
    headers.set("Content-Type", "application/json")
    headers.set("Authorization", "Bearer " + token)
    const options = {
        method: "GET",
        headers: headers,
    }
    const url = new URL(API_URL)
    url.search = params.toString()
    const response = await fetch(url.toString(),options)
    const data = await response.json()
    return data
}

export async function createTransaction(initialState: any, formData: FormData) {
    const data = {
        description: formData.get("description"),
        amount: formData.get("amount"),
        date: format(formData.get("date") as string, 'yyyy-MM-dd'),
        type: formData.get("type"),
        category: {
            id: formData.get("categoryId")
        }
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data)
    }

    const response = await api("/transactions", options)

    if (!response.ok){
        const errors = await response.json()
        return {
            values: {
                description: formData.get("description"),
                amount: formData.get("amount"),
                date: formData.get("date"),
                type: formData.get("type"),
                category: {
                    id: formData.get("category.id"),
                    name: formData.get("category.name"),
                    icon: formData.get("category.icon")
                }
            },
            errors: {
                description: errors.find((e: any) => e.field === "description")?.message,
                amount: errors.find((e: any) => e.field === "amount")?.message,
                date: errors.find((e: any) => e.field === "date")?.message,
                type: errors.find((e: any) => e.field === "type")?.message,
                categoryId: errors.find((e: any) => e.field === "category.id")?.message,
                categoryName: errors.find((e: any) => e.field === "category.name")?.message,
                categoryIcon: errors.find((e: any) => e.field === "category.icon")?.message
            }
        }
    }

    redirect("/transactions")
}

export async function deleteTransaction(id: number) {
    const response = await api(`/transactions/${id}`, {method: "DELETE"})

    if (response.status === 404) {
        throw new Error("movimentação não encontrada")
    }

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Erro ao apagar categoria");
    }

    
}




