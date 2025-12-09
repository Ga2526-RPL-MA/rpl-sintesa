'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';

type ComboBoxProps<T> = {
    options: {
        value: string;
        label: string;
        data: T;
    }[];
    placeholder?: string;
    value?: T | null;
    onChange: (value: T | null) => void;
};

export function ComboBoxResponsive<T>({
    options,
    placeholder = 'Select option',
    value,
    onChange,
}: ComboBoxProps<T>) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = !useIsMobile();

    const selectedOption = options.find((opt) => opt.data === value);

    const ButtonLabel = selectedOption
        ? selectedOption.label
        : `${placeholder}`;

    const List = (
        <Command>
            <CommandInput placeholder={`Filter by...`} />
            <CommandList className="max-h-[200px] overflow-y-scroll">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {options.map((option) => (
                        <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={(val) => {
                                const found =
                                    options.find((opt) => opt.value === val) ||
                                    null;
                                onChange(found?.data ?? null);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-fit max-w-[25em] justify-start truncate"
                    >
                        {ButtonLabel}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    {List}
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTitle className="sr-only">title</DrawerTitle>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    className="w-fit max-w-[25em] justify-start truncate"
                >
                    {ButtonLabel}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">{List}</div>
            </DrawerContent>
        </Drawer>
    );
}
