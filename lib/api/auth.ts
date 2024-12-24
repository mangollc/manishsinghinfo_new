import { supabase } from "@/lib/supabase/client"
import { createActivity } from "./activity"

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Log successful login
    await createActivity({
      description: "User logged in",
      type: "auth",
      metadata: {
        email,
        timestamp: new Date().toISOString()
      }
    })

    return data
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  }
}

export async function signOut() {
  try {
    // Log activity before signing out
    await createActivity({
      description: "User logged out",
      type: "auth",
      metadata: {
        timestamp: new Date().toISOString()
      }
    })

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}