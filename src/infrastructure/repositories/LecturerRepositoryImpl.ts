import { lecturer } from '@/src/database/drizzle/schema';
import { Lecturer } from '@/src/domain/entities/Lecturer';
import LecturerRepository from '@/src/domain/repositories/LecturerRepository';
import { db } from '@/src/database';
import { eq } from 'drizzle-orm';

export default class LecturerRepositoryImpl implements LecturerRepository {
    async GetLecturers(): Promise<Lecturer[]> {
        const lecturers = await db.select().from(lecturer);
        return lecturers.map((l) => ({
            id: Number(l.id),
            createdAt: new Date(l.createdAt),
            nip: l.nip || '',
            name: l.name || '',
            faculy: l.faculty || '',
            expertise: l.expertise || '',
        }));
    }

    async GetLecturerByID(id: number): Promise<Lecturer> {
        const [result] = await db
            .select()
            .from(lecturer)
            .where(eq(lecturer.id, id));

        if (!result) throw new Error('Lecturer not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            nip: result.nip || '',
            name: result.name || '',
            faculy: result.faculty || '',
            expertise: result.expertise || '',
        };
    }

    async AddLecturer(newLecturer: Lecturer): Promise<Lecturer> {
        const [result] = await db
            .insert(lecturer)
            .values({
                nip: newLecturer.nip,
                name: newLecturer.name,
                faculty: newLecturer.faculy,
                expertise: newLecturer.expertise,
            })
            .returning();

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            nip: result.nip || '',
            name: result.name || '',
            faculy: result.faculty || '',
            expertise: result.expertise || '',
        };
    }

    async UpdateLecturer(
        id: number,
        updatedLecturer: Lecturer,
    ): Promise<Lecturer> {
        const [result] = await db
            .update(lecturer)
            .set({
                nip: updatedLecturer.nip,
                name: updatedLecturer.name,
                faculty: updatedLecturer.faculy,
                expertise: updatedLecturer.expertise,
            })
            .where(eq(lecturer.id, id))
            .returning();

        if (!result) throw new Error('Lecturer not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            nip: result.nip || '',
            name: result.name || '',
            faculy: result.faculty || '',
            expertise: result.expertise || '',
        };
    }

    async DeleteLecturer(id: number): Promise<Lecturer> {
        const [result] = await db
            .delete(lecturer)
            .where(eq(lecturer.id, id))
            .returning();

        if (!result) throw new Error('Lecturer not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            nip: result.nip || '',
            name: result.name || '',
            faculy: result.faculty || '',
            expertise: result.expertise || '',
        };
    }
}
