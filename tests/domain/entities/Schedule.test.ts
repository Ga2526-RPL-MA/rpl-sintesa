import Schedule from "@/src/domain/entities/Schedule";
import Hour from "@/src/domain/enums/Hour";
import WeekDay from "@/src/domain/enums/WeekDay";

describe('Testing Schedule Entity', () => {
    it('should create a Schedule instance', () => {
        const schedule: Schedule = {
            courseId: 1,
            roomId: 2,
            lecturerId: 3,
            weekDay: WeekDay['SENIN'],
            startHour: Hour['07:00'],
            endHour: Hour['08:50'],
        };

        expect(schedule).toBeDefined();
        expect(schedule.courseId).toBe(1);
        expect(schedule.roomId).toBe(2);
        expect(schedule.lecturerId).toBe(3);
        expect(schedule.weekDay).toBe(WeekDay['SENIN']);
        expect(schedule.startHour).toBe(Hour['07:00']);
        expect(schedule.endHour).toBe(Hour['08:50']);
    });

    // TODO: check if schedule would throw error when invalid data is provided
});