'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Room from '@/src/domain/entities/Room'
 
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


export const RoomColumns = (
    onDelete: (id: number) => void,
    onEdit: (Room: Room) => void,
): ColumnDef<Room>[] => [
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
        accessorKey: "capacity",
        header: ({ column }) => {
            return (
                    <Button
                    variant="ghost"
                    className='px-1 active:scale-100 hover:scale-105 transition-transform'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Capacity
                    <ArrowUpDown className="h-4" />
                    </Button>
                )
            },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // Get original Room object
            const room = row.original;
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
                    onClick={() => onEdit(room)}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                    onClick={() => onDelete(room.id)}
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
