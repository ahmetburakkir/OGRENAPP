import type { QuestionDto, UserAnswerDto } from "@/shared/types/models";
import { ScaleQuestion } from "./ScaleQuestion";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { RankOrderQuestion } from "./RankOrderQuestion";

interface Props {
  question: QuestionDto;
  answer?: UserAnswerDto;
  onChange: (questionId: string, answer: Partial<UserAnswerDto>) => void;
}

export const QuestionRenderer = ({ question, answer, onChange }: Props) => {
  const handleChange = (val: string) => {
    onChange(question.id, { selectedAnswer: val });
  };

  switch (question.answerType) {
    case "scale":
      return <ScaleQuestion question={question} answer={answer} onChange={handleChange} />;
    case "single_choice":
      return <SingleChoiceQuestion question={question} answer={answer} onChange={handleChange} />;
    case "rank_order":
      return <RankOrderQuestion question={question} answer={answer} onChange={handleChange} />;
    default:
      return (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          Bilinmeyen soru tipi: {question.answerType}
        </div>
      );
  }
};
