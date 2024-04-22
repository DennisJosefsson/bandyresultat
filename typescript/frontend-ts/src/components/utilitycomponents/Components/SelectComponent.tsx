import { useState } from 'react'
import { FieldValues, Path, UseFormReturn, PathValue } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/src/@/components/ui/form'
import { Button } from '@/src/@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/src/@/components/ui/popover'
import {
  CaretSortIcon,
  CheckIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons'
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@/src/@/components/ui/command'
import { cn } from '@/src/@/lib/utils'
import { ScrollArea, ScrollBar } from '@/src/@/components/ui/scroll-area'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/src/@/components/ui/select'

interface SearchSelectComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  selectionArray: {
    value: number
    label: string
  }[]
  name: TName
  label: string
}

export const SearchSelectComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  selectionArray,
  name,
  label,
}: SearchSelectComponentProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <FormField
        control={methods.control}
        name={name}
        render={({ field }) => {
          console.log('logging from select component', field.value.value)
          return (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm md:text-base">{label}</FormLabel>
              <div className="flex flex-row items-center gap-1">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[240px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? selectionArray.find(
                              (team) => team.value === field.value.value,
                            )?.label
                          : 'Lag'}

                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[240px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Sök"
                        className="h-8 w-[240px] p-1"
                      />
                      <ScrollArea>
                        <CommandList>
                          <CommandEmpty>Inget sådant lag.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-y-scroll bg-background">
                            {selectionArray.map((team) => (
                              <CommandItem
                                value={team.label}
                                key={team.value}
                                onSelect={() => {
                                  methods.setValue(
                                    `${name}.value` as TName,
                                    team.value as PathValue<
                                      TFieldValues,
                                      TName
                                    >,
                                  )
                                  methods.setValue(
                                    `${name}.label` as TName,
                                    team.label as PathValue<
                                      TFieldValues,
                                      TName
                                    >,
                                  )
                                  setOpen(false)
                                }}
                              >
                                {team.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    team.value.toString() === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                {field.value !== '' && (
                  <CrossCircledIcon
                    onClick={() => {
                      methods.setValue(
                        name,
                        '' as PathValue<TFieldValues, Path<TFieldValues>>,
                      )
                      setOpen(false)
                    }}
                    className="ml-2 h-4 w-4 shrink-0 opacity-50"
                  />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}

interface SelectComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  selectionArray: {
    value: number | string
    label: string
  }[]
  placeholder: string
  label: string
  name: TName
}

export const SelectComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  methods,
  selectionArray,
  placeholder,
  label,
}: SelectComponentProps<TFieldValues, TName>) => {
  return (
    <>
      <FormField
        control={methods.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-[200px] md:w-[232px]">
            <FormLabel className="text-sm md:text-base">{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="ml-px">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectionArray.map((item) => {
                  return (
                    <SelectItem
                      key={`${String(name)}-${item.value}`}
                      value={
                        typeof item.value === 'string'
                          ? item.value
                          : item.value.toString()
                      }
                    >
                      {item.label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
