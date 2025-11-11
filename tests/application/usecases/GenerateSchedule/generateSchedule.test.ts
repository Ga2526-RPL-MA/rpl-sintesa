import GenerateSchedule from "@/src/application/usecases/generateSchedule";

describe('Testing GenerateSchedule Usecase', () => {
    let lecturersList: string[];
    let coursesList: string[];
    let roomsList: string[];
    let weekDaysList: string[];
    let hoursList: string[];

    beforeEach(() => {
        lecturersList = [
            "A","B","C","D","E",
            "F","G","H","I","J"
        ]
        coursesList = [
            "ER234501","ER234502","ER234503","ER234504","ER234505",
            "ER234506","ER234507","ER234508","ER234509","ER234510",
            "ER234511","ER234512","ER234513","ER234514","ER234515",
            "ER234516","ER234517","ER234518","ER234519","ER234520",
        ]
        roomsList = [
            "IF-101","IF-102","IF-103","IF-104","IF-105","IF-106",
            "IF-107","IF-108","IF-110","IF-111","IF-112",
            "IF-113","RBTC","LP-1","LP-2","SKPB","Lab. NETICS","Aula"
        ]
        hoursList = [
            "07:00","07:50","08:00","08:50","09:00","09:50",
            "10:00","10:50","11:00","11:50","12:00","12:50",
            "13:30","14:20","14:30","15:20","15:30","16:20",
            "16:30","17:20","17:30","18:20","18:30","19:20",
            "19:30","20:20"
        ]
        weekDaysList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
       
    }); 

    it('should generate schedule for given courses', () => {
        const scheduleList = GenerateSchedule({
            lecturersList,
            coursesList,
            roomsList,
            weekDaysList,
            hoursList,
            semester: 'GASAL',
            year: '2023/2024',
            userId: 'user-123',
        });

        expect(scheduleList).toBeDefined();
        expect(scheduleList.schedules.length).toBe(coursesList.length);
    });

    it('should not have overlapping schedules', () => {
        const scheduleList = GenerateSchedule({
            lecturersList,
            coursesList,
            roomsList,
            weekDaysList,
            hoursList,
            semester: 'GASAL',
            year: '2023/2024',
            userId: 'user-123',
        });

        expect(scheduleList).toBeDefined();
        expect(scheduleList.schedules.length).toBe(coursesList.length);
        expect(new Set(scheduleList.schedules.map(s => `${s.weekDay}-${s.startHour}-${s.endHour}-${s.roomId}`)).size).toBe(scheduleList.schedules.length);
    });

    // TODO: check if schedule in jumat have any courses in between 10:50 - 13:30
    // TODO: check if it can return an error when max iteration is reached
    // TODO: check if all schedule properties are valid
    // TODO: check if no duplicate room or lecturer in the same time slot
    // TODO: check if schedule adheres to specific rules (e.g., certain courses must be scheduled at specific times)
    // TODO: check if schedule adheres to specific lecturer availability in course assignment
    // TODO: check if schedule adheres to room capacity and type based on course requirements
});