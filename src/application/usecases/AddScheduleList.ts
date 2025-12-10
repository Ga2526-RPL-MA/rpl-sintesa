import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleListRepository from '@/src/domain/repositories/ScheduleListRepository';

export default async function AddScheduleList(
    newScheduleList: ScheduleList,
    scheduleListRepository: ScheduleListRepository,
): Promise<ScheduleList> {
    try {
        return await scheduleListRepository.AddScheduleList(newScheduleList);
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : `Error: AddScheduleList()`,
        );
    }
}
