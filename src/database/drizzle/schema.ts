import {
    pgTable,
    foreignKey,
    bigint,
    timestamp,
    text,
    uuid,
    pgPolicy,
    smallint,
    integer,
    pgEnum,
    pgSchema,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const hour = pgEnum('HOUR', [
    '07:00',
    '07:50',
    '08:00',
    '08:50',
    '09:00',
    '09:50',
    '10:00',
    '10:50',
    '11:00',
    '11:50',
    '12:00',
    '12:50',
    '13:30',
    '14:20',
    '14:30',
    '15:20',
    '15:30',
    '16:20',
    '16:30',
    '17:20',
    '17:30',
    '18:20',
    '18:30',
    '19:20',
    '19:30',
    '20:20',
]);
export const semester = pgEnum('SEMESTER', ['GASAL', 'GENAP']);
export const userType = pgEnum('USER_TYPE', ['STUDENT', 'LECTURER']);
export const weekday = pgEnum('WEEKDAY', [
    'SENIN',
    'SELASA',
    'RABU',
    'KAMIS',
    'JUMAT',
]);
export const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
});

export const scheduleList = pgTable(
    'schedule_list',
    {
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        id: bigint({ mode: 'number' })
            .primaryKey()
            .generatedByDefaultAsIdentity({
                name: 'schedule_list_id_seq',
                startWith: 1,
                increment: 1,
                minValue: 1,
                maxValue: 9223372036854775807,
                cache: 1,
            }),
        createdAt: timestamp('created_at', {
            withTimezone: true,
            mode: 'string',
        })
            .defaultNow()
            .notNull(),
        semester: semester().notNull(),
        year: text().notNull(),
        userId: uuid('user_id').notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: 'schedule_list_user_id_fkey',
        })
            .onUpdate('cascade')
            .onDelete('cascade'),
    ],
);

export const course = pgTable(
    'course',
    {
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        id: bigint({ mode: 'number' })
            .primaryKey()
            .generatedByDefaultAsIdentity({
                name: 'course_id_seq',
                startWith: 1,
                increment: 1,
                minValue: 1,
                maxValue: 9223372036854775807,
                cache: 1,
            }),
        createdAt: timestamp('created_at', {
            withTimezone: true,
            mode: 'string',
        })
            .defaultNow()
            .notNull(),
        code: text().notNull(),
        name: text().notNull(),
        sks: smallint().notNull(),
        description: text().default('').notNull(),
        semester: integer().notNull(),
    },
    () => [
        pgPolicy('Enable delete for users based on user_id', {
            as: 'permissive',
            for: 'delete',
            to: ['supabase_admin'],
            using: sql`true`,
        }),
        pgPolicy('Enable insert for authenticated users only', {
            as: 'permissive',
            for: 'insert',
            to: ['supabase_admin'],
        }),
        pgPolicy('Enable read access for all users', {
            as: 'permissive',
            for: 'select',
            to: ['public'],
        }),
        pgPolicy('Policy with table joins', {
            as: 'permissive',
            for: 'update',
            to: ['supabase_admin'],
        }),
    ],
);

export const rooms = pgTable(
    'rooms',
    {
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        id: bigint({ mode: 'number' })
            .primaryKey()
            .generatedByDefaultAsIdentity({
                name: 'rooms_id_seq',
                startWith: 1,
                increment: 1,
                minValue: 1,
                maxValue: 9223372036854775807,
                cache: 1,
            }),
        createdAt: timestamp('created_at', {
            withTimezone: true,
            mode: 'string',
        })
            .defaultNow()
            .notNull(),
        name: text().notNull(),
        capacity: integer().default(50).notNull(),
    },
    () => [
        pgPolicy('Enable delete for users based on user_id', {
            as: 'permissive',
            for: 'delete',
            to: ['supabase_admin'],
            using: sql`true`,
        }),
        pgPolicy('Enable insert for authenticated users only', {
            as: 'permissive',
            for: 'insert',
            to: ['supabase_admin'],
        }),
        pgPolicy('Enable read access for all users', {
            as: 'permissive',
            for: 'select',
            to: ['public'],
        }),
        pgPolicy('Enable update for users based on user_id', {
            as: 'permissive',
            for: 'update',
            to: ['supabase_admin'],
        }),
    ],
);

export const schedule = pgTable(
    'schedule',
    {
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        id: bigint({ mode: 'number' })
            .primaryKey()
            .generatedByDefaultAsIdentity({
                name: 'schedule_id_seq',
                startWith: 1,
                increment: 1,
                minValue: 1,
                maxValue: 9223372036854775807,
                cache: 1,
            }),
        createdAt: timestamp('created_at', {
            withTimezone: true,
            mode: 'string',
        })
            .defaultNow()
            .notNull(),
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        courseId: bigint('course_id', { mode: 'number' }).notNull(),
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        roomId: bigint('room_id', { mode: 'number' }).notNull(),
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        lecturerId: bigint('lecturer_id', { mode: 'number' }).notNull(),
        weekDay: weekday('week_day').notNull(),
        startHour: hour('start_hour').notNull(),
        endHour: hour('end_hour').notNull(),
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        scheduleListId: bigint('schedule_list_id', {
            mode: 'number',
        }).notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.courseId],
            foreignColumns: [course.id],
            name: 'schedule_course_id_fkey',
        })
            .onUpdate('cascade')
            .onDelete('set null'),
        foreignKey({
            columns: [table.lecturerId],
            foreignColumns: [lecturer.id],
            name: 'schedule_lecturer_id_fkey',
        })
            .onUpdate('cascade')
            .onDelete('set null'),
        foreignKey({
            columns: [table.roomId],
            foreignColumns: [rooms.id],
            name: 'schedule_room_id_fkey',
        })
            .onUpdate('cascade')
            .onDelete('set null'),
        foreignKey({
            columns: [table.scheduleListId],
            foreignColumns: [scheduleList.id],
            name: 'schedule_schedule_list_id_fkey',
        })
            .onUpdate('cascade')
            .onDelete('set null'),
    ],
);

export const lecturer = pgTable(
    'lecturer',
    {
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        id: bigint({ mode: 'number' })
            .primaryKey()
            .generatedByDefaultAsIdentity({
                name: 'lecturer_ids_seq',
                startWith: 1,
                increment: 1,
                minValue: 1,
                maxValue: 9223372036854775807,
                cache: 1,
            }),
        createdAt: timestamp('created_at', {
            withTimezone: true,
            mode: 'string',
        })
            .defaultNow()
            .notNull(),
        nip: text().notNull(),
        name: text().notNull(),
        faculty: text().notNull(),
        expertise: text().default('').notNull(),
        code: text().notNull(),
    },
    () => [
        pgPolicy('Enable delete for users based on user_id', {
            as: 'permissive',
            for: 'delete',
            to: ['supabase_admin'],
            using: sql`true`,
        }),
        pgPolicy('Enable insert for authenticated users only', {
            as: 'permissive',
            for: 'insert',
            to: ['supabase_admin'],
        }),
        pgPolicy('Enable read access for all users', {
            as: 'permissive',
            for: 'select',
            to: ['public'],
        }),
        pgPolicy('Policy with table joins', {
            as: 'permissive',
            for: 'update',
            to: ['supabase_admin'],
        }),
    ],
);
