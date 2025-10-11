# Supabase Migration Guide

This guide will help you complete the Firebase to Supabase migration for your CareerMatch application.

## ✅ What's Been Done

1. **Removed Firebase** dependency from package.json
2. **Installed Supabase** client library (@supabase/supabase-js)
3. **Created authentication system** with Supabase Auth
4. **Implemented 2-step signup**:
   - Step 1: username, email, password, confirm password
   - Email verification required
   - Step 2: role selection (student/organization) + profile data
5. **Special admin signup** route: `/signup/admin-secret-access`
6. **Created database schema** with all necessary tables
7. **Profile picture upload** with 1:1 cropper component

## 🗄️ Database Setup Steps

### Step 1: Run the Schema in Supabase Dashboard

1. Go to https://supabase.com/dashboard/project/acuadoqbazldqsemougt
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `/app/supabase-schema.sql`
5. Click **Run** to execute the schema

This will create all necessary tables, indexes, RLS policies, and the storage bucket for avatars.

### Step 2: Verify Tables Were Created

In the Supabase dashboard:
1. Go to **Table Editor**
2. You should see these tables:
   - users
   - student_profiles
   - host_profiles
   - internships
   - courses
   - feedback
   - applications
   - conversations
   - skill_assessments
   - career_quizzes

### Step 3: Verify Storage Bucket

1. Go to **Storage** in the Supabase dashboard
2. You should see an **avatars** bucket
3. This is where profile pictures will be stored

## 🌱 Seeding Demo Data

Since you want to seed the demo data, I'll create a seed script for you. You can run this after the schema is set up.

### Manual Seeding (Recommended for now)

You can manually insert demo data through the Supabase dashboard:

1. Go to **Table Editor**
2. Select a table
3. Click **Insert** → **Insert row**
4. Add the demo data from `/app/src/lib/demo-data.ts`

## 🔐 Environment Variables

The environment variables are already set up in `/app/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://acuadoqbazldqsemougt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 🚀 Testing the Authentication Flow

### 1. Create a Student Account

1. Go to http://localhost:9002/signup
2. Fill in:
   - Username: `teststu dent`
   - Email: `student@test.com`
   - Password: `12345678`
   - Confirm Password: `12345678`
3. Click "Continue to Step 2"
4. Check your email for verification link (or check Supabase Auth dashboard)
5. After verification, go to http://localhost:9002/signup/step-2
6. Select role: **Student**
7. Fill in profile details
8. Complete profile

### 2. Create a Host Account

Follow the same steps but select **Organization** as the role in Step 2.

### 3. Create an Admin Account

1. Go to http://localhost:9002/signup/admin-secret-access
2. Fill in the admin details
3. Complete signup

## 📝 Next Steps - What Needs to Be Done

### 1. Update All Pages to Use Supabase

Currently, all pages still import data from `/app/src/lib/demo-data.ts`. You need to:

- Replace all imports of demo data with Supabase queries
- Update all CRUD operations to use Supabase client
- Implement proper error handling

### 2. Create Data Service Layer

I recommend creating service files for each entity:

```typescript
// /app/src/lib/services/internships.ts
export async function getInternships() {
  const { data, error } = await supabase
    .from('internships')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createInternship(internship: any) {
  // Implementation
}
```

### 3. Protect Routes with Authentication

Add middleware or guards to protect authenticated routes:

```typescript
// Check if user is authenticated
const { user } = useAuth();

useEffect(() => {
  if (!user) {
    router.push('/login');
  }
}, [user]);
```

### 4. Seed Demo Data Script

Create a script to automatically seed the demo data into Supabase.

### 5. Upload Demo Avatar Images

Upload placeholder images to Supabase Storage for demo users instead of using pravatar.cc URLs.

## 🎨 Profile Picture Upload

The `AvatarUpload` component has been created and can be used in any profile page:

```tsx
import { AvatarUpload } from '@/components/avatar-upload';

<AvatarUpload
  currentAvatarUrl={user?.avatar_url}
  userId={user?.id}
  onUploadComplete={(url) => {
    // Handle upload complete
  }}
  userName={user?.name}
/>
```

## 🔒 Security Notes

1. **Row Level Security (RLS)** is enabled on all tables
2. Users can only access and modify their own data
3. Hosts can only manage their own internships/courses
4. Admins need special policies (to be implemented)

## 📚 Key Files Reference

- **Supabase Client**: `/app/src/lib/supabase/client.ts`
- **Auth Context**: `/app/src/lib/supabase/auth-context.tsx`
- **Database Types**: `/app/src/lib/supabase/database.types.ts`
- **Schema**: `/app/supabase-schema.sql`
- **Avatar Upload**: `/app/src/components/avatar-upload.tsx`
- **Login Page**: `/app/src/app/(auth)/login/page.tsx`
- **Signup Step 1**: `/app/src/app/(auth)/signup/page.tsx`
- **Signup Step 2**: `/app/src/app/(auth)/signup/step-2/page.tsx`
- **Admin Signup**: `/app/src/app/(auth)/signup/admin-secret-access/page.tsx`

## 🐛 Troubleshooting

### Email Verification Not Working?

In development, check the Supabase Auth dashboard to manually verify users or disable email verification:
1. Go to **Authentication** → **Settings**
2. Uncheck "Enable email confirmations"

### Can't Upload Images?

Check:
1. Storage bucket "avatars" exists
2. Storage policies are set up correctly
3. User is authenticated

### Database Connection Issues?

Verify environment variables in `.env.local` are correct.

## 🎉 Summary

You now have a fully functional authentication system with Supabase! The next major task is migrating all the data access throughout the app from `demo-data.ts` to Supabase queries.
