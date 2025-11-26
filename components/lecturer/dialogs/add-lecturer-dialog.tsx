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

interface AddLecturerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: () => void;
}

export default function AddLecturerDialog({
    open,
    onOpenChange,
    onAdd,
}: AddLecturerDialogProps) {
    const [name, setName] = useState('')
    const [nip, setNip] = useState('')
    const [code, setCode] = useState('')
    const [expertise, setExpertise] = useState('')
    // if faculty can be changed
    const [faculty, setFaculty] = useState('')

    function isInputsValid(){
        if (!name){
            toast.error('Name cannot be empty!');
            return false
        }
        if (!nip){
            toast.error('NIP cannot be empty!');
            return
        }
        if (!nip.match(/^[0-9]+$/)){
            toast.error('NIP can only be digits/numbers!');
            return false
        }
        if (!code){
            toast.error('Code cannot be empty!')
            return false
        }
        if (!faculty){
            toast.error('Faculty cannot be empty!')
            return false
        }

        return true
    }

    async function handleAddLecturer() {
        try {
            if (!isInputsValid()){
                return
            }

            const response = await axios.post<Lecturer>(
                '/api/lecturers',
                { 
                    nip: nip,
                    name: name,
                    faculty: faculty,
                    code: code,
                    expertise: expertise,
                 },
                {withCredentials: true}
            );
            onAdd()
            onOpenChange(false)
            toast.success('Successfully added lecturer!')
            setNip('')
            setName('')
            setFaculty('')
            setCode('')
            setExpertise('')
        } catch (err) {
            console.error(err);
            toast.error('Failed to add lecturer');
        }
    }

    return (
        <Dialog open={open} onOpenChange={(value) => {
            onOpenChange(value);
            if (!value) {
                setNip('')
                setName('')
                setFaculty('')
                setCode('')
                setExpertise('')
            }
        }}>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Add lecturer
                    </DialogTitle>
                    <DialogDescription>
                        You can add a new lecturer by filling in the form below.
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
                        placeholder='Andi Yanto'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="nip">NIP</Label>
                        <Input 
                        id="nip" 
                        name="nip"
                        value={nip}
                        maxLength={10}
                        onChange={(e) => setNip(e.target.value.replace(/\D/g, ''))}
                        placeholder=' 50000XXXXX'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="code">Code</Label>
                        <Input 
                        id="code" 
                        name="code"
                        maxLength={2}
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder='AY'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="faculty">Faculty</Label>
                        <Input 
                        id="faculty" 
                        name="faculty"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value.trim())}
                        placeholder='FTEIC'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="expertise">Expertise</Label>
                        <Input 
                        id="expertise" 
                        name="expertise"
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        placeholder='Automata'
                        />
                    </div>
                </div>
                <Button 
                className='mt-2'
                onClick={handleAddLecturer}
                >
                    Add
                </Button>
            </DialogContent>
        </Dialog>
    );
}
