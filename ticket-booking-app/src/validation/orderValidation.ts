import { z } from "zod";

export const orderValidationSchema = z.object({
  event_id: z.coerce.number().min(1, "Select at least 1 ticket"),
  number_of_tickets: z.coerce.number().min(1, "Select at least 1 ticket"),
});
export const defaultOrderValues = {
  event_id: 1,
  number_of_tickets: 1,
};