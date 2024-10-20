import { z } from "@/lib/zod";

const orgCreateForm = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  week_days: z.array(z.number()),
  start_time: z.string().min(1),
  end_time: z.string().min(1),
});

export type OrgCreateDTO = z.infer<typeof orgCreateForm>;
export default orgCreateForm;
