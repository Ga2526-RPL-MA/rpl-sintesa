import SemesterArgbColor from '@/src/application/enums/SemesterArgbColor';
import Hour from '@/src/domain/enums/Hour';
import Semester from '@/src/domain/enums/Semester';
import WeekDay from '@/src/domain/enums/WeekDay';

export const weekDaysEnum: WeekDay[] = Object.values(WeekDay);
export const weekDaysEngRecord: Record<WeekDay, string> = {
    [WeekDay.SENIN]: 'Monday',
    [WeekDay.SELASA]: 'Tuesday',
    [WeekDay.RABU]: 'Wednesday',
    [WeekDay.KAMIS]: 'Thursday',
    [WeekDay.JUMAT]: 'Friday',
};
export const WeekDaysIndexRecord: Record<WeekDay, number> = {
    [WeekDay.SENIN]: 1,
    [WeekDay.SELASA]: 2,
    [WeekDay.RABU]: 3,
    [WeekDay.KAMIS]: 4,
    [WeekDay.JUMAT]: 5,
};
export const hoursEnum: Hour[] = Object.values(Hour);
export const semesterEnum: Semester[] = Object.values(Semester);
export const semesterArgbColorsEnum = [
    SemesterArgbColor.Zero,
    SemesterArgbColor.One,
    SemesterArgbColor.Two,
    SemesterArgbColor.Three,
    SemesterArgbColor.Four,
    SemesterArgbColor.Five,
    SemesterArgbColor.Six,
    SemesterArgbColor.Seven,
    SemesterArgbColor.Eight,
];
