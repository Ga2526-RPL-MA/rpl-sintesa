import Room from "@/src/domain/entities/Room";
import RoomRepository from "@/src/domain/repositories/RoomRepository";

export default async function GetRooms(roomRepository: RoomRepository): Promise<Room[]>{
    try {
        return await roomRepository.GetRooms();
    } catch(err) {
        throw new Error(err instanceof Error? err.message : `Error: GetRooms(${roomRepository})`);
    }
}