import { FieldValues, UseFormReturn, Path } from 'react-hook-form'
import {
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
  FormItem,
} from '@/src/@/components/ui/form'
import { Checkbox } from '@/src/@/components/ui/checkbox'
import { cn } from '@/src/@/lib/utils'

type CheckboxArray = { value: string | number; label: string }[]

interface CheckboxComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  description: string
  name: TName
  checkboxArray: CheckboxArray
  label: string
  className?: string
}

export const CheckboxComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  name,
  description,
  checkboxArray,
  label,
  className,
}: CheckboxComponentProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={methods.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-sm md:text-base">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <div
            className={cn(
              'grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-16',
              className,
            )}
          >
            {checkboxArray.map((item) => (
              <FormField
                key={item.value}
                control={methods.control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.value])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item.value,
                                  ),
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
