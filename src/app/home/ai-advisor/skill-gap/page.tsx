
import SkillGapClientPage from "./client-page";

export default function SkillGapPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Skill Gap Analysis</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Pinpoint your knowledge gaps for a specific job role with a targeted technical quiz and get AI-powered course recommendations.
        </p>
      </div>
      <SkillGapClientPage />
    </div>
  );
}
