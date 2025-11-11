import Course from '@/src/domain/entities/Course';
import CourseRepository from '@/src/domain/repositories/CourseRepository';

export default async function GetCourses(
    courseRepository: CourseRepository,
): Promise<Course[]> {
    try {
        return await courseRepository.GetCourses();
    } catch (err) {
        throw new Error(
            err instanceof Error
                ? err.message
                : `Error: GetCourses(${courseRepository})`,
        );
    }
}
