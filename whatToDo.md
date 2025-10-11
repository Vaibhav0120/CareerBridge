Perfect! Let me give you a complete step-by-step guide from scratch. Follow these instructions exactly:

---

## 🚀 **Complete Setup Guide - Step by Step**

### **PHASE 1: Install Dependencies** (2-3 minutes)

```bash
# Navigate to your project
cd /app

# Install all dependencies
npm install

# Wait for installation to complete...
```

**Expected Output:** You should see "added X packages" and no errors.

---

### **PHASE 2: Setup Supabase Database** (5 minutes)

#### **Step 1: Open Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/acuadoqbazldqsemougt
2. Log in to your Supabase account

#### **Step 2: Create Database Tables**
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"** button (top right)
3. Open the file `/app/supabase-schema.sql` on your computer
4. **Copy ALL the contents** of that file
5. **Paste** into the Supabase SQL Editor
6. Click **"Run"** button (bottom right)

**Expected Output:** You should see ✅ "Success. No rows returned"

#### **Step 3: Verify Tables Were Created**
1. Click **"Table Editor"** in the left sidebar
2. You should now see these tables:
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

#### **Step 4: Verify Storage Bucket**
1. Click **"Storage"** in the left sidebar
2. You should see an **"avatars"** bucket

✅ **If you see all tables and the storage bucket, you're good!**

---

### **PHASE 3: Seed Demo Data** (2 minutes)

```bash
# Make sure you're in /app directory
cd /app

# Run the seed script
npm run seed
```

**Expected Output:**
```
🚀 Starting database seeding...
📍 Supabase URL: https://acuadoqbazldqsemougt.supabase.co

📝 Seeding users...
✅ Created student: student@test.com
✅ Created host: host@test.com
✅ Created admin: admin@test.com

📝 Seeding internships...
✅ Created internship: Software Engineer Intern
✅ Created internship: Product Manager Intern
... (more internships)

📝 Seeding courses...
✅ Created course: Advanced React Patterns
✅ Created course: Machine Learning A-Z
... (more courses)

✅ Database seeding completed!

📋 Demo Credentials:
   Student: student@test.com / 12345678
   Host: host@test.com / 12345678
   Admin: admin@test.com / 12345678

🌐 Visit http://localhost:9002/login to test
```

---

### **PHASE 4: Start Development Server** (1 minute)

```bash
# Start the Next.js dev server
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 15.3.3
  - Local:        http://localhost:9002
  - Turbopack (alpha) enabled

 ✓ Starting...
 ✓ Ready in 2.3s
```

**Keep this terminal open!** The server needs to keep running.

---

### **PHASE 5: Test Your Application** 🎉

Open your browser and visit: **http://localhost:9002**

#### **Test 1: View Landing Page**
- You should see the CareerMatch landing page
- Header with Login and Sign Up buttons

#### **Test 2: Login with Demo Account**
1. Click **"Login"** button
2. Enter:
   - Email: `student@test.com`
   - Password: `12345678`
3. Click **"Log In"**

**Expected:** You should be redirected to `/home` (Student Dashboard)

#### **Test 3: Try Different Roles**
- **Host Login**: host@test.com / 12345678 → Redirects to `/host`
- **Admin Login**: admin@test.com / 12345678 → Redirects to `/admin`

#### **Test 4: Create New Account (2-Step Signup)**
1. Go to: http://localhost:9002/signup
2. **Step 1 - Create Account:**
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `12345678`
   - Confirm Password: `12345678`
   - Click **"Continue to Step 2"**

3. **Check Email Dialog:**
   - You'll see "Check your email" dialog
   - For testing, you can skip email verification by going to Supabase

4. **Verify Email in Supabase:**
   - Go to Supabase Dashboard → **Authentication** → **Users**
   - Find your new user `test@example.com`
   - Click on the user → Click **"Confirm user"**

5. **Complete Profile (Step 2):**
   - Go to: http://localhost:9002/signup/step-2
   - Select Role: **Student** or **Organization**
   - Fill in profile details
   - Click **"Complete Profile"**

**Expected:** You'll be redirected to your dashboard!

#### **Test 5: Create Admin Account**
1. Go to: http://localhost:9002/signup/admin-secret-access
2. Fill in admin details
3. Click **"Create Admin Account"**

**Expected:** Admin account created and redirected to `/admin`

---

### **PHASE 6: Verify Data in Supabase** (Optional)

1. Go to Supabase Dashboard → **Table Editor**
2. Click on **"users"** table
3. You should see all the users created:
   - student@test.com
   - host@test.com
   - admin@test.com
   - Any new accounts you created

4. Check **"internships"** table - should have demo internships
5. Check **"courses"** table - should have demo courses

---

## 📊 **Quick Troubleshooting**

### **Problem: "Module not found" errors**
```bash
cd /app
rm -rf node_modules package-lock.json
npm install
```

### **Problem: Seed script fails**
- Make sure you ran the SQL schema first in Supabase
- Check that your `.env.local` file exists with correct credentials

### **Problem: Can't login**
- Make sure seed script completed successfully
- Try creating a new account via signup flow

### **Problem: "Email not verified"**
- Go to Supabase Dashboard → Authentication → Users
- Click on user → "Confirm user"

---

## 🎯 **What You Should See:**

### **Working Features:**
✅ Landing page loads
✅ Login with demo accounts works
✅ 2-step signup process
✅ Email verification (manual via Supabase dashboard)
✅ Role-based redirects (student → /home, host → /host, admin → /admin)
✅ Password reset dialog

### **Known Limitation:**
⚠️ **Most pages still use mock data** - They won't show real database data yet. They need to be migrated from `demo-data.ts` to Supabase queries. This is your next phase of work.

---

## 📁 **Quick Commands Reference:**

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Seed demo data
npm run seed

# Check if server is running
curl http://localhost:9002
```

---

## 🆘 **Need Help?**

If anything doesn't work:
1. Share the exact error message
2. Tell me which step failed
3. I'll help you fix it!

**Ready to start?** Run these commands in order:

```bash
cd /app
npm install
npm run seed
npm run dev
```

Then open http://localhost:9002/login and try logging in with:
- Email: `student@test.com`
- Password: `12345678`

Let me know how it goes! 🚀