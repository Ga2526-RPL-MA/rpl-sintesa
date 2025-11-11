import { rooms as room } from '@/src/database/drizzle/schema';
import Room from '@/src/domain/entities/Room';
import RoomRepository from '@/src/domain/repositories/RoomRepository';
import { db } from '@/src/database';
import { eq } from 'drizzle-orm';

export default class RoomRepositoryImpl implements RoomRepository {
    async GetRooms(): Promise<Room[]> {
        const rooms = await db.select().from(room);
        return rooms.map((r) => ({
            id: Number(r.id),
            createdAt: new Date(r.createdAt),
            name: r.name || '',
            capacity: Number(r.capacity) || 0,
        }));
    }

    async GetRoomByID(id: number): Promise<Room> {
        const [result] = await db.select().from(room).where(eq(room.id, id));

        if (!result) throw new Error('Room not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            name: result.name || '',
            capacity: Number(result.capacity) || 0,
        };
    }

    async GetRoomByCode(code: string): Promise<Room> {
        const [result] = await db
            .select()
            .from(room)
            .where(eq(room.name, code));

        if (!result) throw new Error('Room not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            name: result.name || '',
            capacity: Number(result.capacity) || 0,
        };
    }

    async AddRoom(newRoom: Room): Promise<Room> {
        const [result] = await db
            .insert(room)
            .values({
                name: newRoom.name,
                capacity: newRoom.capacity,
            })
            .returning();

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            name: result.name || '',
            capacity: Number(result.capacity) || 0,
        };
    }

    async UpdateRoom(id: number, updatedRoom: Room): Promise<Room> {
        const [result] = await db
            .update(room)
            .set({
                name: updatedRoom.name,
                capacity: updatedRoom.capacity,
            })
            .where(eq(room.id, id))
            .returning();

        if (!result) throw new Error('Room not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            name: result.name || '',
            capacity: Number(result.capacity) || 0,
        };
    }

    async DeleteRoom(id: number): Promise<Room> {
        const [result] = await db
            .delete(room)
            .where(eq(room.id, id))
            .returning();

        if (!result) throw new Error('Room not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            name: result.name || '',
            capacity: Number(result.capacity) || 0,
        };
    }
}
