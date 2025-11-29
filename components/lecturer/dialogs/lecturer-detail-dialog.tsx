'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '../../ui/separator';
import {
    CalendarDays,
    CalendarFold,
    CalendarRange,
    Clock12,
    Clock3,
    IdCard,
    MapPin,
    User,
} from 'lucide-react';
import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import Lecturer from '@/src/domain/entities/Lecturer';
import { IconIdCardLanyard } from '@/components/custom-icons';

interface LecturerDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    lecturer: Lecturer;
}

export default function LecturerDetailDialog({
    open,
    onOpenChange,
    lecturer,
}: LecturerDetailDialogProps) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    if (!lecturer) return null;

    function handleDelete() {
        setOpenDeleteDialog(true);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <div>
                        <DialogTitle className="text-primary">
                            {lecturer.name}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Lecturer detail dialog
                        </DialogDescription>
                    </div>
                    <Separator />
                </DialogHeader>
                <div className="space-y-3 p-1 text-sm">
                    {lecturer.code && (
                        <div className="flex items-start gap-2">
                            <IconIdCardLanyard className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Code:</h1>
                                <p>{lecturer.code}</p>
                            </div>
                        </div>
                    )}
                    {lecturer.nip && (
                        <div className="flex items-start gap-2">
                            <IdCard className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">NIP:</h1>
                                <p>{lecturer.nip}</p>
                            </div>
                        </div>
                    )}
                    {lecturer.faculty && (
                        <div className="flex items-start gap-2">
                            <CalendarFold className="text-muted-foreground mt-1" />
                            <div>
                                <h1 className="font-bold">Faculty:</h1>
                                <p>{lecturer.faculty}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-start gap-2">
                        <CalendarFold className="text-muted-foreground mt-1" />
                        <div>
                            <h1 className="font-bold">Expertise:</h1>
                            <p>
                                {lecturer.expertise ? lecturer.expertise : '-'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 grid space-y-4">
                        <Button
                            // onClick={() => }
                            variant={'outline'}
                            className="w-full"
                        >
                            Edit
                        </Button>
                        <Button variant={'destructive'} onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
