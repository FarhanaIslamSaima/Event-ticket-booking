import { z } from "zod";

export const eventValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"), // could be ID as string
  venue: z.string().min(1, "Venue is required"),       // could be ID as string
  organizer: z.string().min(1, "Organizer is required"), // could be optional if set in backend
  event_date: z.string().min(1, "Event date is required"), // you may use z.coerce.date() if it's a JS Date
  end_date: z.string().min(1, "End date is required"),
  total_tickets: z.coerce.number().min(1, "Total tickets must be at least 1"),
  available_tickets: z.coerce.number().min(0, "Available tickets is required"),
  base_price: z.coerce.number().min(0, "Base price must be non-negative"),
  status: z.string().min(1, "Status is required"),
  image_url: z.string().url("Invalid image URL").optional().nullable(),
  terms_conditions: z.string().optional(),
});

export const defaultEventValues = {
  title: "",
  description: "",
  category: "",
  venue: "",
  organizer: "",
  event_date: "",
  end_date: "",
  total_tickets: 0,
  available_tickets: 0,
  base_price: 0,
  status: "",
  image_url: "",
  terms_conditions: "",
};