import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleListRepository from '@/src/domain/repositories/ScheduleListRepository';

export default async function GetScheduleListsByUserID(
    userId: string,
    scheduleListRepository: ScheduleListRepository,
): Promise<ScheduleList[]> {
    try {
        return await scheduleListRepository.GetScheduleListsByUserID(userId);
    } catch (err) {
        throw new Error(
            err instanceof Error
                ? err.message
                : `Error: GetScheduleListsByUserID(${userId}, ${scheduleListRepository})`,
        );
    }
}
