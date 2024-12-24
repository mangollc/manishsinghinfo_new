-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the activity_log table with a foreign key to auth.users
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('auth', 'content', 'system')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on user_id to improve query performance
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);

-- Enable Row Level Security on activity_log
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can read all activities
CREATE POLICY "Admins can read all activities"
  ON public.activity_log
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Policy: Users can insert activities for themselves
CREATE POLICY "Users can create their own activities"
  ON public.activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
  );
