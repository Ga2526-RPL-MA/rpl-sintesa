import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleListRepository from '@/src/domain/repositories/ScheduleListRepository';

export default async function GetScheduleListByID(
    id: number,
    scheduleListRepository: ScheduleListRepository,
): Promise<ScheduleList> {
    try {
        return await scheduleListRepository.GetScheduleListByID(id);
    } catch (err) {
        throw new Error(
            err instanceof Error
                ? err.message
                : `Error: GetScheduleListByID(${id}, ${scheduleListRepository}`,
        );
    }
}
