import Room from '@/src/domain/entities/Room';
import ScheduleList from '@/src/domain/entities/ScheduleList';
import Hour from '@/src/domain/enums/Hour';
import WeekDay from '@/src/domain/enums/WeekDay';

export default interface ExportScheduleListToXLSXDTO {
    scheduleList: ScheduleList;
    weekDayList: WeekDay[];
    hourList: Hour[];
    roomList: Room[];
}
