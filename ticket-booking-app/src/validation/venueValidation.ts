import { z } from "zod";

export const venueValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required").max(100, "City too long"),
  state: z.string().min(1, "State is required").max(100, "State too long"),
  country: z.string().min(1, "Country is required").max(100, "Country too long"),
  capacity: z.coerce.number().int().positive("Capacity must be positive"),
  contact_phone: z
    .string()
    .min(10, "Phone number is too short")
    .max(20, "Phone number too long"),
  contact_email: z.string().email("Invalid email address"),
  is_active: z.boolean().default(true),
});

export const defaultVenueValues = {
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  capacity: 0,
  contact_phone: "",
  contact_email: "",
  is_active: true,
};
