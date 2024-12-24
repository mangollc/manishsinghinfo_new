require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupAdmin() {
  try {
    const adminEmail = 'admin@example.com'
    const adminPassword = 'admin123!@#'

    console.log('Creating admin user...')

    // Create user with admin role
    const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        full_name: 'Admin User'
      }
    })

    if (createError) throw createError

    // Set admin role in user metadata
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { user_metadata: { role: 'admin' } }
    )

    if (updateError) throw updateError

    // Create initial activity log
    const { error: activityError } = await supabase
      .from('activity_log')
      .insert([{
        user_id: user.id,
        description: 'Admin user created',
        type: 'system',
        metadata: {
          email: adminEmail,
          timestamp: new Date().toISOString()
        }
      }])

    if (activityError) throw activityError

    console.log('\nAdmin user created successfully!')
    console.log('\nAdmin Credentials:')
    console.log(`Email: ${adminEmail}`)
    console.log(`Password: ${adminPassword}`)

  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

setupAdmin()