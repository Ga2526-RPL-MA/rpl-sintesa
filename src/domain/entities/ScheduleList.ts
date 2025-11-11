import Semester from '../enums/Semester';
import Schedule from './Schedule';

type ScheduleList = {
    id: number;
    createdAt: Date;
    semester: Semester;
    year: string;
    userId: string;
    schedules: Schedule[];
};

export default ScheduleList;
