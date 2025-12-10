import Schedule from '../entities/Schedule';

export default interface ScheduleRepository {
    GetScheduleByID(id: number): Promise<Schedule>;
    AddSchedule(schedule: Schedule): Promise<Schedule>;
    UpdateSchedule(id: number, schedule: Schedule): Promise<Schedule>;
    DeleteSchedule(id: number): Promise<Schedule>;
}
