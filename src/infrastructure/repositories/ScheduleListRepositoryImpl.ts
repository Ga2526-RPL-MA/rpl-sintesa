import { db } from '@/src/database/index';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleListRepository, {
    UpdateScheduleInput,
} from '@/src/domain/repositories/ScheduleListRepository';
import { schedule, scheduleList } from '@/src/database/drizzle/schema';
import { desc, eq } from 'drizzle-orm';
import Semester from '@/src/domain/enums/Semester';
import WeekDay from '@/src/domain/enums/WeekDay';
import Hour from '@/src/domain/enums/Hour';

export default class ScheduleListRepositoryImpl
    implements ScheduleListRepository
{
    async AddScheduleList(
        newScheduleList: ScheduleList,
    ): Promise<ScheduleList> {
        const result = await db.transaction(async (tx) => {
            const returnedScheduleList = await tx
                .insert(scheduleList)
                .values({
                    semester: newScheduleList.semester,
                    year: newScheduleList.year,
                    userId: newScheduleList.userId,
                })
                .returning();

            await tx.insert(schedule).values(
                newScheduleList.schedules.map((schedule) => ({
                    courseId: schedule.course.id,
                    lecturerId: schedule.lecturer.id,
                    roomId: schedule.room.id,
                    weekDay: schedule.weekDay,
                    startHour: schedule.startHour,
                    endHour: schedule.endHour,
                    scheduleListId: returnedScheduleList[0].id,
                })),
            );

            return returnedScheduleList;
        });

        return this.GetScheduleListByID(result[0].id);
    }

    async UpdateSchedulesInList(
        scheduleListId: number,
        schedulesToUpdate: UpdateScheduleInput[],
    ): Promise<ScheduleList> {
        await db.transaction(async (tx) => {
            const existingScheduleList = await tx.query.scheduleList.findFirst({
                where: eq(scheduleList.id, scheduleListId),
            });

            if (!existingScheduleList) {
                throw new Error('Schedule list not found');
            }

            for (const updateInput of schedulesToUpdate) {
                const existingSchedule = await tx.query.schedule.findFirst({
                    where: eq(schedule.id, updateInput.scheduleId),
                });

                if (!existingSchedule) {
                    throw new Error(
                        `Schedule with ID ${updateInput.scheduleId} not found`,
                    );
                }

                await tx
                    .update(schedule)
                    .set({
                        courseId: updateInput.schedule.course.id,
                        lecturerId: updateInput.schedule.lecturer.id,
                        roomId: updateInput.schedule.room.id,
                        weekDay: updateInput.schedule.weekDay,
                        startHour: updateInput.schedule.startHour,
                        endHour: updateInput.schedule.endHour,
                    })
                    .where(eq(schedule.id, updateInput.scheduleId));
            }
        });

        return this.GetScheduleListByID(scheduleListId);
    }

    async GetScheduleListByID(id: number): Promise<ScheduleList> {
        const result = await db.query.scheduleList.findFirst({
            where: eq(scheduleList.id, id),
            with: {
                schedules: {
                    with: {
                        course: true,
                        lecturer: true,
                        room: true,
                    },
                },
            },
        });

        if (!result) throw new Error('Schedule list not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            semester: Semester[result.semester],
            year: result.year,
            userId: result.userId,
            schedules: result.schedules.map((schedule) => ({
                id: Number(schedule.id),
                createdAt: new Date(schedule.createdAt),
                weekDay: WeekDay[schedule.weekDay],
                startHour: Hour[schedule.startHour],
                endHour: Hour[schedule.endHour],
                course: {
                    id: Number(schedule.course.id),
                    createdAt: new Date(schedule.course.createdAt),
                    code: schedule.course.code || '',
                    name: schedule.course.name || '',
                    sks: schedule.course.sks || 0,
                    description: schedule.course.description || '',
                },
                lecturer: {
                    id: Number(schedule.lecturer.id),
                    createdAt: new Date(schedule.lecturer.createdAt),
                    nip: schedule.lecturer.nip || '',
                    name: schedule.lecturer.name || '',
                    faculy: schedule.lecturer.faculty || '',
                    expertise: schedule.lecturer.expertise || '',
                },
                room: {
                    id: Number(schedule.room.id),
                    createdAt: new Date(schedule.room.createdAt),
                    name: schedule.room.name || '',
                    capacity: schedule.room.capacity || 0,
                },
            })),
        };
    }

    async GetScheduleListsByUserID(userId: string): Promise<ScheduleList[]> {
        const result = await db.query.scheduleList.findMany({
            where: eq(scheduleList.userId, userId),
            with: {
                schedules: {
                    with: {
                        course: true,
                        lecturer: true,
                        room: true,
                    },
                },
            },
            orderBy: desc(scheduleList.createdAt),
        });

        if (!result) throw new Error('Schedule list not found');

        return result.map((scheduleList) => ({
            id: Number(scheduleList.id),
            createdAt: new Date(scheduleList.createdAt),
            semester: Semester[scheduleList.semester],
            year: scheduleList.year,
            userId: scheduleList.userId,
            schedules: scheduleList.schedules.map((schedule) => ({
                id: Number(schedule.id),
                createdAt: new Date(schedule.createdAt),
                weekDay: WeekDay[schedule.weekDay],
                startHour: Hour[schedule.startHour],
                endHour: Hour[schedule.endHour],
                course: {
                    id: Number(schedule.course.id),
                    createdAt: new Date(schedule.course.createdAt),
                    code: schedule.course.code || '',
                    name: schedule.course.name || '',
                    sks: schedule.course.sks || 0,
                    description: schedule.course.description || '',
                },
                lecturer: {
                    id: Number(schedule.lecturer.id),
                    createdAt: new Date(schedule.lecturer.createdAt),
                    nip: schedule.lecturer.nip || '',
                    name: schedule.lecturer.name || '',
                    faculy: schedule.lecturer.faculty || '',
                    expertise: schedule.lecturer.expertise || '',
                },
                room: {
                    id: Number(schedule.room.id),
                    createdAt: new Date(schedule.room.createdAt),
                    name: schedule.room.name || '',
                    capacity: schedule.room.capacity || 0,
                },
            })),
        }));
    }

    async DeleteScheduleList(id: number): Promise<ScheduleList> {
        const existingScheduleList = await this.GetScheduleListByID(id);

        await db.delete(scheduleList).where(eq(scheduleList.id, id));

        return existingScheduleList;
    }
}
