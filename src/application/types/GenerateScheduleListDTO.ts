import Course from '@/src/domain/entities/Course';
import Lecturer from '@/src/domain/entities/Lecturer';
import Room from '@/src/domain/entities/Room';
import Hour from '@/src/domain/enums/Hour';
import Semester from '@/src/domain/enums/Semester';
import WeekDay from '@/src/domain/enums/WeekDay';

type GenerateScheduleListDTO = {
    coursesList: Course[];
    lecturersList: Lecturer[];
    roomsList: Room[];
    weekDaysList: WeekDay[];
    hoursList: Hour[];
    semester: Semester;
    year: string;
    userId: string;
};

export default GenerateScheduleListDTO;
