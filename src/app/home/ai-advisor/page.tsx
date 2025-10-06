
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WandSparkles, Target, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AiAdvisorHubPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-12 text-center">
            <div className="inline-block rounded-lg bg-primary/10 p-4 mb-4">
                <WandSparkles className="h-10 w-10 text-primary" />
            </div>
          <h1 className="text-4xl font-bold tracking-tight font-headline">AI Advisor</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Your personal AI-powered assistant for career exploration and skill development.
          </p>
        </div>

        <div className="border rounded-lg p-8 mb-16">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">What is your goal today?</h2>
                <p className="text-muted-foreground">Select the option that best describes you to get started.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/home/ai-advisor/career-quiz" className="group block rounded-lg border p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <WandSparkles className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">I'm exploring career options.</h3>
                            <p className="text-muted-foreground mb-4">
                                Take a quiz to discover tech careers that align with your interests.
                            </p>
                            <Button variant="link" className="p-0 text-primary">
                                Start Career Quiz <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </Link>

                <Link href="/home/ai-advisor/skill-gap" className="group block rounded-lg border p-6 transition-all duration-300 hover:border-accent hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                        <div className="bg-accent/10 p-3 rounded-full">
                            <Target className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">I have a career goal in mind.</h3>
                            <p className="text-muted-foreground mb-4">
                                Assess your skills for a specific job and get course recommendations.
                            </p>
                            <Button variant="link" className="p-0 text-accent">
                                Analyze My Skills <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>

        <div className="text-center space-y-4">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">What Other Students are Saying</h2>
             <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
                See how the AI Advisor has helped students like you find their path.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400"/>)}
                    </div>
                    <blockquote className="italic text-muted-foreground">
                        "I was completely lost about which career to pursue. The personality quiz was surprisingly accurate and pointed me towards UX Design. The recommended courses gave me the perfect starting point!"
                    </blockquote>
                    <div className="flex items-center gap-4 mt-6">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=chloedavis" alt="Chloe Davis" />
                            <AvatarFallback>CD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Chloe Davis</p>
                            <p className="text-sm text-muted-foreground">Now a UX Design Intern</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                     <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400"/>)}
                    </div>
                    <blockquote className="italic text-muted-foreground">
                        "I knew I wanted to be a Backend Engineer, but I wasn't sure what skills I was missing. The skill gap analysis was a game-changer. It highlighted my weak spots and recommended courses that got me interview-ready."
                    </blockquote>
                    <div className="flex items-center gap-4 mt-6">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=bencarter" alt="Ben Carter" />
                            <AvatarFallback>BC</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Ben Carter</p>
                            <p className="text-sm text-muted-foreground">Hired as a Jr. Backend Engineer</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                     <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400"/>)}
                    </div>
                    <blockquote className="italic text-muted-foreground">
                        "The AI Advisor is like having a personal career coach. It helped me understand what roles I'd enjoy and gave me a clear action plan. I feel so much more confident in my job search now."
                    </blockquote>
                    <div className="flex items-center gap-4 mt-6">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=sarahjones" alt="Sarah Jones" />
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Sarah Jones</p>
                            <p className="text-sm text-muted-foreground">Exploring Data Science roles</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
      </div>
    </div>
  );
}
