import { Semester } from "../enums/Semester";
import { WeekDay } from "../enums/WeekDay";

export default class Schedule {
  id: Number;
  courseId: Number;
  roomId: Number;
  weekDay: WeekDay;
  startHour: string;
  endHour: string;
  semester: Semester;
  lecturerId: Number;
  year: string;
  userId: string;

  constructor(id: Number, courseId: Number, roomId: Number, weekDay: WeekDay, startHour: string, endHour: string, semester: Semester, lecturerId: Number, year: string, userId: string){
    this.id = id;
    this.courseId = courseId;
    this.roomId = roomId;
    this.weekDay = weekDay;
    this.startHour = startHour;
    this.endHour = endHour;
    this.semester = semester;
    this.lecturerId = lecturerId;
    this.year = year;
    this.userId = userId;
  }
}