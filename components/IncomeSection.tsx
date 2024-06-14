import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "@/lib/types";
import React from "react";
import { Control } from "react-hook-form";

interface IncomeSectionProps {
  control: Control<FormValues>;
  portugalResidency: boolean;
  nonPortugueseCompany: boolean;
}

const IncomeSection: React.FC<IncomeSectionProps> = ({
  control,
  portugalResidency,
  nonPortugueseCompany = false,
}) => (
  <div className="space-y-4">
    <FormField
      control={control}
      name="income"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Annual income in €</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {portugalResidency && !nonPortugueseCompany && (
      <FormField
        control={control}
        name="deductions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tax deductions in €</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )}
    <FormField
      control={control}
      name="period"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Period</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="2024" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default IncomeSection;
