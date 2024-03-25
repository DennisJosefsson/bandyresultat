import { useState } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { SearchParamsObject } from '../../types/games/search'
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

type Props = {
  methods: UseFormReturn<SearchParamsObject>
  selectionArray: {
    value: number
    label: string
  }[]
  name: keyof SearchParamsObject
  label: string
}

export const SearchSelectComponent = ({
  methods,
  selectionArray,
  name,
  label,
}: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <FormField
        control={methods.control}
        name={name}
        render={({ field }) => (
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
                            (team) => team.value.toString() === field.value,
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
                      <CommandEmpty>Inget sådant lag.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-y-scroll bg-white">
                        {selectionArray.map((team) => (
                          <CommandItem
                            value={team.label}
                            key={team.value}
                            onSelect={() => {
                              methods.setValue(`${name}`, team.value.toString())
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
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value !== '' && (
                <CrossCircledIcon
                  onClick={() => {
                    methods.setValue(`${name}`, '')
                    setOpen(false)
                  }}
                  className="ml-2 h-4 w-4 shrink-0 opacity-50"
                />
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
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
