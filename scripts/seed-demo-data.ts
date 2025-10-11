/**
 * Seed Demo Data Script
 * 
 * This script seeds the Supabase database with demo data from demo-data.ts
 * 
 * Usage: npm run seed (add this to package.json scripts)
 * Or: npx ts-node scripts/seed-demo-data.ts
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { users, internships, courses, feedback, hostProfile, allHosts, studentProfile, allApplicants, skillAssessmentHistory, careerQuizHistory } from '../src/lib/demo-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables. Please check .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedUsers() {
  console.log('\n📝 Seeding users...');

  // Create demo users in Supabase Auth
  const demoUsers = [
    { email: 'student@test.com', password: '12345678', username: 'student', role: 'student', name: 'Alex Doe', userData: users.student },
    { email: 'host@test.com', password: '12345678', username: 'host', role: 'host', name: 'Sarah Lee', userData: users.host },
    { email: 'admin@test.com', password: '12345678', username: 'admin', role: 'admin', name: 'Admin User', userData: users.admin },
  ];

  for (const user of demoUsers) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          username: user.username,
        },
      });

      if (authError) {
        console.log(`⚠️  User ${user.email} might already exist: ${authError.message}`);
        continue;
      }

      if (authData.user) {
        // Insert into users table
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            avatar_url: user.userData.avatarUrl,
          });

        if (insertError && !insertError.message.includes('duplicate')) {
          console.log(`⚠️  Error inserting user record: ${insertError.message}`);
          continue;
        }

        // Create profile based on role
        if (user.role === 'student') {
          const { error: profileError } = await supabase
            .from('student_profiles')
            .insert({
              user_id: authData.user.id,
              name: studentProfile.name,
              university: studentProfile.university,
              college: studentProfile.college,
              degree: studentProfile.degree,
              branch: studentProfile.branch,
              year: studentProfile.year,
              cgpa: studentProfile.cgpa,
              credits: studentProfile.credits,
              bio: studentProfile.bio,
              resume: studentProfile.resume,
              resume_parsed: studentProfile.resumeParsed,
              consent: studentProfile.consent,
              twitter: studentProfile.links.twitter,
              github: studentProfile.links.github,
              linkedin: studentProfile.links.linkedin,
              kaggle: studentProfile.links.kaggle,
              skills: studentProfile.skills,
            });

          if (profileError && !profileError.message.includes('duplicate')) {
            console.log(`⚠️  Error creating student profile: ${profileError.message}`);
          }
        } else if (user.role === 'host') {
          const { error: profileError } = await supabase
            .from('host_profiles')
            .insert({
              user_id: authData.user.id,
              name: hostProfile.name,
              email: hostProfile.email,
              phone: hostProfile.phone,
              address: hostProfile.address,
              logo_url: hostProfile.logoUrl,
              bio: hostProfile.bio,
              verified: hostProfile.verified,
            });

          if (profileError && !profileError.message.includes('duplicate')) {
            console.log(`⚠️  Error creating host profile: ${profileError.message}`);
          }
        }

        console.log(`✅ Created ${user.role}: ${user.email}`);
      }
    } catch (error: any) {
      console.log(`⚠️  Error creating user ${user.email}: ${error.message}`);
    }
  }
}

async function seedInternships() {
  console.log('\n📝 Seeding internships...');

  // Get host user ID
  const { data: hostUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', 'host@test.com')
    .single();

  if (!hostUser) {
    console.log('⚠️  Host user not found. Skipping internships.');
    return;
  }

  for (const internship of internships) {
    try {
      const { error } = await supabase
        .from('internships')
        .insert({
          title: internship.title,
          organization: internship.organization,
          logo_url: internship.logoUrl,
          location: internship.location,
          duration: internship.duration,
          description: internship.description,
          tags: internship.tags,
          status: internship.status,
          host_id: hostUser.id,
        });

      if (error && !error.message.includes('duplicate')) {
        console.log(`⚠️  Error inserting internship: ${error.message}`);
      } else if (!error) {
        console.log(`✅ Created internship: ${internship.title}`);
      }
    } catch (error: any) {
      console.log(`⚠️  Error: ${error.message}`);
    }
  }
}

async function seedCourses() {
  console.log('\n📝 Seeding courses...');

  // Get host user ID
  const { data: hostUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', 'host@test.com')
    .single();

  for (const course of courses) {
    try {
      const { error } = await supabase
        .from('courses')
        .insert({
          title: course.title,
          provider: course.provider,
          logo_url: course.logoUrl,
          category: course.category,
          duration: course.duration,
          rating: course.rating,
          description: course.description,
          modules: course.modules,
          tags: course.tags || [],
          status: course.status,
          host_id: hostUser?.id || null,
        });

      if (error && !error.message.includes('duplicate')) {
        console.log(`⚠️  Error inserting course: ${error.message}`);
      } else if (!error) {
        console.log(`✅ Created course: ${course.title}`);
      }
    } catch (error: any) {
      console.log(`⚠️  Error: ${error.message}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting database seeding...');
  console.log(`📍 Supabase URL: ${supabaseUrl}`);

  try {
    await seedUsers();
    await seedInternships();
    await seedCourses();

    console.log('\n✅ Database seeding completed!');
    console.log('\n📋 Demo Credentials:');
    console.log('   Student: student@test.com / 12345678');
    console.log('   Host: host@test.com / 12345678');
    console.log('   Admin: admin@test.com / 12345678');
    console.log('\n🌐 Visit http://localhost:9002/login to test\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();
