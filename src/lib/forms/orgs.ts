import { z } from "zod";

const orgCreateForm = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

export type OrgCreateDTO = z.infer<typeof orgCreateForm>;
export default orgCreateForm;
