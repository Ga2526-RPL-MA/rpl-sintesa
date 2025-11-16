export default class Course {
    constructor(
        public id: number,
        public createdAt: Date,
        public code: string,
        public name: string,
        public sks: number,
        public description: string,
        public semester: number,
    ) {}
}
