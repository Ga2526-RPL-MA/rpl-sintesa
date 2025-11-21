import UserRole from '../enums/UserRole';

export default class User {
    constructor(
        public id: string,
        public role: UserRole,
    ) {}
}
