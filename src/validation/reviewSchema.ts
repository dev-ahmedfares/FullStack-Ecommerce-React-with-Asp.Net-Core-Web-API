import { z } from "zod";

const reviewSchema = z.object({
  review: z.string().min(2, { message: "Please, add your review" }),
  rating:z.number()
});

type TReviewType = z.infer<typeof reviewSchema>

export {reviewSchema,type  TReviewType}