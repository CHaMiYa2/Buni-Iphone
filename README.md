# Buni Iphone - Premium iPhone E-Commerce

Buni Iphone is a complete, production-ready e-commerce platform for selling new, refurbished, and pre-owned iPhones in Sri Lanka. It features a premium dark aesthetic, seamless checkout, trade-in calculator, and repair booking system.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Dark Apple-like Aesthetic)
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Payments**: Stripe Checkout & Webhooks
- **Emails**: Resend
- **Forms**: React Hook Form + Zod validation

---

## 🚀 Step-by-Step Setup Instructions

### 1. Database Setup (Supabase)
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Navigate to the **SQL Editor** in the Supabase dashboard.
3. Open the `schema.sql` file from this project's root folder, copy its contents, and run it in the SQL Editor. This will create your tables and Row Level Security (RLS) policies.
4. Open the `seed.sql` file, copy its contents, and run it to populate your store with initial sample iPhones.

### 2. Environment Variables Setup
1. Create a file named `.env.local` in the root directory of this project.
2. Add the following variables to the file:

```env
# 1. Supabase (Get these from Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 2. Stripe (Get these from Stripe Dashboard -> Developers -> API Keys)
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# 3. Resend (Get this from Resend Dashboard)
RESEND_API_KEY=re_your_resend_api_key

# 4. Cloudinary (Used for image domains in next/image)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo

# 5. Site URL
NEXT_PUBLIC_URL=http://localhost:3000
```

### 3. Stripe Webhook Configuration
To allow Stripe to tell your application when a payment is successful:
1. In the Stripe Dashboard, go to **Developers > Webhooks**.
2. Click **Add an endpoint**.
3. Set the Endpoint URL to: `https://your-domain.com/api/webhooks/stripe` (for local development, use Stripe CLI to forward events to `http://localhost:3000/api/webhooks/stripe`).
4. Listen for the `checkout.session.completed` event.
5. Copy the generated **Signing Secret** and paste it into your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### 4. Running the Development Server
Install dependencies (if you haven't already):
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view your website!

---

## 📦 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

When deploying, make sure to add all the environment variables from your `.env.local` file into the Vercel project settings, and update your `NEXT_PUBLIC_URL` to your production domain name (e.g., `https://buniiphone.lk`). You will also need to update your Stripe Webhook endpoint URL to match the production domain.
