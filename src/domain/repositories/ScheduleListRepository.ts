import ScheduleList from "../entities/ScheduleList";


export default interface ScheduleListRepository {
    saveSchedules(scheduleListEntity: ScheduleList): Promise<void>;
}

// TODO: add more methods