import { Room } from '../entities/Room';

export default interface RoomRepository {
    GetRoom(): Promise<Room[]>;
    GetRoomByID(id: number): Promise<Room>;
    GetRoomByCode(code: string): Promise<Room>;
    AddRoom(course: Room): Promise<Room>;
    UpdateRoom(id: number, course: Room): Promise<Room>;
    DeleteCourse(id: number): Promise<Room>;
}
