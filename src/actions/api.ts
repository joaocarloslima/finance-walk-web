"use server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { logout } from "./user-actions"

const API_URL = "http://localhost:8080"

export async function api(path: string, options: RequestInit = {}) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value
  
    const headers = new Headers(options.headers || {})
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    headers.set("Content-Type", "application/json")
  
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    })

    if (response.status === 401 || response.status === 403) {
        logout()
        redirect("/")
    }
  
    return response
  }
  