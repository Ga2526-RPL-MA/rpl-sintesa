import Course from '../entities/Course';

export default interface CourseRepository {
    GetCourses(): Promise<Course[]>;
    GetCourseByID(id: number): Promise<Course>;
    AddCourse(course: Course): Promise<Course>;
    UpdateCourse(id: number, course: Course): Promise<Course>;
    DeleteCourse(id: number): Promise<Course>;
}
