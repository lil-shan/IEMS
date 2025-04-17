/*
  # Create schedules table for timer functionality

  1. New Tables
    - `schedules`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `room_id` (text)
      - `load_type` (text)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `schedules` table
    - Add policies for authenticated users to manage their own schedules
*/

CREATE TABLE schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  room_id text NOT NULL,
  load_type text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own schedules"
  ON schedules
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);