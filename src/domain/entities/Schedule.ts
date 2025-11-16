import Hour from '../enums/Hour';
import WeekDay from '../enums/WeekDay';
import Course from './Course';
import Lecturer from './Lecturer';
import Room from './Room';

export default class Schedule {
    constructor(
        public id: number,
        public createdAt: Date,
        public weekDay: WeekDay,
        public startHour: Hour,
        public endHour: Hour,
        public course: Course,
        public lecturer: Lecturer,
        public room: Room,
    ) {}
}
