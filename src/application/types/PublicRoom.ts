import Room from "@/src/domain/entities/Room";

type PublicRoom = Pick<Room, 'name'>

export default PublicRoom;