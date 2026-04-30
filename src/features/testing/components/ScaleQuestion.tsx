import type { QuestionDto, UserAnswerDto } from "@/shared/types/models";
import { Button } from "@/shared/ui/Button";

interface Props {
  question: QuestionDto;
  answer?: UserAnswerDto;
  onChange: (val: string) => void;
}

export const ScaleQuestion = ({ question, answer, onChange }: Props) => {
  const scale = ["1", "2", "3", "4", "5"];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{question.content}</h3>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-center">
        {scale.map((val) => (
          <Button
            key={val}
            type="button"
            variant={answer?.selectedAnswer === val ? "default" : "outline"}
            className="w-12 h-12 rounded-full text-lg"
            onClick={() => onChange(val)}
          >
            {val}
          </Button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
};
