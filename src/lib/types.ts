

export type Role = 'student' | 'host' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
}

export interface Internship {
  id: string;
  title: string;
  organization: string;
  logoUrl: string;
  location: string;
  duration: string;
  fitScore?: number;
  description: string;
  tags: string[];
  status: 'Active' | 'Closed' | 'Blocked';
}

export interface Course {
    id: string;
    title: string;
    provider: string;
    logoUrl: string;
    category: string;
    duration: string;
    rating: number;
    description: string;
    modules: {
        title: string;
        duration: string;
        contentBlocks: {
            type: 'video' | 'text' | 'quiz';
            title: string;
            content: string;
        }[];
    }[];
    tags?: string[];
    status: 'Active' | 'Blocked' | 'Inactive';
}

export interface Feedback {
  id: string;
  studentName: string;
  studentAvatarUrl: string;
  targetType: 'internship' | 'course';
  targetId: string;
  targetName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Conversation {
    from: 'admin' | 'host';
    text: string;
    timestamp: string;
}
export type Conversations = Record<string, Conversation[]>;


export interface CourseRecommendationForInternshipsOutput {
  recommendedCourseIds: string[];
  reasoning: string;
}

export interface StudentProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    university: string;
    college: string;
    degree: string;
    branch: string;
    year: number;
    cgpa: number;
    credits: number;
    bio: string;
    resume: string;
    resumeParsed: boolean;
    consent: boolean;
    links: {
      twitter: string;
      github: string;
      linkedin: string;
      kaggle: string;
    };
    skills: string[];
}

export interface Applicant extends Omit<StudentProfile, 'links' | 'resume' | 'resumeParsed' | 'consent'> {
    internshipId: string;
    status: 'Allocated' | 'Pending Review' | 'Interviewing' | 'Offer Extended' | 'Rejected';
}

export interface SkillGapRecommendationOutput {
  identifiedGaps: string[];
  recommendedCourses: {
    id: string;
    name: string;
  }[];
  analysisSummary: string;
  analysisBullets: string[];
  skillProficiency: {
    skillArea: string;
    proficiency: number;
  }[];
}

export interface SkillAssessmentAttempt {
    id: string;
    date: string;
    desiredJob: string;
    quiz: any; // In a real app, this would be your SkillQuiz type
    answers: any; // In a real app, this would be your SkillQuizAnswers type
    recommendations: SkillGapRecommendationOutput;
}

import type { Quiz, QuizAnswers, CareerRecommendationOutput } from "@/ai/flows/career-interest-types";

export interface CareerQuizAttempt {
  id: string;
  date: string;
  quiz: Quiz;
  answers: QuizAnswers;
  recommendations: CareerRecommendationOutput;
}
