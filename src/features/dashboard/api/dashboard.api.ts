import { http } from "@/shared/api/http";
import type { AiRecommendationDto } from "@/shared/types/models";

export const generateRecommendation = async (testResultId: string): Promise<AiRecommendationDto> => {
  const response = await http.post<AiRecommendationDto>(`/api/Recommendation/generate/${testResultId}`);
  return response.data;
};

export const getUserRecommendations = async (userId: string): Promise<AiRecommendationDto[]> => {
  const response = await http.get<AiRecommendationDto[]>(`/api/Recommendation/user/${userId}`);
  return response.data;
};

export const getRecommendationById = async (id: string): Promise<AiRecommendationDto> => {
  const response = await http.get<AiRecommendationDto>(`/api/Recommendation/${id}`);
  return response.data;
};
