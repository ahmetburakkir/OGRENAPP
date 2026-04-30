import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestById, submitTest } from "../api/testing.api";
import { useTestStore } from "../store/useTestStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { TestDto, UserAnswerDto } from "@/shared/types/models";
import { QuestionRenderer } from "../components/QuestionRenderer";
import { Button } from "@/shared/ui/Button";

export const TestExecutionPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<TestDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuthStore();
  
  const {
    currentQuestionIndex,
    answers,
    startTest,
    setAnswer,
    nextQuestion,
    prevQuestion,
    resetTest
  } = useTestStore();

  useEffect(() => {
    if (testId) {
      startTest(testId);
      getTestById(testId)
        .then(setTest)
        .finally(() => setLoading(false));
    }
  }, [testId, startTest]);

  if (loading) return <div className="p-8 text-center">Loading test...</div>;
  if (!test) return <div className="p-8 text-center text-red-500">Test not found</div>;

  const questions = test.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!userId || !testId) return;
    
    // Convert answers dictionary to array
    const answerArray: UserAnswerDto[] = Object.values(answers);
    
    try {
      const resultId = await submitTest({
        userId,
        testId,
        answers: answerArray
      });
      // Test submitted successfully
      resetTest();
      // Redirect to dashboard with the new resultId to generate recommendation
      navigate(`/dashboard?resultId=${resultId}`);
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to submit test");
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion?.id];
  const canProceed = !!currentAnswer?.selectedAnswer;

  return (
    <div className="max-w-2xl mx-auto p-4 py-12">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {currentQuestion && (
        <QuestionRenderer
          question={currentQuestion}
          answer={currentAnswer}
          onChange={setAnswer}
        />
      )}

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!canProceed}>
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};
