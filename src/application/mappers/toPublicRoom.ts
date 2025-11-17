import Room from '@/src/domain/entities/Room';
import PublicRoom from '../types/PublicRoom';

export default function toPublicRoom(room: Room): PublicRoom {
    return {
        name: room.name,
    };
}
