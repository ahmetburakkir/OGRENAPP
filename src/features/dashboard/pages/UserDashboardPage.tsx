import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { getUserRecommendations, getRecommendationById } from "../api/dashboard.api";
import type { AiRecommendationDto } from "@/shared/types/models";
import { AiReport } from "../components/AiReport";
import { RecommendationStepper } from "../components/RecommendationStepper";
import { Button } from "@/shared/ui/Button";

export const UserDashboardPage = () => {
  const [searchParams] = useSearchParams();
  const resultId = searchParams.get("resultId");
  const recommendationId = searchParams.get("recommendationId");
  const navigate = useNavigate();
  const { userId } = useAuthStore();
  
  const [recommendations, setRecommendations] = useState<AiRecommendationDto[]>([]);
  const [currentReport, setCurrentReport] = useState<AiRecommendationDto | null>(null);
  const [isGenerating, setIsGenerating] = useState(!!resultId);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      getUserRecommendations(userId).then(setRecommendations).catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    if (recommendationId) {
      getRecommendationById(recommendationId).then(setCurrentReport).catch(console.error);
    }
  }, [recommendationId]);

  const handleGenerationComplete = (data: AiRecommendationDto) => {
    setIsGenerating(false);
    setCurrentReport(data);
    if (userId) {
      getUserRecommendations(userId).then(setRecommendations);
    }
  };

  const handleGenerationError = (err: any) => {
    setIsGenerating(false);
    setError(err?.response?.data?.message || "Failed to generate recommendation");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Button onClick={() => navigate("/tests")}>Take New Test</Button>
      </div>

      {isGenerating && resultId && (
        <RecommendationStepper
          testResultId={resultId}
          onComplete={handleGenerationComplete}
          onError={handleGenerationError}
        />
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md mb-8">{error}</div>
      )}

      {!isGenerating && currentReport && (
        <AiReport recommendation={currentReport} />
      )}

      {!isGenerating && !currentReport && recommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Past Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map(rec => (
              <div key={rec.id} className="p-4 border rounded-lg bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-lg">{rec.testTitle || rec.testType || "Test Result"}</h3>
                  <p className="text-sm text-gray-500">{new Date(rec.createdAt).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" className="mt-4" onClick={() => setCurrentReport(rec)}>
                  View Report
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isGenerating && !currentReport && recommendations.length === 0 && (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You haven't taken any tests yet.</p>
          <Button onClick={() => navigate("/tests")}>Explore Tests</Button>
        </div>
      )}
    </div>
  );
};
