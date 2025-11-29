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
import DetailCourseDialog from './dialogs/detail-course-dialog';
import TruncatedText from '../truncated-tooltip-text';

interface CourseCardProps {
    item?: Course; // Make it optional
    className?: string;
    onDelete: (id: number) => void;
    onEdit: (course: Course) => void;
    onDetails?: (course: Course) => void;
}

function CoursesCard({
    item,
    className,
    onDelete,
    onEdit,
    onDetails,
}: CourseCardProps) {
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
                    <CardDescription>
                        {item.code}
                        <br />
                        <div className="my-2">
                            <TruncatedText
                                text={
                                    item.description ? item.description : 'N/A'
                                }
                            />
                        </div>
                    </CardDescription>
                    <div className="mt-auto flex gap-2">
                        {item.semester && (
                            <Badge className="w-fit">
                                {item.semester == 1
                                    ? `${item.semester}st Semester`
                                    : item.semester == 2
                                      ? `${item.semester}nd Semester`
                                      : item.semester == 3
                                        ? `${item.semester}rd Semester`
                                        : `${item.semester}th Semester`}
                            </Badge>
                        )}
                        {item.sks && (
                            <Badge variant={'secondary'}>{item.sks} SKS</Badge>
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

export default CoursesCard;
