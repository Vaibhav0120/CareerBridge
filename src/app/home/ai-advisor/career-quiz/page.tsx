
import CareerQuizClientPage from "./client-page";

export default function CareerQuizPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Career Advisor Quiz</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Take a short quiz to discover your personality and interests, and get personalized recommendations for tech careers and courses.
        </p>
      </div>
      <CareerQuizClientPage />
    </div>
  );
}
