import Hour from '@/src/domain/enums/Hour';
import Semester from '@/src/domain/enums/Semester';
import WeekDay from '@/src/domain/enums/WeekDay';

export default interface generateScheduleDTO {
    coursesList: string[];
    lecturersList: string[];
    roomsList: string[];
    weekDaysList: WeekDay[];
    hoursList: Hour[];
    semester: Semester;
    year: string;
    userId: string;
}
