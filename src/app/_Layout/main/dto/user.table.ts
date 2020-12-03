import {Country} from '../component/dto/country';
import {FormControl, Validators} from '@angular/forms';

export class UserTable{
    userId: string;
    username: string;
    role: string;
    country: Country;
    pass: string;
    constructor(userId: string, username: string, role: string, country: Country, pass: string){
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.country = country;
        this.pass = pass;
    }
}
