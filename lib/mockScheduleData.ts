// mockScheduleData.ts

export interface Course {
    id: number;
    createdAt: string;
    code: string;
    name: string;
    sks: number;
    description: string;
}

export interface Lecturer {
    id: number;
    createdAt: string;
    nip: string;
    name: string;
    faculy: string;
    expertise: string;
}

export interface Room {
    id: number;
    createdAt: string;
    name: string;
    capacity: number;
}

export interface Schedule {
    id: number;
    createdAt: string;
    weekDay: string;
    startHour: string;
    endHour: string;
    course: Course;
    lecturer: Lecturer;
    room: Room;
}

export interface ScheduleData {
    id: number;
    createdAt: string;
    semester: string;
    year: string;
    userId: string;
    schedules: Schedule[];
}

const mockScheduleData: ScheduleData = {
    id: 6,
    createdAt: '2025-11-08T18:24:54.195Z',
    semester: 'GASAL',
    year: '2025/2026',
    userId: 'ef2ca123-1a08-4a06-b4bd-c44322703e5c',
    schedules: [
        {
            id: 41,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'KAMIS',
            startHour: '13:30',
            endHour: '15:20',
            course: {
                id: 3,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234503',
                name: 'Backend Fundamental',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 6,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021350',
                name: 'Bintang Nuralamsyah, S.Kom, M.Kom.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 14,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'IF-107',
                capacity: 0,
            },
        },
        {
            id: 42,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'SENIN',
            startHour: '17:30',
            endHour: '19:20',
            course: {
                id: 2,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234507',
                name: 'Agile Methods',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 5,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021349',
                name: 'Rizky Januar Akbar, S.Kom., M.Eng.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 12,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'IF-111',
                capacity: 0,
            },
        },
        {
            id: 43,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'SELASA',
            startHour: '16:30',
            endHour: '18:20',
            course: {
                id: 4,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234509',
                name: 'Software Evolution',
                sks: 2,
                description: '',
            },
            lecturer: {
                id: 1,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021345',
                name: 'Dr. Sarwosri, S.Kom., MT.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 14,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'IF-107',
                capacity: 0,
            },
        },
        {
            id: 44,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'KAMIS',
            startHour: '11:00',
            endHour: '12:50',
            course: {
                id: 5,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234508',
                name: 'Software Testing',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 4,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021348',
                name: 'Prof. Daniel Oranova Siahaan, S.Kom., M.Sc. PD.Eng.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 6,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'IF-101',
                capacity: 0,
            },
        },
        {
            id: 45,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'RABU',
            startHour: '14:30',
            endHour: '16:20',
            course: {
                id: 6,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234502',
                name: 'Software Quality',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 2,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021346',
                name: 'Ir. Siti Rochimah, MT., Ph.D.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 6,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'IF-101',
                capacity: 0,
            },
        },
        {
            id: 46,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'SENIN',
            startHour: '12:00',
            endHour: '14:20',
            course: {
                id: 7,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234506',
                name: 'Software Architecture',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 3,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021347',
                name: 'Prof. Dr. Umi Laili Yuhana S.Kom., M.Sc.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 15,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'Aula',
                capacity: 0,
            },
        },
        {
            id: 47,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'SENIN',
            startHour: '13:30',
            endHour: '15:20',
            course: {
                id: 10,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234510',
                name: 'Object Oriented Programming',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 5,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021349',
                name: 'Rizky Januar Akbar, S.Kom., M.Eng.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 16,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'Lab. NETICS',
                capacity: 0,
            },
        },
        {
            id: 48,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'SELASA',
            startHour: '11:00',
            endHour: '12:50',
            course: {
                id: 9,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234501',
                name: 'Formal Methods',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 3,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021347',
                name: 'Prof. Dr. Umi Laili Yuhana S.Kom., M.Sc.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 6,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'IF-101',
                capacity: 0,
            },
        },
        {
            id: 49,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'KAMIS',
            startHour: '11:00',
            endHour: '12:50',
            course: {
                id: 8,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234504',
                name: 'Software Construction',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 3,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021347',
                name: 'Prof. Dr. Umi Laili Yuhana S.Kom., M.Sc.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 2,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'RBTC',
                capacity: 0,
            },
        },
        {
            id: 50,
            createdAt: '2025-11-08T18:24:54.195Z',
            weekDay: 'SELASA',
            startHour: '08:00',
            endHour: '09:50',
            course: {
                id: 1,
                createdAt: '2025-10-31T16:04:30.238Z',
                code: 'ER234505',
                name: 'Mobile Programming',
                sks: 3,
                description: '',
            },
            lecturer: {
                id: 4,
                createdAt: '2025-11-01T06:20:53.727Z',
                nip: '5000021348',
                name: 'Prof. Daniel Oranova Siahaan, S.Kom., M.Sc. PD.Eng.',
                faculy: 'FTEIC',
                expertise: '',
            },
            room: {
                id: 6,
                createdAt: '2025-10-31T16:04:30.238Z',
                name: 'IF-101',
                capacity: 0,
            },
        },
    ],
};

export default mockScheduleData;
