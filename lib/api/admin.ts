import { supabase } from "@/lib/supabase/client"

// Create admin user
export async function createAdminUser(email: string, password: string) {
  try {
    // Create user in auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        full_name: 'Admin User'
      }
    })

    if (authError) throw authError

    // Set admin role in RLS policies
    const { error: roleError } = await supabase
      .rpc('set_claim', {
        uid: authData.user.id,
        claim: 'role',
        value: 'admin'
      })

    if (roleError) throw roleError

    return authData
  } catch (error) {
    console.error('Error creating admin user:', error)
    throw error
  }
}

// Get admin credentials (for development only)
export async function getAdminCredentials() {
  return {
    email: 'admin@example.com',
    password: 'admin123!@#'
  }
}