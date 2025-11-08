import ScheduleList from "@/src/domain/entities/ScheduleList";
import ScheduleListRepository from "@/src/domain/repositories/ScheduleListRepository";

export default async function AddScheduleList(newScheduleList: ScheduleList, scheduleListRepository: ScheduleListRepository): Promise<ScheduleList>{
    try {
        return await scheduleListRepository.AddScheduleList(newScheduleList);
    } catch(err) {
        throw new Error(err instanceof Error? err.message : `Error: AddScheduleList(${newScheduleList}, ${scheduleListRepository})`);
    }
}