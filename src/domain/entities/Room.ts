export default class Room {
    constructor(
        public id: number,
        public createdAt: Date,
        public name: string,
        public capacity: number,
    ) {}
}
