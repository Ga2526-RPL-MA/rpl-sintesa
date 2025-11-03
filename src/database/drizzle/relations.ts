import { relations } from "drizzle-orm/relations";
import { users, scheduleList, course, schedule, lecturer, rooms } from "./schema";

export const scheduleListRelations = relations(scheduleList, ({one, many}) => ({
	users: one(users, {
		fields: [scheduleList.userId],
		references: [users.id]
	}),
	schedules: many(schedule),
}));

export const usersRelations = relations(users, ({many}) => ({
	scheduleLists: many(scheduleList),
}));

export const scheduleRelations = relations(schedule, ({one}) => ({
	course: one(course, {
		fields: [schedule.courseId],
		references: [course.id]
	}),
	lecturer: one(lecturer, {
		fields: [schedule.lecturerId],
		references: [lecturer.id]
	}),
	room: one(rooms, {
		fields: [schedule.roomId],
		references: [rooms.id]
	}),
	scheduleList: one(scheduleList, {
		fields: [schedule.scheduleListId],
		references: [scheduleList.id]
	}),
}));

export const courseRelations = relations(course, ({many}) => ({
	schedules: many(schedule),
}));

export const lecturerRelations = relations(lecturer, ({many}) => ({
	schedules: many(schedule),
}));

export const roomsRelations = relations(rooms, ({many}) => ({
	schedules: many(schedule),
}));