import { ObjectId } from 'mongodb';
import { Type, Expose } from "class-transformer";
import { TransformObjectId } from './decorators/transform-object-id';


export class MoreStuff {

    @Expose({name: 'id'})
    @TransformObjectId()
    _id: ObjectId;

    @Type(() => Date)
    dateCreated: Date;
}

export class Stuff {
    @Type(() => MoreStuff)
    moreStuff: MoreStuff
}

export class FirstResponse {
    
    @Type(() => Stuff)
    stuff: Stuff
}
