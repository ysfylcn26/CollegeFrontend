import {UserTable} from './user.table';

export class PageTable {
    users: UserTable[];
    size: number;

    constructor(users: UserTable[], size: number){
        this.users = users;
        this.size = size;
    }
}
