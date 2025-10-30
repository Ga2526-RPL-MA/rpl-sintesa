import Schedule from '../entities/Schedule';
import { Semester } from '../enums/Semester';
import { WeekDay } from '../enums/WeekDay';
import { getRandomInt, getRandomEvenInt } from '../services/Random';

const lecturersList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const coursesList = [
    'ER234501',
    'ER234502',
    'ER234503',
    'ER234504',
    'ER234505',
    'ER234506',
    'ER234507',
    'ER234508',
    'ER234509',
    'ER234510',
];
const roomsList = [
    'IF-101',
    'IF-102',
    'IF-103',
    'IF-104',
    'IF-105',
    'IF-106',
    'IF-107',
    'IF-108',
    'IF-110',
    'IF-111',
    'IF-112',
    'IF-113',
    'RBTC',
    'LP-1',
    'LP-2',
    'SKPB',
    'Lab. NETICS',
    'Aula',
];
const weekDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hoursList = [
    '07:00',
    '07:50',
    '08:00',
    '08:50',
    '09:00',
    '09:50',
    '10:00',
    '10:50',
    '11:00',
    '11:50',
    '12:00',
    '12:50',
    '13:30',
    '14:20',
    '14:30',
    '15:20',
    '15:30',
    '16:20',
    '16:30',
    '17:20',
    '17:30',
    '18:20',
    '18:30',
    '19:20',
    '19:30',
    '20:20',
];

export default function generateSchedule() {
    const scheduleList: Schedule[] = [];
    const usedScheduleList: string[] = [];

    for (let i = 0; i < coursesList.length; i++) {
        let schedule,
            weekDayIdx,
            startHourIdx,
            endHourIdx,
            roomIdx,
            lecturerIdx;

        do {
            do {
                weekDayIdx = getRandomInt(weekDaysList.length - 1);
                startHourIdx = getRandomEvenInt(hoursList.length - 4);
                endHourIdx = startHourIdx + 3;
            } while (
                weekDaysList[weekDayIdx] === WeekDay.Friday &&
                endHourIdx > hoursList.findIndex((w) => w === '10:50')
            );

            roomIdx = getRandomInt(roomsList.length - 1);
            lecturerIdx = getRandomInt(lecturersList.length - 1);

            schedule = `${weekDayIdx},${startHourIdx},${endHourIdx},${roomIdx}`;
        } while (usedScheduleList.includes(schedule));

        usedScheduleList.push(schedule);

        scheduleList.push({
            id: i,
            courseId: i,
            roomId: roomIdx,
            weekDay: WeekDay[weekDaysList[weekDayIdx] as keyof typeof WeekDay],
            startHour: hoursList[startHourIdx],
            endHour: hoursList[endHourIdx],
            semester: Semester.Odd,
            lecturerId: lecturerIdx,
            year: '2025/2026',
            userId: 'user-xyz',
        });
    }

    return scheduleList;
}

// TODO: default jam kuliah 7-18 dengan increment 1 jam sesuai sistem perjadwalan ITS
// TODO: bobot jam 07:00-08:50, 10:00-11:50, 13:30-15:20, 15:30-17:20 lebih memungkinkan
// TODO: bobot kelas IF-101 hingga IF-114 (RBTC) lebih memungkinkan
// TODO: randomize plottingan dosen, sesuai bidang keahlian dosen tersebut sendiri terhadap matkul (kalo bisa)
// TODO: pastikan tidak tabrak kelas maupun jadwal antar mata kuliah ataupun dosen
// TODO: jadwal dasprog sesuai dengan UPMB jam 07-09, 09-11, 11-13, 13-15, 15-17
// TODO: intergrate with supabase to get real data
// TODO: use maxIteration in each do while so it won't reach SIGTERM
// TODO: ubah schedule ke objek supaya lebih gampang dan rapih
