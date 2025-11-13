import ScheduleList from '@/src/domain/entities/ScheduleList';
import PublicSchedule from './PublicSchedule';

type BasePublicScheduleList = Pick<ScheduleList, 'semester' | 'year'>;

type PublicScheduleList = BasePublicScheduleList & {
    schedules: PublicSchedule[];
};

export default PublicScheduleList;
