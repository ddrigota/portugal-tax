"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const formSchema = z
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
    nonPortugueseCompany: z.boolean().optional(),
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

export function TaxForm() {
  const form = useForm<z.infer<typeof formSchema>>({
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulate your taxes</CardTitle>
        <CardDescription>Enter data below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
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
                  control={form.control}
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
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
            <div className="space-y-4">
              <h1 className="font-semibold">Residency</h1>
              <FormField
                control={form.control}
                name="portugalResidency"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>
                        I am a tax resident of Portugal for selected period
                      </FormLabel>
                      <FormDescription>
                        Or planning to become one
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {portugalResidency && (
                <>
                  <FormField
                    control={form.control}
                    name="nhrStatus"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>
                            I have NHR status for selected period
                          </FormLabel>
                          <FormDescription>
                            And is your job eligible for “high value-added
                            activity”?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Continental" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="continental">
                                Continental
                              </SelectItem>
                              <SelectItem value="madeira">Madeira</SelectItem>
                              <SelectItem value="azores">Azores</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="haveChildren"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>I have children</FormLabel>
                          <FormDescription>Below 18 years old</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {haveChildren && (
                    <>
                      <FormField
                        control={form.control}
                        name="numberOfChildren"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Number of children: {value}</FormLabel>
                            <FormControl>
                              <Slider
                                min={1}
                                max={10}
                                step={1}
                                onValueChange={onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {Array.from({ length: numberOfChildren || 0 }).map(
                        (_, index) => (
                          <FormField
                            key={`child-age-${index}`}
                            control={form.control}
                            name={`childrenAge.${index}`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center justify-between">
                                  <FormLabel>Child {index + 1} age</FormLabel>
                                  <FormControl className="max-w-32">
                                    <Input
                                      type="number"
                                      min={1}
                                      max={18}
                                      {...field}
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ),
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="space-y-4">
              <h1 className="font-semibold">Income type</h1>
              <FormField
                control={form.control}
                name="incomeCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Dependant worker (employment)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">
                            Dependant worker (employment)
                          </SelectItem>
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
                  control={form.control}
                  name="nonPortugueseCompany"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>I work for a foreign company</FormLabel>
                        <FormDescription>
                          Not registred in Portugal
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
              {incomeCategory === "B" && (
                <>
                  <FormField
                    control={form.control}
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
                          <PopoverContent
                            className="h-[350px] w-auto p-0"
                            align="start"
                          >
                            <Calendar
                              fromYear={1980}
                              toYear={new Date().getFullYear()}
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
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
                              <SelectItem value="services">
                                I provide services
                              </SelectItem>
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
