import ScheduleList from '@/src/domain/entities/ScheduleList';
import Schedule from '@/src/domain/entities/Schedule';
import WeekDay from '@/src/domain/enums/WeekDay';
import Hour from '@/src/domain/enums/Hour';
import Random from '@/src/shared/utils/Random';
import generateScheduleDTO from '../dto/generateScheduleDTO';

export default async function GenerateSchedule(
    dto: generateScheduleDTO,
): Promise<ScheduleList> {
    const scheduleList: Schedule[] = [];
    const usedScheduleList: string[] = [];

    if (totalCourseExceedSlots(dto)) {
        throw new Error(
            'Not enough slots to schedule all courses without overlap.',
        );
    }

    for (let i = 0; i < dto.coursesList.length; i++) {
        let schedule,
            weekDayIdx,
            startHourIdx,
            endHourIdx,
            roomIdx,
            lecturerIdx;

        do {
            do {
                weekDayIdx = Random.int(dto.weekDaysList.length - 1);
                startHourIdx = Random.evenInt(dto.hoursList.length - 4);
                endHourIdx = startHourIdx + 3;
            } while (
                dto.weekDaysList[weekDayIdx] === WeekDay.JUMAT &&
                endHourIdx > dto.hoursList.findIndex((w) => w === Hour['10:50'])
            );

            roomIdx = Random.int(dto.roomsList.length - 1);
            lecturerIdx = Random.int(dto.lecturersList.length - 1);

            schedule = `${weekDayIdx},${startHourIdx},${endHourIdx},${roomIdx}`;
        } while (usedScheduleList.includes(schedule));

        usedScheduleList.push(schedule);

        scheduleList.push({
            courseId: i + 1,
            roomId: roomIdx + 1,
            lecturerId: lecturerIdx + 1,
            weekDay: dto.weekDaysList[weekDayIdx],
            startHour: dto.hoursList[startHourIdx],
            endHour: dto.hoursList[endHourIdx],
        });
    }

    return {
        schedules: scheduleList,
        semester: dto.semester,
        year: dto.year,
        userId: dto.userId,
    };
}

function totalCourseExceedSlots(dto: generateScheduleDTO): boolean {
    return (
        dto.coursesList.length >
        dto.weekDaysList.length *
            (dto.hoursList.length / 4) *
            dto.roomsList.length
    );
}

// TODO: default jam kuliah 7-18 dengan increment 1 jam sesuai sistem perjadwalan ITS
// TODO: bobot jam 07:00-08:50, 10:00-11:50, 13:30-15:20, 15:30-17:20 lebih memungkinkan
// TODO: bobot kelas IF-101 hingga IF-114 (RBTC) lebih memungkinkan
// TODO: randomize plottingan dosen, sesuai bidang keahlian dosen tersebut sendiri terhadap matkul (kalo bisa)
// TODO: pastikan tidak tabrak kelas maupun jadwal antar mata kuliah ataupun dosen
// TODO: jadwal dasprog sesuai dengan UPMB jam 07-09, 09-11, 11-13, 13-15, 15-17
// TODO: intergrate with supabase to get real data
// TODO: replace index with a more stable unique identifier
