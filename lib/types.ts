import { z } from "zod";

export const formSchema = z
  .object({
    income: z.coerce.number().positive(),
    deductions: z.coerce.number().nonnegative().optional(),
    period: z.enum(["2022", "2023", "2024"]),
    portugalResidency: z.boolean(),
    nhrStatus: z.boolean(),
    region: z.enum(["continental", "madeira", "azores"]),
    haveChildren: z.boolean(),
    numberOfChildren: z.coerce.number().nonnegative().min(0).max(10),
    childrenAge: z
      .array(z.coerce.number().positive().min(1).max(18))
      .optional(),
    incomeCategory: z.enum(["A", "B"]),
    nonPortugueseCompany: z.boolean(),
    atividadeOpenDate: z.date().optional(),
    typeOfAtividade: z.enum(["goods", "services"]).optional(),
  })
  .superRefine((data) => {
    if (!data.portugalResidency) {
      data.nhrStatus = false;
    }
    if (!data.haveChildren) {
      data.numberOfChildren = 0;
      data.childrenAge = [];
    }
    if (data.childrenAge && data.childrenAge.length > data.numberOfChildren) {
      data.childrenAge.length = data.numberOfChildren;
    }
    if (!data.portugalResidency) {
      data.deductions = 0;
    }
    if (data.incomeCategory === "A") {
      data.atividadeOpenDate = undefined;
      data.typeOfAtividade = undefined;
    }
    if (data.incomeCategory === "B") {
      data.nonPortugueseCompany = false;
    }
  });

export type FormValues = z.infer<typeof formSchema>;
