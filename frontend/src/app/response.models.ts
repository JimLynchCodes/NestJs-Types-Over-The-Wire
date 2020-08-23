import { Type } from "class-transformer";

export class FirstResponse {

    @Type(() => Stuff)
    stuff: Stuff
}

class Stuff {

    @Type(() => MoreStuff)
    moreStuff: MoreStuff
}

class MoreStuff {
    id: string;

    @Type(() => Date)
    dateCreated: Date;
}