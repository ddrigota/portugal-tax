import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormValues } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";

interface IncomeTypeSectionProps {
  control: Control<FormValues>;
  incomeCategory: string;
  nonPortugueseCompany: boolean;
}

const IncomeTypeSection = ({
  control,
  incomeCategory,
  nonPortugueseCompany,
}: IncomeTypeSectionProps) => (
  <div className="space-y-4">
    <h1 className="font-semibold">Income type</h1>
    <FormField
      control={control}
      name="incomeCategory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Income category</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Dependant worker (employment)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Dependant worker (employment)</SelectItem>
                <SelectItem value="B">
                  Self-employed (trabalhador independente)
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {incomeCategory === "A" ? (
      <FormField
        control={control}
        name="nonPortugueseCompany"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>I work for a foreign company</FormLabel>
              <FormDescription>Not registered in Portugal</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ) : null}
    {incomeCategory === "B" && (
      <>
        <FormField
          control={control}
          name="atividadeOpenDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of opening your Atividade</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="h-[350px] w-auto p-0" align="start">
                  <Calendar
                    fromYear={1980}
                    toYear={new Date().getFullYear()}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="typeOfAtividade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of your activity</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a type of your activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="goods">
                      I sell goods (products)
                    </SelectItem>
                    <SelectItem value="services">I provide services</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    )}
  </div>
);

export default IncomeTypeSection;
