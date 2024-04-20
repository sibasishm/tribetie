"use client";

import { AssessmentProvider } from "~/contexts/personality-assessment";

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AssessmentProvider>{children}</AssessmentProvider>;
}
