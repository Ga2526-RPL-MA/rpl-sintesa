import Lecturer from '../entities/Lecturer';

export default interface LecturerRepository {
    GetLecturers(): Promise<Lecturer[]>;
    GetLecturerByID(id: number): Promise<Lecturer>;
    AddLecturer(lecturer: Lecturer): Promise<Lecturer>;
    UpdateLecturer(id: number, lecturer: Lecturer): Promise<Lecturer>;
    DeleteLecturer(id: number): Promise<Lecturer>;
}
