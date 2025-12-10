'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '../../ui/separator';
import { use, useState } from 'react';
import { toast } from 'sonner';
import Lecturer from '@/src/domain/entities/Lecturer';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Course from '@/src/domain/entities/Course';
import {
    CalendarFold,
    ClipboardList,
    Clock12,
    MapPin,
    User,
} from 'lucide-react';
('@/src/domain/entities');

interface DetaiDialogProps {
    item?: Course | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DetaiDialog({
    item,
    open,
    onOpenChange,
}: DetaiDialogProps) {
    const courseData = item;
    if (!courseData) {
        return;
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-primary">
                            {item.name}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Course details dialog
                        </DialogDescription>
                        {item.code && (
                            <h1 className="text-primary">{item.code}</h1>
                        )}
                    </div>
                    <Separator />
                </DialogHeader>
                <div className="space-y-3 p-1 text-sm">
                    {item.semester && (
                        <div className="flex items-start gap-2">
                            <MapPin className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Room:</h1>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    )}
                    {item.semester && (
                        <div className="flex items-start gap-2">
                            <User className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Lecturer:</h1>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    )}
                    {item.sks && (
                        <div className="flex items-start gap-2">
                            <ClipboardList className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">SKS:</h1>
                                <p>{item.sks}</p>
                            </div>
                        </div>
                    )}
                    {item.name && (
                        <div className="flex items-start gap-2">
                            <CalendarFold className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Day:</h1>
                                <p>{item.sks}</p>
                            </div>
                        </div>
                    )}
                    {item.description && (
                        <div className="flex items-start gap-2">
                            <Clock12 className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Start Time:</h1>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
