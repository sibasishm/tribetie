"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";

import { RadioGroup, RadioGroupItem } from "~/components/radio-input";

import { useAssessment } from "~/contexts/personality-assessment";
import { QUESTIONS } from "~/lib/constants";
import { cn } from "~/lib/utils";

export default function QuestionPage() {
  const { questionId } = useParams();
  const { actions } = useAssessment();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    actions.addResponse({
      question_id: Number(questionId),
      response: data.response,
    });
    router.push(`/assessment/${Number(questionId) + 1}`);
  };

  const currentQuestion = QUESTIONS.find(
    (q) => q.question_id === Number(questionId),
  );

  const choices = (currentQuestion
    ? currentQuestion.choices
    : [""]) as unknown as readonly [string, ...string[]];

  const FormSchema = z.object({
    response: z.enum(choices, {
      required_error: "You need to select a response",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="font-serif text-4xl font-bold">
        Question {questionId}/{QUESTIONS.length}
      </h1>
      <p className="mt-12 text-center text-xl font-semibold">
        {currentQuestion?.question}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
          <FormField
            control={form.control}
            name="response"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="sr-only">
                  {currentQuestion?.question}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    {choices.map((choice, index) => (
                      <FormItem
                        key={index}
                        className={cn(
                          "flex items-center space-x-3 space-y-0 rounded-xl border p-3 px-4",
                          field.value === choice
                            ? "border-primary text-primary border-2"
                            : "border-slate-50",
                        )}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={choice}
                            className="radio-primary"
                            checked={field.value === choice}
                          />
                        </FormControl>
                        <FormLabel className="text-base font-medium">
                          {choice}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="btn btn-primary mt-12 w-80">
            Next
          </button>
        </form>
      </Form>
    </main>
  );
}
