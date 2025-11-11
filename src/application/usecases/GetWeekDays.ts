import WeekDay from '@/src/domain/enums/WeekDay';
import { weekDaysEnum } from '@/src/shared/helper/enumHelper';

export default async function GetWeekDays(): Promise<WeekDay[]> {
    try {
        return weekDaysEnum;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Error: GetWeekDays()',
        );
    }
}
