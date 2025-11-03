import { db } from "@/src/database/index";
import ScheduleList from "@/src/domain/entities/ScheduleList";
import ScheduleListRepository from "@/src/domain/repositories/ScheduleListRepository";
import { schedule, scheduleList } from "@/src/database/drizzle/schema";

export default class ScheduleListRepositoryImpl implements ScheduleListRepository {
    async saveSchedules(scheduleListEntity: ScheduleList): Promise<void> {
        await db.transaction(async (tx) => {
            const newScheduleList = await tx.insert(scheduleList).values({
                semester: scheduleListEntity.semester,
                year: scheduleListEntity.year,
                userId: scheduleListEntity.userId,
            }).returning({ id: scheduleList.id });

            await tx.insert(schedule).values(
                scheduleListEntity.schedules.map((schedule) => ({
                    ...schedule,
                    scheduleListId: newScheduleList[0].id,
                }))
            );
        });
    }
}