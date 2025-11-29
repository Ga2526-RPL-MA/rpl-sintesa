'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';
import Course from '@/src/domain/entities/Course';

export const CourseColumn = (
    onDelete: (id: number) => void,
    onEdit: (course: Course) => void,
    onDetails?: (course: Course) => void,
): ColumnDef<Course>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-1 transition-transform hover:scale-105 active:scale-100"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <ArrowUpDown className="h-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'sks',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-1 transition-transform hover:scale-105 active:scale-100"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    SKS
                    <ArrowUpDown className="h-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'semester',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-1 transition-transform hover:scale-105 active:scale-100"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Semester
                    <ArrowUpDown className="h-4" />
                </Button>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            // Get original course object
            const course = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                onDetails && onDetails(course);
                            }}
                        >
                            Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(course)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete(course.id)}
                            variant={'destructive'}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
