export class Info {
    id: string;
    fee: number;
    info: string;
    start: Date;
    end: Date;
    constructor(init?: Partial<Info>) {
        Object.assign(this, init);
    }
}
