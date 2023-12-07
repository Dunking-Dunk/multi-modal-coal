import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export function Combobox({ list, onChange, title, defaultValue }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  React.useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? list.find((data) => data.value === value)?.label
            : `Select ${title}...`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandEmpty>No {title} found.</CommandEmpty>
          <CommandGroup>
            {list.map((data) => {
              if (data) {
                return (
                  <CommandItem
                    key={data.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : data.value)
                      setOpen(false)
                    }}
                  >
                    {data.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === data.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              }

            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}