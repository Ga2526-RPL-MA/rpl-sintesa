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
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Course from '@/src/domain/entities/Course';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';

interface AddCourseDialog {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: () => void;
}

export default function AddCourseDialog({
    open,
    onOpenChange,
    onAdd,
}: AddCourseDialog) {
    const [name, setName] = useState('');
    const [sks, setSks] = useState('');
    const [code, setCode] = useState('');
    const [semester, setSemester] = useState('');
    // if description can be changed
    const [description, setDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    function isInputsValid() {
        if (!name) {
            toast.error('Name cannot be empty!');
            return false;
        }
        if (!sks) {
            toast.error('SKS cannot be empty!');
            return;
        }
        if (!sks.match(/^[0-9]+$/)) {
            toast.error('SKS can only be digits/numbers!');
            return false;
        }
        if (!code) {
            toast.error('Code cannot be empty!');
            return false;
        }
        if (!semester) {
            toast.error('Semester cannot be empty!');
            return false;
        }

        return true;
    }

    async function handleAddCourse() {
        try {
            if (!isInputsValid()) {
                return;
            }
            setIsAdding(true);
            const response = await axios.post<Course>(
                '/api/courses',
                {
                    sks: parseInt(sks),
                    name: name,
                    semester: parseInt(semester),
                    code: code,
                    description: description,
                },
                { withCredentials: true },
            );
            onAdd();
            onOpenChange(false);
            setIsAdding(false);
            toast.success('Successfully added course!');
            setSks('');
            setName('');
            setDescription('');
            setCode('');
            setSemester('');
        } catch (err) {
            console.error(err);
            toast.error('Failed to add course');
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
                if (!value) {
                    setSks('');
                    setName('');
                    setDescription('');
                    setCode('');
                    setSemester('');
                }
            }}
        >
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Add Course
                    </DialogTitle>
                    <DialogDescription>
                        You can add a new course by filling in the form below.
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
                            placeholder="Object Oriented Programming"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="code">Code</Label>
                        <Input
                            id="code"
                            name="code"
                            maxLength={8}
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value.toUpperCase())
                            }
                            placeholder="ER234510"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sks">SKS</Label>
                        <Input
                            id="sks"
                            name="sks"
                            value={sks}
                            maxLength={1}
                            onChange={(e) =>
                                setSks(e.target.value.replace(/\D/g, ''))
                            }
                            placeholder="3"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="semester">Semester</Label>
                        <Input
                            id="semester"
                            name="semester"
                            value={semester}
                            maxLength={1}
                            onChange={(e) =>
                                setSemester(e.target.value.replace(/\D/g, ''))
                            }
                            placeholder="2"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Teaches the object-oriented programming paradigm using languages such as Java"
                        />
                    </div>
                </div>
                <Button
                    className="mt-2"
                    onClick={handleAddCourse}
                    disabled={isAdding}
                >
                    {isAdding ? (
                        <>
                            <Spinner />
                            Adding...
                        </>
                    ) : (
                        'Add'
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
