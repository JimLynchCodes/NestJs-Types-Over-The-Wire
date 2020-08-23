import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FirstResponse } from './response.models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getResponse(): FirstResponse {
    return this.appService.getResponse();
  }
  
  @Post('echo')
  getHello(@Body() echoedResponse: FirstResponse): FirstResponse {
    return this.appService.handleEcho(echoedResponse);
  }
}
