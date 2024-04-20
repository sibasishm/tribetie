"use client";

import { useParams } from "next/navigation";

import { AssessmentProvider } from "~/contexts/personality-assessment";
import { QUESTIONS } from "~/lib/constants";

export default function QuestionPage() {
  const { questionId } = useParams();

  const currentQuestion = QUESTIONS.find(
    (q) => q.question_id === Number(questionId),
  );

  if (!Boolean(currentQuestion)) {
    return <div>Question not found</div>;
  }

  return (
    <AssessmentProvider>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl font-bold">Question {questionId}</h1>
        <p className="mt-12 text-xl font-semibold">
          {currentQuestion?.question}
        </p>
        <ol className="mt-12 flex flex-col gap-4">
          {currentQuestion?.choices.map((option, index) => (
            <li key={index}>
              <button
                className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <span className="flex items-center">
                  <span className="mr-2">{index + 1}</span>
                  <span>{option}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button className="mt-12 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Next
        </button>
      </div>
    </AssessmentProvider>
  );
}
