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
import { use, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import Course from '@/src/domain/entities/Course';
import { Spinner } from '@/components/ui/spinner';

interface EditCourseDialog {
    open: boolean
    onOpenChange: (open: boolean) => void
    item?: Course | null // Use 'item' instead of 'Course'
    onEdit: () => void
}
// code: string,
//     public name: string,
//     public sks: number,
//     public description: string,
//     public semester: number,

export default function EditCourseDialog({
    item,
    open,
    onOpenChange,
    onEdit,
}: EditCourseDialog) {
    const original = useRef<Course>(null);
    const [name, setName] = useState('')
    const [sks, setSks] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    // if semester can be changed
    const [semester, setSemester] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    function isInputsValid(){
        if (!name){
            toast.error('Name cannot be empty!');
            return false
        }
        if (!sks){
            toast.error('SKS cannot be empty!');
            return
        }
        if (!sks.match(/^[0-9]+$/)){
            toast.error('SKS can only be digits/numbers!');
            return false
        }
        if (!code){
            toast.error('Code cannot be empty!')
            return false
        }
        if (!semester){
            toast.error('Semester cannot be empty!')
            return false
        }

        return true
    }

    function hasChanges() {
        const oc = original.current
        if (!oc){
            return false
        }

        return (
            oc.name !== name ||
            oc.code !== code ||
            oc.semester.toString() !== semester ||
            oc.sks.toString() !== sks ||
            oc.description !== description
        )
    }

    async function handleEditCourse() {
        try {
            if (!isInputsValid()){
                return
            }
            setIsEditing(true);
            const response = await axios.put<Course>(
                `/api/courses?id=${item?.id}`,
                { 
                    sks: parseInt(sks),
                    name: name,
                    semester: parseInt(semester),
                    code: code,
                    description: description,
                 },
                {withCredentials: true}
            );
            onEdit()
            onOpenChange(false)
            setIsEditing(false)
            toast.success('Successfully edited course!')
            setSks('')
            setName('')
            setSemester('')
            setCode('')
            setDescription('')
        } catch (err) {
            console.error(err);
            toast.error('Failed to edit course');
        }
    }
    useEffect(() => {
        if (open && item) {
            original.current = item
            setName(item.name)
            setSks(item.sks.toString())
            setCode(item.code)
            setSemester(item.semester.toString())
            setDescription(item.description || '')
        }
    }, [open, item])
    return (
        <Dialog open={open} onOpenChange={(value) => {
            onOpenChange(value);
            if (!value) {
                setName('')
                setSks('')
                setCode('')
                setSemester('')
                setDescription('')
            }
        }}>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Edit Course
                    </DialogTitle>
                    <DialogDescription>
                        You can edit the course by changing the form below.
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
                        placeholder='Object Oriented Programming'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="code">Code</Label>
                        <Input 
                        id="code" 
                        name="code"
                        maxLength={8}
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder='ER234510'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sks">SKS</Label>
                        <Input 
                        id="sks" 
                        name="sks"
                        value={sks}
                        maxLength={1}
                        onChange={(e) => setSks(e.target.value.replace(/\D/g, ''))}
                        placeholder='3'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="semester">Semester</Label>
                        <Input 
                        id="semester" 
                        name="semester"
                        value={semester}
                        maxLength={1}
                        onChange={(e) => setSemester(e.target.value.replace(/\D/g, ''))}
                        placeholder='2'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Teaches the object-oriented programming paradigm using languages such as Java'
                        />
                    </div>
                    <DialogDescription>
                        Note: Editing a course will result in changes in schedules that has this course!
                    </DialogDescription>
                </div>
                <Button 
                className='mt-2'
                onClick={handleEditCourse}
                disabled={!hasChanges() || isEditing}
                >
                    {isEditing ? (
                        <>
                        <Spinner />
                        Confirming...
                        </>
                    ): (
                        'Confirm'
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
