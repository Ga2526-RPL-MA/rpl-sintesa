'use client';
import GenericCrudList from '@/components/generic-crud-tab';
import Course from '@/src/domain/entities/Course';
import CoursesCard from '@/components/course/course-card';
import { CourseColumn } from '@/components/course/course-column';
// import DetailCourseDialog from '@/components/course/dialogs/detail-course-dialog';
import EditCourseDialog from '@/components/course/dialogs/edit-course-dialog';
import AddCourseDialog from '@/components/course/dialogs/add-course-dialog';
import { createFilterFunction } from '@/src/shared/utils/filterHelpers';

function CoursesPage() {
    const courseFilterFunction = createFilterFunction<Course>([
        (c) => c.name,
        (c) => c.code,
        (c) => c.sks,
        (c) => `${c.sks} sks`,
        (c) => c.semester,
        (c) =>
            c.semester == 1
                ? `${c.semester}st semester`
                : c.semester == 2
                  ? `${c.semester}nd semester`
                  : c.semester == 3
                    ? `${c.semester}rd semester`
                    : `${c.semester}th semester`,
    ]);

    return (
        <div className="flex h-full flex-col">
            <div className="mb-4 space-y-1">
                <h1 className="flex text-2xl font-bold">Courses List</h1>
                <p className="text-muted-foreground">
                    List of courses that will be used for the schedule
                    generation. <br />
                    You can easily view, add, edit, and delete courses here.
                </p>
            </div>
            <div className="min-h-0 flex-1">
                <GenericCrudList<Course>
                    apiEndpoint="/api/courses"
                    entityName="Course"
                    createColumns={CourseColumn}
                    // DetailDialog={DetailCourseDialog}
                    CardComponent={CoursesCard}
                    AddDialog={AddCourseDialog}
                    EditDialog={EditCourseDialog}
                    filterFunction={courseFilterFunction}
                />
            </div>
        </div>
    );
}

export default CoursesPage;
