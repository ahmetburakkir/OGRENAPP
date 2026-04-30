import ReactMarkdown from "react-markdown";
import type { AiRecommendationDto } from "@/shared/types/models";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/Card";

interface Props {
  recommendation: AiRecommendationDto;
}

export const AiReport = ({ recommendation }: Props) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>AI Career Report</CardTitle>
        <CardDescription>
          Based on your {recommendation.testTitle || recommendation.testType || "test"} results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{recommendation.content || "No content generated."}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};
