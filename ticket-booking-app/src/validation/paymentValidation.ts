import { z } from "zod";

export const paymentValidationSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

// Default values for payment form

