import { Lecturer } from '../entities/Lecturer';

export default interface CourseRepository {
    GetLecturers(): Promise<Lecturer[]>;
    GetLecturerByID(id: number): Promise<Lecturer>;
    AddLecturer(lecturer: Lecturer): Promise<Lecturer>;
    UpdateCourse(id: number, lecturer: Lecturer): Promise<Lecturer>;
    DeleteCourse(id: number): Promise<Lecturer>;
}
