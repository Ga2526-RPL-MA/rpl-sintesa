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

export const engWeekDays: Record<string, WeekDay> = {
  Monday: WeekDay.SENIN,
  Tuesday: WeekDay.SELASA,
  Wednesday: WeekDay.RABU,
  Thursday: WeekDay.KAMIS,
  Friday: WeekDay.JUMAT,
};


export const WeekDaysIndexRecord: Record<WeekDay, number> = {
    [WeekDay.SENIN]: 1,
    [WeekDay.SELASA]: 2,
    [WeekDay.RABU]: 3,
    [WeekDay.KAMIS]: 4,
    [WeekDay.JUMAT]: 5,
};
export const IndexToWeekDay: Record<number, WeekDay> = {
    1: WeekDay.SENIN,
    2: WeekDay.SELASA,
    3: WeekDay.RABU,
    4: WeekDay.KAMIS,
    5: WeekDay.JUMAT,
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
