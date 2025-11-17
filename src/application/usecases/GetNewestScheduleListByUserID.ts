import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleListRepository from '@/src/domain/repositories/ScheduleListRepository';

export default async function GetNewestScheduleListByUserID(
    userId: string,
    scheduleListRepository: ScheduleListRepository,
): Promise<ScheduleList> {
    try {
        return (
            await scheduleListRepository.GetScheduleListsByUserID(userId)
        )[0];
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : `Error: GetNewestScheduleListByUserID(${userId}, ${scheduleListRepository})`,
        );
    }
}
