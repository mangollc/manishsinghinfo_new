import { supabase } from "@/lib/supabase/client"
import { createActivity } from "./activity"

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    await createActivity({
      description: "User logged in",
      type: "auth",
      metadata: { email }
    })

    return data
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  }
}

export async function signOut() {
  try {
    await createActivity({
      description: "User logged out",
      type: "auth"
    })

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}