export class Alert {
    title: string;
    message: string;
    type: AlertType;

    constructor(title, message, type){
       this.title = title;
       this.message = message;
       this.type = type;
    }
}

export enum AlertType{
    SUCCESS,
    ERROR,
    WARNING,
    INFO
}
