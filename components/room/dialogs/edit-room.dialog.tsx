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
import { Spinner } from '@/components/ui/spinner';
import Room from '@/src/domain/entities/Room';

interface EditRoomDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    item?: Room | null // Use 'item' instead of 'Room'
    onEdit: () => void
}


export default function EditRoomDialog({
    item,
    open,
    onOpenChange,
    onEdit,
}: EditRoomDialogProps) {
    const original = useRef<Room>(null);
    const [name, setName] = useState('')
    // if capacity can be changed
    const [capacity, setcapacity] = useState('')
    const [isEditing, setIsEditing] = useState(false)

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

    function hasChanges() {
        const oc = original.current
        if (!oc){
            return false
        }

        return (
            oc.name !== name ||
            oc.capacity.toString() !== capacity
        )
    }

    async function handleEditRoom() {
        try {
            if (!isInputsValid()){
                return
            }
            setIsEditing(true);
            const response = await axios.put<Room>(
                `/api/rooms?id=${item?.id}`,
                { 
                    name: name,
                    capacity: parseInt(capacity),
                 },
                {withCredentials: true}
            );
            onEdit()
            onOpenChange(false)
            setIsEditing(false)
            toast.success('Successfully edited room!')
            setcapacity('')
            setName('')
            setcapacity('')
        } catch (err) {
            console.error(err);
            toast.error('Failed to edit room');
        }
    }
    useEffect(() => {
        if (open && item) {
            original.current = item
            setName(item.name)
            setcapacity(item.capacity.toString())
        }
    }, [open, item])
    return (
        <Dialog open={open} onOpenChange={(value) => {
            onOpenChange(value);
            if (!value) {
                setName('')
                setcapacity('')
            }
        }}>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Edit Room
                    </DialogTitle>
                    <DialogDescription>
                        You can edit the room by changing the form below.
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
                        onChange={(e) => setcapacity(e.target.value.replace(/\D/g, ''))}
                        placeholder='60'
                        />
                    </div>
                    <DialogDescription>
                        Note: Editing a room will result in changes in schedules that has this room!
                    </DialogDescription>
                </div>
                <Button 
                className='mt-2'
                onClick={handleEditRoom}
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
