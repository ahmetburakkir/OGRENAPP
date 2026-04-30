import { http } from "@/shared/api/http";
import type { TestSummaryDto, TestDto, SubmitTestDto, TestResultDto } from "@/shared/types/models";

export const getTests = async (): Promise<TestSummaryDto[]> => {
  const response = await http.get<TestSummaryDto[]>("/api/Test");
  return response.data;
};

export const getTestById = async (id: string): Promise<TestDto> => {
  const response = await http.get<TestDto>(`/api/Test/${id}`);
  return response.data;
};

export const submitTest = async (data: SubmitTestDto): Promise<string> => {
  // Returns testResultId
  const response = await http.post<string>("/api/Test/submit", data);
  return response.data;
};

export const getUserTestResults = async (userId: string): Promise<TestResultDto[]> => {
  const response = await http.get<TestResultDto[]>(`/api/Test/results/user/${userId}`);
  return response.data;
};
