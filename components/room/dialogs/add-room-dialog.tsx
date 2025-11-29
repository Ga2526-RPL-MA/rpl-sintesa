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
import Room from '@/src/domain/entities/Room';

interface AddRoomDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: () => void;
}

export default function AddRoomDialog({
    open,
    onOpenChange,
    onAdd,
}: AddRoomDialogProps) {
    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState('')
    // if description can be changed
    const [isAdding, setIsAdding] = useState(false);

    function isInputsValid(){
        if (!name){
            toast.error('Name cannot be empty!');
            return false
        }
        if (!capacity){
            toast.error('Capacity cannot be empty!');
            return
        }
        if (!capacity.match(/^[0-9]+$/)){
            toast.error('Capacity can only be digits/numbers!');
            return false
        }

        return true
    }

    async function handleAddRoom() {
        try {
            if (!isInputsValid()){
                return
            }
            setIsAdding(true);
            const response = await axios.post<Room>(
                '/api/rooms',
                {
                    name: name,
                    capacity: parseInt(capacity),
                },
                {withCredentials: true}
            );
            onAdd()
            onOpenChange(false)
            setIsAdding(false)
            toast.success('Successfully added room!')
            setCapacity('')
            setName('')
        } catch (err) {
            console.error(err);
            toast.error('Failed to add room');
        }
    }

    return (
        <Dialog open={open} onOpenChange={(value) => {
            onOpenChange(value);
            if (!value) {
                setCapacity('')
                setName('')
            }
        }}>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Add Room
                    </DialogTitle>
                    <DialogDescription>
                        You can add a new room by filling in the form below.
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
                        placeholder='IF-101'
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input 
                        id="capacity" 
                        name="capacity"
                        value={capacity}
                        maxLength={2}
                        onChange={(e) => setCapacity(e.target.value.replace(/\D/g, ''))}
                        placeholder='60'
                        />
                    </div>
                </div>
                <Button 
                className='mt-2'
                onClick={handleAddRoom}
                disabled={isAdding}
                >
                   {isAdding ? (
                        <>
                        <Spinner />
                        Adding...
                        </>
                    ): (
                        'Add'
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
