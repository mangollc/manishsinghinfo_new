# Admin Dashboard

## Getting Started

1. Set up the database schema:
   ```bash
   psql -d your_database -f lib/supabase/schema.sql
   ```

2. Create an admin user:
   ```bash
   npm run setup-admin
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Log in with the admin credentials:
   - Email: admin@example.com
   - Password: admin123!@#

## Features

- Protected admin routes with authentication
- Activity logging for admin actions
- Dashboard with statistics and quick actions
- User session management
- Rate limiting for login attempts

## Security

- Row Level Security (RLS) policies
- Password hashing and secure session management
- Protected API routes
- CSRF protection
- Rate limiting for login attempts

## Development

- Uses Next.js App Router
- TypeScript for type safety
- Supabase for authentication and database
- Tailwind CSS for styling
- shadcn/ui components