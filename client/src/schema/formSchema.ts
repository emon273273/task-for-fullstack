import { z } from "zod";
export const formSchema = z.object({
  images: z.array(z.string()).optional(),
  notes: z.string().optional(),
  privateNotes: z.string().optional(),
});

export type FormsData = z.infer<typeof formSchema>;
