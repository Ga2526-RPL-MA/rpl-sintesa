import ScheduleList from '@/src/domain/entities/ScheduleList';
import PublicScheduleList from '../types/PublicScheduleList';
import toPublicSchedule from './toPublicSchedule';

export default function toPublicScheduleList(
    list: ScheduleList,
): PublicScheduleList {
    return {
        semester: list.semester,
        year: list.year,
        schedules: list.schedules.map(toPublicSchedule),
    };
}
