import { useEffect, useState } from "react";
import { generateRecommendation } from "../api/dashboard.api";
import type { AiRecommendationDto } from "@/shared/types/models";
import { Card, CardContent } from "@/shared/ui/Card";

interface Props {
  testResultId: string;
  onComplete: (data: AiRecommendationDto) => void;
  onError: (err: any) => void;
}

export const RecommendationStepper = ({ testResultId, onComplete, onError }: Props) => {
  const [step, setStep] = useState(0);

  const steps = [
    "Cevaplar kaydediliyor...",
    "Skorlar hesaplanıyor (Adım A)...",
    "Kişilik tipi belirleniyor (Adım B)...",
    "AI kariyer rehberi hazırlanıyor (Adım C)..."
  ];

  useEffect(() => {
    let isCancelled = false;

    const runProcess = async () => {
      // Simulate stepper UX
      for (let i = 0; i < steps.length - 1; i++) {
        setStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (isCancelled) return;
      }
      setStep(steps.length - 1);
      
      try {
        const result = await generateRecommendation(testResultId);
        onComplete(result);
      } catch (err) {
        onError(err);
      }
    };

    runProcess();

    return () => { isCancelled = true; };
  }, [testResultId]);

  return (
    <Card className="w-full max-w-xl mx-auto mt-8">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {steps.map((s, idx) => (
            <div key={idx} className={`flex items-center space-x-3 ${idx > step ? 'opacity-30' : 'opacity-100'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                idx < step ? 'bg-green-500 text-white' : idx === step ? 'bg-blue-600 text-white animate-pulse' : 'bg-gray-200'
              }`}>
                {idx < step ? "✓" : idx + 1}
              </div>
              <span className={`text-sm md:text-base font-medium ${idx === step ? 'text-blue-600' : ''}`}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
