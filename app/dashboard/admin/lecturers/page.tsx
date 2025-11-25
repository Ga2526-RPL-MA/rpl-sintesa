import LecturersList from '@/components/generic-crud-tab'
import { DataTable } from '../../../../components/table/data-table'
import GenericCrudList from '@/components/generic-crud-tab'
import Lecturer from '@/src/domain/entities/Lecturer'
import { LecturerColumns } from '@/components/table/columns'
import AddLecturerDialog from '@/components/dialogs/lecturer/add-lecturer-dialog'
import EditLecturerDialog from '@/components/dialogs/lecturer/edit-lecturer-dialog'
import LecturerCard from '@/components/lecturer/lecturer-card'

function LecturersPage() {
  return (
    <div className='h-full flex flex-col'>
        <div className='mb-4 space-y-1'>
            <h1 className='flex text-2xl font-bold'>
                Lecturers List
            </h1>
            <p className='text-muted-foreground'>
                List of lecturers that will be used for the schedule generation. <br/>
                You can easily view, add, edit, and delete lecturers here.
            </p>
        </div>
        <div className='flex-1 min-h-0'>
            <GenericCrudList<Lecturer>
            apiEndpoint="/api/lecturers"
            entityName="Lecturer"
            createColumns={LecturerColumns}
            CardComponent={LecturerCard}
            AddDialog={AddLecturerDialog}
            EditDialog={EditLecturerDialog}
            />
        </div>
    </div>
  )
}

export default LecturersPage