import ScheduleList from '../entities/ScheduleList';
import Schedule from '../entities/Schedule';

export interface UpdateScheduleInput {
    scheduleId: number;
    schedule: Schedule;
}

export default interface ScheduleListRepository {
    AddScheduleList(newScheduleList: ScheduleList): Promise<ScheduleList>;
    GetScheduleListByID(id: number): Promise<ScheduleList>;
    GetScheduleListsByUserID(userId: string): Promise<ScheduleList[]>;
    UpdateSchedulesInList(
        scheduleListId: number,
        schedulesToUpdate: UpdateScheduleInput[],
    ): Promise<ScheduleList>;
    DeleteScheduleList(id: number): Promise<ScheduleList>;
}
