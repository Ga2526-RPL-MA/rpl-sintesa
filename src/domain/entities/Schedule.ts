import Hour from '../enums/Hour';
import WeekDay from '../enums/WeekDay';

type Schedule = {
    courseId: number;
    roomId: number;
    lecturerId: number;
    weekDay: WeekDay;
    startHour: Hour;
    endHour: Hour;
};

export default Schedule;
