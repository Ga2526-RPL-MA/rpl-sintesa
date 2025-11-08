import Hour from '../enums/Hour';
import WeekDay from '../enums/WeekDay';
import Course from './Course';
import Lecturer from './Lecturer';
import Room from './Room';

type Schedule = {
    id: number;
    createdAt: Date;
    weekDay: WeekDay;
    startHour: Hour;
    endHour: Hour;
    course: Course;
    lecturer: Lecturer;
    room: Room;
};

export default Schedule;