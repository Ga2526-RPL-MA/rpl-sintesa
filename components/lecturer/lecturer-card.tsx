'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import Lecturer from '@/src/domain/entities/Lecturer';
import { cn } from '@/lib/utils';
import LecturerDetailDialog from './dialogs/lecturer-detail-dialog';
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

interface LecturerCardProps {
    item?: Lecturer; // Make it optional
    lecturer?: Lecturer; // For backward compatibility
    className?: string;
    onDelete: (id: number) => void;
    onEdit: (lecturer: Lecturer) => void;
}

function LecturerCard({
    item,
    className,
    onDelete,
    onEdit,
}: LecturerCardProps) {
    const [detailOpen, setDetailOpen] = useState(false);

    function handleLecturerDetail() {
        setDetailOpen(true);
    }

    const lecturerData = item;
    if (!lecturerData) return;

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
                    <CardDescription>
                        {item.code} / {item.nip} <br />
                        {item.faculty}
                    </CardDescription>
                    {item.expertise && (
                        <Badge className="w-fit">{item.expertise}</Badge>
                    )}
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
            <LecturerDetailDialog
                open={detailOpen}
                onOpenChange={setDetailOpen}
                lecturer={item}
            />
        </>
    );
}

export default LecturerCard;
