import { db } from '@/src/database/index';
import Schedule from '@/src/domain/entities/Schedule';
import ScheduleRepository from '@/src/domain/repositories/ScheduleRepository';
import {
    schedule,
    course,
    lecturer,
    rooms,
} from '@/src/database/drizzle/schema';
import { eq } from 'drizzle-orm';
import WeekDay from '@/src/domain/enums/WeekDay';
import Hour from '@/src/domain/enums/Hour';

export default class ScheduleRepositoryImpl implements ScheduleRepository {
    async GetScheduleByID(id: number): Promise<Schedule> {
        const result = await db.query.schedule.findFirst({
            where: eq(schedule.id, id),
            with: {
                course: true,
                lecturer: true,
                room: true,
            },
        });

        if (!result) throw new Error('Schedule not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            weekDay: WeekDay[result.weekDay],
            startHour: Hour[result.startHour],
            endHour: Hour[result.endHour],
            course: {
                id: Number(result.course.id),
                createdAt: new Date(result.course.createdAt),
                code: result.course.code || '',
                name: result.course.name || '',
                sks: result.course.sks || 0,
                description: result.course.description || '',
            },
            lecturer: {
                id: Number(result.lecturer.id),
                createdAt: new Date(result.lecturer.createdAt),
                nip: result.lecturer.nip || '',
                name: result.lecturer.name || '',
                faculy: result.lecturer.faculty || '',
                expertise: result.lecturer.expertise || '',
            },
            room: {
                id: Number(result.room.id),
                createdAt: new Date(result.room.createdAt),
                name: result.room.name || '',
                capacity: result.room.capacity || 0,
            },
        };
    }

    async AddSchedule(newSchedule: Schedule): Promise<Schedule> {
        const [result] = await db
            .insert(schedule)
            .values({
                courseId: newSchedule.course.id,
                lecturerId: newSchedule.lecturer.id,
                roomId: newSchedule.room.id,
                weekDay: newSchedule.weekDay,
                startHour: newSchedule.startHour,
                endHour: newSchedule.endHour,
            })
            .returning();

        return this.GetScheduleByID(result.id);
    }

    async UpdateSchedule(
        id: number,
        updatedSchedule: Schedule,
    ): Promise<Schedule> {
        const [result] = await db
            .update(schedule)
            .set({
                courseId: updatedSchedule.course.id,
                lecturerId: updatedSchedule.lecturer.id,
                roomId: updatedSchedule.room.id,
                weekDay: updatedSchedule.weekDay,
                startHour: updatedSchedule.startHour,
                endHour: updatedSchedule.endHour,
            })
            .where(eq(schedule.id, id))
            .returning();

        if (!result) throw new Error('Schedule not found');

        return this.GetScheduleByID(result.id);
    }

    async DeleteSchedule(id: number): Promise<Schedule> {
        const existingSchedule = await this.GetScheduleByID(id);

        await db.delete(schedule).where(eq(schedule.id, id));

        return existingSchedule;
    }
}
