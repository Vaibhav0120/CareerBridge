
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  Target,
  Users,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Search,
  UserPlus,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">CareerMatch</span>
          </Link>
          <nav className="hidden flex-1 items-center justify-center space-x-1 text-sm font-medium md:flex">
            <Link href="#features" className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="#how-it-works" className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">How It Works</Link>
            <Link href="#testimonials" className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">Testimonials</Link>
            <Link href="#pm-scheme" className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">PM Scheme</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://picsum.photos/seed/hero-bg/1920/1080')", backgroundAttachment: 'fixed' }}>
          <div className="container px-4 md:px-6 bg-background/70 dark:bg-background/80 backdrop-blur-sm rounded-lg p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Find Your Perfect Internship Match
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CareerMatch uses intelligent algorithms to connect talented
                    students with their dream internships. Your future starts
                    here.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="team collaboration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Why Choose CareerMatch?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide a comprehensive platform for students, host
                  organizations, and administrators to streamline the
                  internship process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <FeatureCard
                icon={<Target className="h-8 w-8 text-primary" />}
                title="Intelligent Matching"
                description="Our AI-powered engine matches students to internships based on skills, preferences, and fit scores."
              />
              <FeatureCard
                icon={<Briefcase className="h-8 w-8 text-primary" />}
                title="Seamless Applications"
                description="Students can easily build profiles, browse opportunities, and apply with a single click."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Host Organization Tools"
                description="Manage internship listings, view applicants, and provide valuable feedback all in one place."
              />
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-primary" />}
                title="AI Course Recommendations"
                description="Identify skill gaps and get AI-driven course suggestions to boost your profile."
              />
              <FeatureCard
                icon={<CheckCircle className="h-8 w-8 text-primary" />}
                title="Fairness & Transparency"
                description="Admin dashboards provide insights into allocation fairness and detailed audit logs."
              />
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8 text-primary" />}
                title="Career Growth"
                description="Find the right opportunities and skills to launch your career successfully."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Simple Path to Your Future</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting started with CareerMatch is easy. Follow these simple steps to land your dream internship.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <HowItWorksStep icon={<UserPlus />} title="Create Profile" description="Sign up and build your comprehensive profile. Showcase your skills, experience, and career aspirations." />
              <HowItWorksStep icon={<Search />} title="Find Internships" description="Browse and search for opportunities. Our AI will recommend internships that are the best fit for you." />
              <HowItWorksStep icon={<Rocket />} title="Apply & Get Hired" description="Apply with a single click. Track your application status and get ready to launch your career." />
            </div>
          </div>
        </section>

        <section id="pm-scheme" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">PM Internship Scheme</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Join the Prestigious PM Internship Scheme
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                CareerMatch is proud to be the official platform for the Prime Minister's Internship Scheme. This initiative provides exceptional students with unique opportunities in leading public and private sector organizations, fostering the next generation of leaders and innovators.
              </p>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Exclusive access to high-profile internships.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Mentorship from industry leaders.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>A pathway to impactful careers.</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link href="/signup">Apply to the Scheme</Link>
              </Button>
            </div>
            <Image
              src="https://picsum.photos/seed/pmscheme/600/500"
              width="600"
              height="500"
              alt="PM Internship Scheme"
              data-ai-hint="government building"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </section>
        
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/testimonials-bg/1920/1080')", backgroundAttachment: 'fixed' }}>
           <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white">What Our Students Say</h2>
                    <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Hear from students who have successfully launched their careers with CareerMatch.
                    </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                  <TestimonialCard 
                    name="Jessica Miller"
                    role="Software Engineer at InnovateTech"
                    avatar="https://i.pravatar.cc/150?u=jessica"
                    testimonial="CareerMatch's AI recommendations were spot on! It found me the perfect internship that matched my skills and career goals. I couldn't have asked for a better start to my career."
                  />
                  <TestimonialCard 
                    name="David Chen"
                    role="Data Science Intern at DataDriven Inc."
                    avatar="https://i.pravatar.cc/150?u=david"
                    testimonial="The platform is incredibly user-friendly. I loved how easy it was to build my profile and apply for multiple internships. The process was seamless and efficient."
                  />
              </div>
           </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to find your match?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join CareerMatch today and take the next step in your
                professional journey.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/signup">Sign up for free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-secondary text-secondary-foreground">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div className="flex flex-col gap-4">
             <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold text-lg">CareerMatch</span>
            </Link>
            <p className="text-sm text-muted-foreground">Intelligent internship matching for a brighter future.</p>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Students</h3>
            <ul className="space-y-2 text-sm">
                <li><Link href="/home" className="text-muted-foreground hover:text-foreground">Find Internships</Link></li>
                <li><Link href="/home/courses" className="text-muted-foreground hover:text-foreground">Courses</Link></li>
                <li><Link href="/home/profile" className="text-muted-foreground hover:text-foreground">My Profile</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t">
            <div className="container flex items-center justify-between py-6">
                <p className="text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()} CareerMatch. All rights reserved.
                </p>
                {/* Add social media icons here if needed */}
            </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}

function HowItWorksStep({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="rounded-full border-8 border-secondary p-6 bg-muted">
        {React.cloneElement(icon as React.ReactElement, { className: 'h-10 w-10 text-primary' })}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function TestimonialCard({ name, role, avatar, testimonial }: { name: string, role: string, avatar: string, testimonial: string }) {
    return (
        <Card className="bg-background/80 dark:bg-background/70 backdrop-blur-md border-0">
            <CardContent className="p-6">
                <blockquote className="text-lg italic text-foreground">"{testimonial}"</blockquote>
                <div className="flex items-center gap-4 mt-6">
                    <Avatar>
                        <AvatarImage src={avatar} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-foreground">{name}</p>
                        <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
