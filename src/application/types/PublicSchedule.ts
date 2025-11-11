import Schedule from "@/src/domain/entities/Schedule";
import PublicCourse from "./PublicCourse";
import PublicLecturer from "./PublicLecturer";
import PublicRoom from "./PublicRoom";

type BasePublicSchedule = Pick<Schedule, 'weekDay' | 'startHour' | 'endHour'>

type PublicSchedule = BasePublicSchedule & {
    course: PublicCourse;
    lecturer: PublicLecturer;
    room: PublicRoom;
}

export default PublicSchedule;