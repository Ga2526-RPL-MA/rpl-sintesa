import ScheduleList from '@/src/domain/entities/ScheduleList';
import ScheduleListRepository from '@/src/domain/repositories/ScheduleListRepository';
import CourseRepository from '@/src/domain/repositories/CourseRepository';
import LecturerRepository from '@/src/domain/repositories/LecturerRepository';
import RoomRepository from '@/src/domain/repositories/RoomRepository';
import AddScheduleList from './AddScheduleList';
import GenerateScheduleList from './GenerateScheduleList';
import GetCourses from './GetCourses';
import GetLecturers from './GetLecturers';
import GetRooms from './GetRooms';
import {
    hoursEnum,
    semesterEnum,
    weekDaysEnum,
} from '@/src/shared/helper/enumHelper';

export default async function GenerateThenAddScheduleList(
    scheduleListRepository: ScheduleListRepository,
    courseRepository: CourseRepository,
    lecturerRepository: LecturerRepository,
    roomRepository: RoomRepository,
): Promise<ScheduleList> {
    try {
        return await AddScheduleList(
            await GenerateScheduleList({
                coursesList: await GetCourses(courseRepository),
                lecturersList: await GetLecturers(lecturerRepository),
                roomsList: await GetRooms(roomRepository),
                weekDaysList: weekDaysEnum,
                hoursList: hoursEnum,
                semester: semesterEnum[0],
                year: '2025/2026',
                userId: 'ef2ca123-1a08-4a06-b4bd-c44322703e5c',
            }),
            scheduleListRepository,
        );
    } catch (err) {
        throw new Error(
            err instanceof Error
                ? err.message
                : `Error: GenerateThenAddScheduleList(${scheduleListRepository},${courseRepository},${lecturerRepository},${roomRepository})`,
        );
    }
}

// TODO: replace year and userId, get real data from DB
