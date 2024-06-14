"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormValues, formSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import IncomeSection from "./IncomeSection";
import IncomeTypeSection from "./IncomeTypeSection";
import ResidencySection from "./ResidencySection";

export function TaxForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 10000,
      deductions: 0,
      period: "2024",
      portugalResidency: true,
      nhrStatus: false,
      region: "continental",
      haveChildren: false,
      numberOfChildren: 1,
      childrenAge: [],
      incomeCategory: "A",
      nonPortugueseCompany: false,
      atividadeOpenDate: new Date(),
      typeOfAtividade: "services",
    },
    mode: "onChange",
  });

  const { formState, watch, handleSubmit } = form;
  const portugalResidency = watch("portugalResidency");
  const haveChildren = watch("haveChildren");
  const incomeCategory = watch("incomeCategory");
  const nonPortugueseCompany = watch("nonPortugueseCompany");
  const numberOfChildren = watch("numberOfChildren");

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Card className="row-span-3">
      <CardHeader>
        <CardTitle>Simulate your taxes</CardTitle>
        <CardDescription>Enter data below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <IncomeSection
              control={form.control}
              portugalResidency={portugalResidency}
              nonPortugueseCompany={nonPortugueseCompany}
            />
            <ResidencySection
              control={form.control}
              portugalResidency={portugalResidency}
              haveChildren={haveChildren}
              numberOfChildren={numberOfChildren}
            />
            <IncomeTypeSection
              control={form.control}
              incomeCategory={incomeCategory}
              nonPortugueseCompany={nonPortugueseCompany}
            />
            <Button
              type="submit"
              disabled={!formState.isValid}
              className="w-full"
            >
              Calculate
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
