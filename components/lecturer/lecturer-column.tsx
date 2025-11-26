'use client'

import { ColumnDef } from '@tanstack/react-table'
import Lecturer from '@/src/domain/entities/Lecturer'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '../ui/badge'


export const LecturerColumns = (
    onDelete: (id: number) => void,
    onEdit: (lecturer: Lecturer) => void,
): ColumnDef<Lecturer>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                    <Button
                    variant="ghost"
                    className='px-1 active:scale-100 hover:scale-105 transition-transform'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                    <ArrowUpDown className="h-4" />
                    </Button>
                )
            },
    },
    {
        accessorKey: "code",
        header: "Code"
    },
    {
        accessorKey: "nip",
        header: ({ column }) => {
            return (
                    <Button
                    variant="ghost"
                    className='px-1 active:scale-100 hover:scale-105 transition-transform'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        NIP
                    <ArrowUpDown className="h-4" />
                    </Button>
                )
            },
    },
    {
      accessorKey: "faculty",
      header: "Faculty"
    },
    {
        accessorKey: "expertise",
        header: "Expertise",
        cell: ({ row }) => {
            return (
                row.getValue('expertise') ? (
                <Badge>
                    {row.getValue('expertise')}
                </Badge>
                ):(
                    'N/A'
                )
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // Get original lecturer object
            const lecturer = row.original;
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
                    onClick={() => onEdit(lecturer)}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                    onClick={() => onDelete(lecturer.id)}
                    variant={'destructive'}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
