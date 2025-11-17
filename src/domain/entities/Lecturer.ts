export default class Lecturer {
    constructor(
        public id: number,
        public createdAt: Date,
        public nip: string,
        public name: string,
        public faculty: string,
        public expertise: string,
        public code: string,
    ) {}
}
