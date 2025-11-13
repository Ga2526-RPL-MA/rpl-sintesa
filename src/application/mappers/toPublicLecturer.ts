import Lecturer from '@/src/domain/entities/Lecturer';
import PublicLecturer from '../types/PublicLecturer';

export default function toPublicLecturer(lecturer: Lecturer): PublicLecturer {
    return {
        nip: lecturer.nip,
        name: lecturer.name,
    };
}
