'use client';
import { useEffect, useRef } from 'react';
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
import { Spinner } from '@/components/ui/spinner';

interface EditLecturerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item?: Lecturer | null; // Use 'item' instead of 'lecturer'
    onEdit: () => void;
}

export default function EditLecturerDialog({
    item,
    open,
    onOpenChange,
    onEdit,
}: EditLecturerDialogProps) {
    const original = useRef<Lecturer | null>(null);
    const [name, setName] = useState('');
    const [nip, setNip] = useState('');
    const [code, setCode] = useState('');
    const [expertise, setExpertise] = useState('');
    // if faculty can be changed
    const [faculty, setFaculty] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    function isInputsValid() {
        if (!name) {
            toast.error('Name cannot be empty!');
            return false;
        }
        if (!nip) {
            toast.error('NIP cannot be empty!');
            return;
        }
        if (!nip.match(/^[0-9]+$/)) {
            toast.error('NIP can only be digits/numbers!');
            return false;
        }
        if (!code) {
            toast.error('Code cannot be empty!');
            return false;
        }
        if (!faculty) {
            toast.error('Faculty cannot be empty!');
            return false;
        }

        return true;
    }

    function hasChanges() {
        const oc = original.current;
        if (!oc) {
            return false;
        }

        return (
            oc.name !== name ||
            oc.nip !== nip ||
            oc.faculty !== faculty ||
            oc.code !== code ||
            oc.expertise !== expertise
        );
    }

    async function handleEditLecturer() {
        try {
            if (!isInputsValid()) {
                return;
            }
            setIsEditing(true);
            const response = await axios.put<Lecturer>(
                `/api/lecturers?id=${item?.id}`,
                {
                    nip: nip,
                    name: name,
                    faculty: faculty,
                    code: code,
                    expertise: expertise,
                },
                { withCredentials: true },
            );
            onEdit();
            onOpenChange(false);
            setIsEditing(false);
            toast.success('Successfully edited lecturer!');
            setNip('');
            setName('');
            setFaculty('');
            setCode('');
            setExpertise('');
        } catch (err) {
            console.error(err);
            toast.error('Failed to edit lecturer');
        }
    }

    useEffect(() => {
        if (item && open) {
            original.current = item;

            setName(item.name);
            setNip(item.nip);
            setCode(item.code);
            setFaculty(item.faculty);
            setExpertise(item.expertise || '');
        }
    }, [open, item]);
    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
                if (!value) {
                    setNip('');
                    setName('');
                    setFaculty('');
                    setCode('');
                    setExpertise('');
                }
            }}
        >
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Edit Lecturer
                    </DialogTitle>
                    <DialogDescription>
                        You can edit the lecturer by changing the form below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Andi Yanto"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="nip">NIP</Label>
                        <Input
                            id="nip"
                            name="nip"
                            value={nip}
                            maxLength={10}
                            onChange={(e) =>
                                setNip(e.target.value.replace(/\D/g, ''))
                            }
                            placeholder=" 50000XXXXX"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="code">Code</Label>
                        <Input
                            id="code"
                            name="code"
                            maxLength={2}
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value.toUpperCase())
                            }
                            placeholder="AY"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="faculty">Faculty</Label>
                        <Input
                            id="faculty"
                            name="faculty"
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value.trim())}
                            placeholder="FTEIC"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="expertise">Expertise</Label>
                        <Input
                            id="expertise"
                            name="expertise"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            placeholder="Automata"
                        />
                    </div>
                </div>
                <Button
                    className="mt-2"
                    onClick={handleEditLecturer}
                    disabled={!hasChanges() || isEditing}
                >
                    {isEditing ? (
                        <>
                            <Spinner />
                            Confirming...
                        </>
                    ) : (
                        'Confirm'
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
