import Semester from '../enums/Semester';
import Schedule from './Schedule';

type ScheduleList = {
    schedules: Schedule[];
    semester: Semester;
    year: string;
    userId: string;
};

export default ScheduleList;
