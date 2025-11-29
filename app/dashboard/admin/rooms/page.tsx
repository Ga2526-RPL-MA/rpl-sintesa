import GenericCrudList from '@/components/generic-crud-tab';
import AddRoomDialog from '@/components/room/dialogs/add-room-dialog';
import EditRoomDialog from '@/components/room/dialogs/edit-room.dialog';
import RoomCard from '@/components/room/room-card';
import { RoomColumns } from '@/components/room/room-column';
import Room from '@/src/domain/entities/Room';

function RoomsPage() {
    return (
        <div className="flex h-full flex-col">
            <div className="mb-4 space-y-1">
                <h1 className="flex text-2xl font-bold">Rooms List</h1>
                <p className="text-muted-foreground">
                    List of rooms that will be used for the schedule generation.{' '}
                    <br />
                    You can easily view, add, edit, and delete rooms here.
                </p>
            </div>
            <div className="min-h-0 flex-1">
                <GenericCrudList<Room>
                    apiEndpoint="/api/rooms"
                    entityName="Room"
                    createColumns={RoomColumns}
                    CardComponent={RoomCard}
                    AddDialog={AddRoomDialog}
                    EditDialog={EditRoomDialog}
                />
            </div>
        </div>
    );
}

export default RoomsPage;
