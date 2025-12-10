'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import Course from '@/src/domain/entities/Course';
import TruncatedText from '../truncated-tooltip-text';
import Room from '@/src/domain/entities/Room';

interface RoomCardProps {
    item?: Room; // Make it optional
    className?: string;
    onDelete: (id: number) => void;
    onEdit: (room: Room) => void;
    onDetails?: (room: Room) => void;
}

function RoomCard({
    item,
    className,
    onDelete,
    onEdit,
    onDetails,
}: RoomCardProps) {
    const courseData = item;
    if (!courseData) return;

    return (
        <>
            <Card
                className={cn(
                    className,
                    'hover:bg-card/50 grid grid-cols-[1fr_0.15fr]',
                )}
                variant={'theme'}
                // onClick={() => handleLecturerDetail()}
            >
                <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    {/* Can display room's location here  */}
                    <div className="mt-2 flex gap-2">
                        {item.capacity && (
                            <Badge className="w-fit">
                                {item.capacity} People
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-full w-full cursor-pointer rounded-none rounded-tr-md rounded-br-md"
                                onFocus={(e) => e.preventDefault()}
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* Enable if detail dialog is needed */}
                            {/* <DropdownMenuItem
                    onClick={() => {onDetails && onDetails(item)}}
                    >
                        Details
                    </DropdownMenuItem> */}
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(item.id)}
                                variant={'destructive'}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Card>
        </>
    );
}

export default RoomCard;
