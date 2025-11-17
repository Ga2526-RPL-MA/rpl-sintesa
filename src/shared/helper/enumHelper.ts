import SemesterArgbColor from '@/src/application/enums/SemesterArgbColor';
import Hour from '@/src/domain/enums/Hour';
import Semester from '@/src/domain/enums/Semester';
import WeekDay from '@/src/domain/enums/WeekDay';

export const weekDaysEnum: WeekDay[] = Object.values(WeekDay);
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