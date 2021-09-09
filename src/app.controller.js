import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';
import { Controller, Dependencies, Get } from '@nestjs/common';

@Controller()
@Dependencies(AppService, LoggerService)
export class AppController {
  constructor(appService, logger) {
    this.appService = appService;
    
    this.log = logger;
    this.log.setContext('AppService');
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
