import {
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
import { FormValues } from "@/lib/types";
import { Control } from "react-hook-form";

interface ResidencySectionProps {
  control: Control<FormValues>;
  portugalResidency: boolean;
  haveChildren: boolean;
  numberOfChildren: number;
}

const ResidencySection = ({
  control,
  portugalResidency,
  haveChildren,
  numberOfChildren,
}: ResidencySectionProps) => (
  <div className="space-y-4">
    <h1 className="font-semibold">Residency</h1>
    <FormField
      control={control}
      name="portugalResidency"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel>
              I am a tax resident of Portugal for selected period
            </FormLabel>
            <FormDescription>Or planning to become one</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {portugalResidency && (
      <>
        <FormField
          control={control}
          name="nhrStatus"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>I have NHR status for selected period</FormLabel>
                <FormDescription>
                  And is your job eligible for “high value-added activity”?
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
          control={control}
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
                    <SelectItem value="continental">Continental</SelectItem>
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
          control={control}
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
              control={control}
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
            {Array.from({ length: numberOfChildren || 0 }).map((_, index) => (
              <FormField
                key={`child-age-${index}`}
                control={control}
                name={`childrenAge.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Child {index + 1} age</FormLabel>
                      <FormControl className="max-w-32">
                        <Input type="number" min={1} max={18} {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </>
        )}
      </>
    )}
  </div>
);

export default ResidencySection;
