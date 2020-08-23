import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToClass, classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
import 'reflect-metadata';
import { FirstResponse } from './response.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';

  backendUrlGetResponse = 'http://localhost:3000'
  backendUrlEchoResponse = 'http://localhost:3000/echo'

  fakeResponse = {
    "stuff": {
      "moreStuff": {
        id: '343434343434343434343434',
        dateCreated: new Date()
      }
    }
  }

  fakeResponseTypes = {
    "stuff": {
      "moreStuff": {
        id: typeof this.fakeResponse.stuff.moreStuff.id,
        dateCreated: typeof (new Date(this.fakeResponse.stuff.moreStuff.dateCreated)),
        isDate: (this.fakeResponse.stuff.moreStuff.dateCreated instanceof Date)
      }
    }
  }

  firstResponse: FirstResponse
  firstResponseTypes
  secondResponse: FirstResponse
  secondResponseTypes

  constructor(private http: HttpClient) {

  }

  callToBackendClicked() {
    console.log('calling!');

    this.http.get<FirstResponse>(this.backendUrlGetResponse)
      .pipe(map(res => plainToClass(FirstResponse, res as Object)))
      .subscribe((data: FirstResponse) => {
        console.log('yep, got some data: ', data)
        console.log('data is type FirstResponse: ', data instanceof FirstResponse)
        console.log('nested dateCreated is date?: ', data.stuff.moreStuff.dateCreated instanceof Date)

        this.firstResponse = data

        this.firstResponseTypes = this.generateResponseTypesObject(data)

        this.echoResponseBack()

      })

  }

  generateResponseTypesObject(data: FirstResponse) {
    return {
      stuff: {
        moreStuff: {
          id: typeof data.stuff.moreStuff.id,
          dateCreated: typeof data.stuff.moreStuff.dateCreated,
          isDate: (data.stuff.moreStuff.dateCreated instanceof Date)
        }
      }
    }
  }

  echoResponseBack() {
    console.log('posting...')
    this.http.post<FirstResponse>(this.backendUrlEchoResponse, classToPlain(this.firstResponse))
    .pipe(map(res => plainToClass(FirstResponse, res as Object)))
    .subscribe(data => {
      console.log('got more data: ', data)
        console.log('second data is type FirstResponse: ', data instanceof FirstResponse)
        console.log('nested dateCreated is date?: ', data.stuff.moreStuff.dateCreated instanceof Date)

        this.secondResponse = data

        this.secondResponseTypes = this.generateResponseTypesObject(data)
    })
  }

}
