import Room from '@/src/domain/entities/Room';
import RoomRepository from '@/src/domain/repositories/RoomRepository';

export default async function GetRooms(
    roomRepository: RoomRepository,
): Promise<Room[]> {
    try {
        return await roomRepository.GetRooms();
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : `Error: GetRooms(${roomRepository})`,
        );
    }
}
