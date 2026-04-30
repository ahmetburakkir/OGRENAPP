import { httpRequest } from './http';

export interface LoginResponse {
  token: string;
  role: string;
  userId: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface TestSummaryDto {
  id: string;
  title?: string;
  type?: string;
  questionCount?: number;
}

export interface QuestionDto {
  id: string;
  content?: string;
  answerType?: string;
  order?: number;
  options?: Record<string, string>;
  topicNames?: string[];
}

export interface TestDto {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  questions?: QuestionDto[];
}

export interface SubmitAnswerDto {
  questionId: string;
  selectedAnswer?: string;
  rank?: number;
}

export interface SubmitResponseDto {
  testResultId: string;
  message?: string;
}

export interface AiRecommendationDto {
  id: string;
  content?: string;
  testTitle?: string;
  testType?: string;
  createdAt?: string;
}

export interface TestResultDto {
  id: string;
  testId: string;
  testTitle?: string;
  testType?: string;
  score?: number;
  completedAt?: string;
}

export async function loginUser(payload: { username: string; password: string }) {
  return httpRequest<LoginResponse>('/api/user/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload: RegisterPayload) {
  return httpRequest<string>('/api/user/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getTests(token: string) {
  return httpRequest<TestSummaryDto[]>('/api/test', { token });
}

export async function getTestById(testId: string, token: string) {
  return httpRequest<TestDto>(`/api/test/${testId}`, { token });
}

export async function submitTest(payload: { userId: string; testId: string; answers: SubmitAnswerDto[] }, token: string) {
  return httpRequest<SubmitResponseDto>('/api/test/submit', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export async function generateRecommendation(testResultId: string, token: string) {
  return httpRequest<AiRecommendationDto>(`/api/recommendation/generate/${testResultId}`, {
    method: 'POST',
    token,
  });
}

export async function getRecommendationsByUser(userId: string, token: string) {
  return httpRequest<AiRecommendationDto[]>(`/api/recommendation/user/${userId}`, { token });
}

export async function getUserResults(userId: string, token: string) {
  return httpRequest<TestResultDto[]>(`/api/test/results/user/${userId}`, { token });
}

