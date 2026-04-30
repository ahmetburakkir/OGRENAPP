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

interface TestSummaryDto {
  id: string;
}

interface QuestionDto {
  id: string;
  questionText: string;
  answerType: 'scale' | 'single_choice' | 'rank_order';
  options?: string | string[];
}

interface TestDto {
  id: string;
  questions: QuestionDto[];
}

interface SubmitAnswerDto {
  questionId: string;
  selectedAnswer: string;
  rank: number;
}

interface SubmitResponseDto {
  testResultId: string;
}

export interface AiRecommendationDto {
  id: string;
  recommendation: string;
  createdAt?: string;
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

