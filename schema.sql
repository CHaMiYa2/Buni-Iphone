-- schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create tables
CREATE TABLE IF NOT EXISTS public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    model text NOT NULL,
    storage text[] NOT NULL,
    colors text[] NOT NULL,
    condition text NOT NULL,
    price integer NOT NULL,
    old_price integer,
    stock integer DEFAULT 0,
    images text[],
    specs jsonb,
    badge text,
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users,
    items jsonb NOT NULL,
    total integer NOT NULL,
    status text DEFAULT 'pending',
    stripe_id text,
    delivery_address text,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.trade_ins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    phone text NOT NULL,
    model text NOT NULL,
    storage text NOT NULL,
    condition text NOT NULL,
    estimated_value integer,
    pickup_address text,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.repair_bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    phone text NOT NULL,
    iphone_model text NOT NULL,
    service_type text NOT NULL,
    service_price integer,
    preferred_date date,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    subject text,
    message text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Products: Public can read, only authenticated can insert/update (if admin was setup, for now we just need public read)
CREATE POLICY "Public profiles are viewable by everyone."
ON public.products FOR SELECT
USING ( true );

-- Orders: Authenticated users can insert, read their own
CREATE POLICY "Users can insert their own orders."
ON public.orders FOR INSERT
WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can view their own orders."
ON public.orders FOR SELECT
USING ( auth.uid() = user_id );

-- Trade-ins: Authenticated users can insert and view their own (assuming user_id is added or public can insert if guest tradein is allowed)
-- Since trade-in doesn't have user_id in the schema, we'll allow public inserts, and no public reads.
CREATE POLICY "Anyone can insert trade-ins."
ON public.trade_ins FOR INSERT
WITH CHECK ( true );

-- Repair Bookings: Same as trade-ins
CREATE POLICY "Anyone can insert repair bookings."
ON public.repair_bookings FOR INSERT
WITH CHECK ( true );

-- Contact Messages: Anyone can insert
CREATE POLICY "Anyone can insert contact messages."
ON public.contact_messages FOR INSERT
WITH CHECK ( true );
