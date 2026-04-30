export interface QuestionDto {
  id: string;
  content: string | null;
  answerType: string | null;
  order: number;
  options: Record<string, any> | null;
  topicNames: string[] | null;
}

export interface UserAnswerDto {
  questionId: string;
  selectedAnswer: string | null;
  rank: number | null;
}

export interface SubmitTestDto {
  userId: string;
  testId: string;
  answers: UserAnswerDto[] | null;
}

export interface SubmitTestResultDto {
  testResultId: string;
  message: string | null;
}

export interface TestDto {
  id: string;
  title: string | null;
  type: string | null;
  description: string | null;
  questions: QuestionDto[] | null;
}

export interface TestResultDto {
  id: string;
  testId: string;
  testTitle: string | null;
  testType: string | null;
  score: number;
  completedAt: string;
}

export interface TestSummaryDto {
  id: string;
  title: string | null;
  type: string | null;
  questionCount: number;
}

export interface AiRecommendationDto {
  id: string;
  content: string | null;
  testTitle: string | null;
  testType: string | null;
  createdAt: string;
}

export interface TopicDto {
  id: string;
  name: string | null;
  category: string | null;
}

export interface UserLoginDto {
  username?: string;
  password?: string;
}

export interface UserRegisterDto {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface UserUpdateDto {
  name?: string;
  username?: string;
  email?: string;
  passwordHash?: string;
}

export interface AuthResponseDto {
  token: string;
  role: string;
  userId: string;
}
