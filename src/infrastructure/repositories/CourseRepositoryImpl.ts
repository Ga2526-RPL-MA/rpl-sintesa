import { course } from '@/src/database/drizzle/schema';
import CourseRepository from '@/src/domain/repositories/CourseRepository';
import Course from '@/src/domain/entities/Course';
import { db } from '@/src/database';
import { eq } from 'drizzle-orm';

export default class CourseRepositoryImpl implements CourseRepository {
    async GetCourses(): Promise<Course[]> {
        const courses = await db.select().from(course);
        return courses.map((c) => ({
            id: Number(c.id),
            createdAt: new Date(c.createdAt),
            code: c.code,
            name: c.name,
            sks: Number(c.sks),
            description: c.description,
            semester: c.semester,
        }));
    }

    async GetCourseByID(id: number): Promise<Course> {
        const [result] = await db
            .select()
            .from(course)
            .where(eq(course.id, id));
        if (!result) throw new Error('Course not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            code: result.code,
            name: result.name,
            sks: Number(result.sks),
            description: result.description,
            semester: result.semester,
        };
    }

    async AddCourse(newCourse: Course): Promise<Course> {
        const [result] = await db
            .insert(course)
            .values({
                code: newCourse.code,
                name: newCourse.name,
                sks: newCourse.sks,
                description: newCourse.description,
                semester: newCourse.semester,
            })
            .returning();

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            code: result.code,
            name: result.name,
            sks: Number(result.sks),
            description: result.description,
            semester: result.semester,
        };
    }

    async UpdateCourse(id: number, updatedCourse: Course): Promise<Course> {
        const [result] = await db
            .update(course)
            .set({
                code: updatedCourse.code,
                name: updatedCourse.name,
                sks: updatedCourse.sks,
                description: updatedCourse.description,
                semester: updatedCourse.semester,
            })
            .where(eq(course.id, id))
            .returning();

        if (!result) throw new Error('Course not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            code: result.code,
            name: result.name,
            sks: Number(result.sks),
            description: result.description,
            semester: result.semester,
        };
    }

    async DeleteCourse(id: number): Promise<Course> {
        const [result] = await db
            .delete(course)
            .where(eq(course.id, id))
            .returning();

        if (!result) throw new Error('Course not found');

        return {
            id: Number(result.id),
            createdAt: new Date(result.createdAt),
            code: result.code,
            name: result.name,
            sks: Number(result.sks),
            description: result.description,
            semester: result.semester,
        };
    }
}
