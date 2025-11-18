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
export const hoursEnum: Hour[] = Object.values(Hour);
export const semesterEnum: Semester[] = Object.values(Semester);
