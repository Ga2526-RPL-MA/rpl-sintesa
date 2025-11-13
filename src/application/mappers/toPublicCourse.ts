import Course from '@/src/domain/entities/Course';
import PublicCourse from '../types/PublicCourse';

export default function toPublicCourse(course: Course): PublicCourse {
    return {
        code: course.code,
        name: course.name,
        sks: course.sks,
    };
}
