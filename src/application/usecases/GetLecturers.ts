import Lecturer from '@/src/domain/entities/Lecturer';
import LecturerRepository from '@/src/domain/repositories/LecturerRepository';

export default async function GetLecturers(
    lecturerRepository: LecturerRepository,
): Promise<Lecturer[]> {
    try {
        return await lecturerRepository.GetLecturers();
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : `Error: GetLecturers(${lecturerRepository})`,
        );
    }
}
