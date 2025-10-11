export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          role: 'student' | 'host' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          role: 'student' | 'host' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          role?: 'student' | 'host' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      student_profiles: {
        Row: {
          user_id: string
          name: string
          university: string
          college: string
          degree: string
          branch: string
          year: number
          cgpa: number
          credits: number
          bio: string | null
          resume: string | null
          resume_parsed: boolean
          consent: boolean
          twitter: string | null
          github: string | null
          linkedin: string | null
          kaggle: string | null
          skills: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          university: string
          college: string
          degree: string
          branch: string
          year: number
          cgpa: number
          credits: number
          bio?: string | null
          resume?: string | null
          resume_parsed?: boolean
          consent?: boolean
          twitter?: string | null
          github?: string | null
          linkedin?: string | null
          kaggle?: string | null
          skills?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          name?: string
          university?: string
          college?: string
          degree?: string
          branch?: string
          year?: number
          cgpa?: number
          credits?: number
          bio?: string | null
          resume?: string | null
          resume_parsed?: boolean
          consent?: boolean
          twitter?: string | null
          github?: string | null
          linkedin?: string | null
          kaggle?: string | null
          skills?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      host_profiles: {
        Row: {
          user_id: string
          name: string
          email: string
          phone: string | null
          address: string | null
          logo_url: string | null
          bio: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          email: string
          phone?: string | null
          address?: string | null
          logo_url?: string | null
          bio?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          address?: string | null
          logo_url?: string | null
          bio?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      internships: {
        Row: {
          id: string
          title: string
          organization: string
          logo_url: string
          location: string
          duration: string
          description: string
          tags: string[]
          status: 'Active' | 'Closed' | 'Blocked'
          host_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          organization: string
          logo_url: string
          location: string
          duration: string
          description: string
          tags?: string[]
          status?: 'Active' | 'Closed' | 'Blocked'
          host_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          organization?: string
          logo_url?: string
          location?: string
          duration?: string
          description?: string
          tags?: string[]
          status?: 'Active' | 'Closed' | 'Blocked'
          host_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          provider: string
          logo_url: string
          category: string
          duration: string
          rating: number
          description: string
          modules: Json
          tags: string[]
          status: 'Active' | 'Blocked' | 'Inactive'
          host_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          provider: string
          logo_url: string
          category: string
          duration: string
          rating?: number
          description: string
          modules: Json
          tags?: string[]
          status?: 'Active' | 'Blocked' | 'Inactive'
          host_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          provider?: string
          logo_url?: string
          category?: string
          duration?: string
          rating?: number
          description?: string
          modules?: Json
          tags?: string[]
          status?: 'Active' | 'Blocked' | 'Inactive'
          host_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          student_id: string
          target_type: 'internship' | 'course'
          target_id: string
          target_name: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          target_type: 'internship' | 'course'
          target_id: string
          target_name: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          target_type?: 'internship' | 'course'
          target_id?: string
          target_name?: string
          rating?: number
          comment?: string
          created_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          student_id: string
          internship_id: string
          status: 'Allocated' | 'Pending Review' | 'Interviewing' | 'Offer Extended' | 'Rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          internship_id: string
          status?: 'Allocated' | 'Pending Review' | 'Interviewing' | 'Offer Extended' | 'Rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          internship_id?: string
          status?: 'Allocated' | 'Pending Review' | 'Interviewing' | 'Offer Extended' | 'Rejected'
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          host_id: string
          from: 'admin' | 'host'
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          host_id: string
          from: 'admin' | 'host'
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          from?: 'admin' | 'host'
          message?: string
          created_at?: string
        }
      }
      skill_assessments: {
        Row: {
          id: string
          student_id: string
          desired_job: string
          quiz_data: Json
          answers_data: Json
          recommendations: Json
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          desired_job: string
          quiz_data: Json
          answers_data: Json
          recommendations: Json
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          desired_job?: string
          quiz_data?: Json
          answers_data?: Json
          recommendations?: Json
          created_at?: string
        }
      }
      career_quizzes: {
        Row: {
          id: string
          student_id: string
          quiz_data: Json
          answers_data: Json
          recommendations: Json
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          quiz_data: Json
          answers_data: Json
          recommendations: Json
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          quiz_data?: Json
          answers_data?: Json
          recommendations?: Json
          created_at?: string
        }
      }
    }
  }
}
