import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTests } from "../api/testing.api";
import type { TestSummaryDto } from "@/shared/types/models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

export const TestListPage = () => {
  const [tests, setTests] = useState<TestSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getTests()
      .then(setTests)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading tests...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Available Tests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle>{test.title}</CardTitle>
              <CardDescription>{test.type} • {test.questionCount} Questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate(`/test/${test.id}`)}>
                Start Test
              </Button>
            </CardContent>
          </Card>
        ))}
        {tests.length === 0 && (
          <div className="col-span-full text-center p-8 text-gray-500">
            No tests available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};
