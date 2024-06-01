"use client";

import { AssessmentContext } from "~/contexts/personality-assessment";

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AssessmentContext.Provider initialValue={{ response: [] }}>
      {children}
    </AssessmentContext.Provider>
  );
}
