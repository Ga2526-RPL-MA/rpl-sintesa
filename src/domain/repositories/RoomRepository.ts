import Room from '../entities/Room';

export default interface RoomRepository {
    GetRooms(): Promise<Room[]>;
    GetRoomByID(id: number): Promise<Room>;
    GetRoomByCode(code: string): Promise<Room>;
    AddRoom(room: Room): Promise<Room>;
    UpdateRoom(id: number, room: Room): Promise<Room>;
    DeleteRoom(id: number): Promise<Room>;
}
