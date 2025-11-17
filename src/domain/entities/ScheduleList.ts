import Semester from '../enums/Semester';
import Schedule from './Schedule';

export default class ScheduleList {
    constructor(
        public id: number,
        public createdAt: Date,
        public semester: Semester,
        public year: string,
        public userId: string,
        public schedules: Schedule[],
    ) {}
}
