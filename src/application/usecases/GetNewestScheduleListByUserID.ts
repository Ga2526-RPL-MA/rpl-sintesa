import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleListRepository from '@/src/domain/repositories/ScheduleListRepository';

export default async function GetNewestScheduleListByUserID(
    userId: string,
    scheduleListRepository: ScheduleListRepository,
): Promise<ScheduleList> {
    try {
        return await scheduleListRepository.GetNewestScheduleListByUserID(
            userId,
        );
    } catch (err) {
        throw new Error(
            err instanceof Error
                ? err.message
                : `Error: GetNewestScheduleListByUserID(${userId}, ${scheduleListRepository})`,
        );
    }
}
