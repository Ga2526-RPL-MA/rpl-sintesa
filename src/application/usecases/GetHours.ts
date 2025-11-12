import Hour from '@/src/domain/enums/Hour';
import { hoursEnum } from '@/src/shared/helper/enumHelper';

export default async function GetHours(): Promise<Hour[]> {
    try {
        return hoursEnum;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Error: GetHours()',
        );
    }
}
