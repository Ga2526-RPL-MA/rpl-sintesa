import Schedule from '@/src/domain/entities/Schedule';
import PublicSchedule from '../types/PublicSchedule';
import toPublicCourse from './toPublicCourse';
import toPublicLecturer from './toPublicLecturer';
import toPublicRoom from './toPublicRoom';

export default function toPublicSchedule(schedule: Schedule): PublicSchedule {
    return {
        weekDay: schedule.weekDay,
        startHour: schedule.startHour,
        endHour: schedule.endHour,
        course: toPublicCourse(schedule.course),
        lecturer: toPublicLecturer(schedule.lecturer),
        room: toPublicRoom(schedule.room),
    };
}
