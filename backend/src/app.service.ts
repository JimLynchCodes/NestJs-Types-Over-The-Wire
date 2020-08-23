import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FirstResponse, MoreStuff, Stuff } from './response.models';

@Injectable()
export class AppService {
  
  getResponse(): FirstResponse {
    
    const firstReponse = new FirstResponse();
    
    firstReponse.stuff = new Stuff();
    
    firstReponse.stuff.moreStuff = new MoreStuff();

    firstReponse.stuff.moreStuff.dateCreated = new Date();
    firstReponse.stuff.moreStuff._id = ObjectId("55153a8014829a865bbf700d");
    
    console.log('first response is:', firstReponse)

    return firstReponse

  }
  
  handleEcho(firstResponse: FirstResponse): FirstResponse {
   
    console.log("heard the echoed response:\n", firstResponse);

    return firstResponse
  }

}
