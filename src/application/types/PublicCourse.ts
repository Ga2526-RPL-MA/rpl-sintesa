import Course from "@/src/domain/entities/Course";

type PublicCourse = Pick<Course, 'code' | 'name' | 'sks'>

export default PublicCourse;