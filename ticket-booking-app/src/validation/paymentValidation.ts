import { z } from "zod";

export const paymentValidationSchema = z.object({
  id: z.coerce.number().optional(),

});

// Default values for payment form

