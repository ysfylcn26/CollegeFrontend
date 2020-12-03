import {Country} from '../component/dto/country';
import {College} from '../component/dto/college';
import {Department} from '../component/dto/department';

export class ResultValues {
    countries: Country[] = [];
    colleges: College[] = [];
    degrees: string[] = [];
    departments: Department[] = [];

    constructor(){
        this.countries = [];
        this.colleges = [];
        this.degrees = [];
        this.departments = [];
    }
}
