import type { QuestionDto, UserAnswerDto } from "@/shared/types/models";
import { Button } from "@/shared/ui/Button";

interface Props {
  question: QuestionDto;
  answer?: UserAnswerDto;
  onChange: (val: string) => void;
}

export const SingleChoiceQuestion = ({ question, answer, onChange }: Props) => {
  const options = question.options || {};
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{question.content}</h3>
      <div className="flex flex-col gap-3">
        {Object.entries(options).map(([key, value]) => (
          <Button
            key={key}
            type="button"
            variant={answer?.selectedAnswer === key ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-3 px-4 whitespace-normal"
            onClick={() => onChange(key)}
          >
            {String(value)}
          </Button>
        ))}
      </div>
    </div>
  );
};
