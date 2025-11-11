import Lecturer from '@/src/domain/entities/Lecturer';
import LecturerRepository from '@/src/domain/repositories/LecturerRepository';

export default async function GetLecturers(
    lecturerRepository: LecturerRepository,
): Promise<Lecturer[]> {
    try {
        return await lecturerRepository.GetLecturers();
    } catch (err) {
        throw new Error(
            err instanceof Error
                ? err.message
                : `Error: GetLecturers(${lecturerRepository})`,
        );
    }
}
