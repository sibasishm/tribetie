import * as z from "zod";

export const responseSchema = z.object({
  question_id: z.number(),
  response: z.string({
    required_error: "You must select a response to proceed",
  }),
});

// export const requiredDateSchema = z.date().nonempty('Birth date is required');

// export const stepThreeSchema = z.object({
//   birth_date: requiredDateSchema,
//   gender: z.string().nonempty('Gender is required'),
//   lat: z.number().nonempty('Lat is required'),
//   lng: z.number().nonempty('Long is required'),
// });

// export const mapSchema = z.object({
//   lat: z.number().nonempty('Lat is required'),
//   lng: z.number().nonempty('Long is required'),
// });
