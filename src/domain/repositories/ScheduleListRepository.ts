import ScheduleList from '../entities/ScheduleList';

export default interface ScheduleListRepository {
    AddScheduleList(newScheduleList: ScheduleList): Promise<ScheduleList>;
    GetScheduleListByID(id: number): Promise<ScheduleList>;
    GetNewestScheduleListByUserID(userId: string): Promise<ScheduleList>;
    GetScheduleListsByUserID(userId: string): Promise<ScheduleList[]>;
}