"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

const formSchema = z.object({
  income: z.coerce.number().positive(),
  period: z.enum(["2022", "2023", "2024"]),
  portugalResidency: z.boolean(),
  nhrStatus: z.boolean(),
  region: z.enum(["continental", "madeira", "azores"]),
  haveChildren: z.boolean(),
  numberOfChildren: z.coerce.number().positive().min(1).max(10),
});

export function TaxForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 1000,
      period: "2024",
      portugalResidency: false,
      nhrStatus: false,
      region: "continental",
      haveChildren: false,
      numberOfChildren: 1,
    },
    mode: "onChange",
  });

  const { formState } = form;

  const portugalResidency = form.watch("portugalResidency");
  const haveChildren = form.watch("haveChildren");

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
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Select>
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
            <Separator />
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
                          <Select>
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
                  )}
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
