import { z } from "zod";

export const eventValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category_id: z.number().min(1, "Category is required"), // ForeignKey ID as number
  venue_id: z.number().min(1, "Venue is required"),       // ForeignKey ID as number
  // ForeignKey ID as number
  event_date: z.coerce.date({ required_error: "Event date is required" }),
  end_date: z.coerce.date({ required_error: "End date is required" }),
  total_tickets: z.coerce.number().min(1, "Total tickets must be at least 1"),
  available_tickets: z.coerce.number().min(0, "Available tickets is required"),
  base_price: z.coerce.number().nonnegative("Base price must be non-negative"),
  status: z.string().min(1, "Status is required"),
   image: z
    .any()
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file format",
    })
    .optional(),
  terms_conditions: z.string().optional(),

});

