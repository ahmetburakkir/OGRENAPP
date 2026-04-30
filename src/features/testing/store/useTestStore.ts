import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserAnswerDto } from "@/shared/types/models";

interface TestState {
  testId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, UserAnswerDto>;
  startTest: (testId: string) => void;
  setAnswer: (questionId: string, answer: Partial<UserAnswerDto>) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  resetTest: () => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      testId: null,
      currentQuestionIndex: 0,
      answers: {},

      startTest: (testId) => set({ testId, currentQuestionIndex: 0, answers: {} }),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              ...state.answers[questionId],
              questionId,
              ...answer,
            },
          },
        })),

      nextQuestion: () =>
        set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),

      prevQuestion: () =>
        set((state) => ({ currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) })),

      goToQuestion: (index) => set({ currentQuestionIndex: index }),

      resetTest: () => set({ testId: null, currentQuestionIndex: 0, answers: {} }),
    }),
    {
      name: "ogrenapp-test-storage",
    }
  )
);
