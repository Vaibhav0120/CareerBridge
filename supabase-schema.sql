-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'host', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create student_profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  college TEXT NOT NULL,
  degree TEXT NOT NULL,
  branch TEXT NOT NULL,
  year INTEGER NOT NULL,
  cgpa DECIMAL(4,2) NOT NULL,
  credits INTEGER NOT NULL DEFAULT 0,
  bio TEXT,
  resume TEXT,
  resume_parsed BOOLEAN DEFAULT false,
  consent BOOLEAN DEFAULT false,
  twitter TEXT,
  github TEXT,
  linkedin TEXT,
  kaggle TEXT,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create host_profiles table
CREATE TABLE IF NOT EXISTS host_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  logo_url TEXT,
  bio TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create internships table
CREATE TABLE IF NOT EXISTS internships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('Active', 'Closed', 'Blocked')) DEFAULT 'Active',
  host_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  description TEXT NOT NULL,
  modules JSONB NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('Active', 'Blocked', 'Inactive')) DEFAULT 'Active',
  host_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('internship', 'course')),
  target_id UUID NOT NULL,
  target_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  internship_id UUID REFERENCES internships(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('Allocated', 'Pending Review', 'Interviewing', 'Offer Extended', 'Rejected')) DEFAULT 'Pending Review',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, internship_id)
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID REFERENCES users(id) ON DELETE CASCADE,
  from_role TEXT NOT NULL CHECK (from_role IN ('admin', 'host')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skill_assessments table
CREATE TABLE IF NOT EXISTS skill_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  desired_job TEXT NOT NULL,
  quiz_data JSONB NOT NULL,
  answers_data JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create career_quizzes table
CREATE TABLE IF NOT EXISTS career_quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_data JSONB NOT NULL,
  answers_data JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_internships_status ON internships(status);
CREATE INDEX IF NOT EXISTS idx_internships_host_id ON internships(host_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_host_id ON courses(host_id);
CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_internship_id ON applications(internship_id);
CREATE INDEX IF NOT EXISTS idx_feedback_student_id ON feedback(student_id);
CREATE INDEX IF NOT EXISTS idx_conversations_host_id ON conversations(host_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_host_profiles_updated_at BEFORE UPDATE ON host_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_internships_updated_at BEFORE UPDATE ON internships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE host_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_quizzes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users: Users can read all, but only update their own
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Student profiles: Students can read all, but only update their own
CREATE POLICY "Anyone can view student profiles" ON student_profiles FOR SELECT USING (true);
CREATE POLICY "Students can insert own profile" ON student_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students can update own profile" ON student_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Host profiles: Everyone can read, hosts can update their own
CREATE POLICY "Anyone can view host profiles" ON host_profiles FOR SELECT USING (true);
CREATE POLICY "Hosts can insert own profile" ON host_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Hosts can update own profile" ON host_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Internships: Everyone can read, hosts can manage their own
CREATE POLICY "Anyone can view internships" ON internships FOR SELECT USING (true);
CREATE POLICY "Hosts can create internships" ON internships FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can update own internships" ON internships FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "Hosts can delete own internships" ON internships FOR DELETE USING (auth.uid() = host_id);

-- Courses: Everyone can read, hosts can manage their own
CREATE POLICY "Anyone can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Hosts can create courses" ON courses FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can update own courses" ON courses FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "Hosts can delete own courses" ON courses FOR DELETE USING (auth.uid() = host_id);

-- Feedback: Everyone can read, students can create
CREATE POLICY "Anyone can view feedback" ON feedback FOR SELECT USING (true);
CREATE POLICY "Students can create feedback" ON feedback FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Applications: Students see their own, hosts see applications to their internships
CREATE POLICY "Students can view own applications" ON applications FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Hosts can view applications to their internships" ON applications FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM internships WHERE internships.id = applications.internship_id AND internships.host_id = auth.uid()
  )
);
CREATE POLICY "Students can create applications" ON applications FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update own applications" ON applications FOR UPDATE USING (auth.uid() = student_id);

-- Conversations: Hosts see their own, admins see all
CREATE POLICY "Hosts can view own conversations" ON conversations FOR SELECT USING (auth.uid() = host_id);
CREATE POLICY "Hosts can create conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = host_id);

-- Skill assessments: Students can view and create their own
CREATE POLICY "Students can view own assessments" ON skill_assessments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can create assessments" ON skill_assessments FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Career quizzes: Students can view and create their own
CREATE POLICY "Students can view own quizzes" ON career_quizzes FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can create quizzes" ON career_quizzes FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
