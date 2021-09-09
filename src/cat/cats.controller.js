import { Controller, Get, Post, Body, Bind, Dependencies } from '@nestjs/common';
import { CatsService } from './cats.service';
import { LoggerService } from '../logger/logger.service';
import { Validate } from '../decorators/validate.decorator';
import { CreateCatDto } from './dto/create-cat.dto';
import { CurrentUser } from '../decorators/user.decorator';
import { Policies } from '../decorators/policies.decorator';

@Controller('Cats')
@Dependencies(CatsService, LoggerService)
export class CatsController {

  constructor(catsService, logger) {
    this.catsService = catsService;
    this.log = logger;
    this.log.setContext("CatsService")

    // TODO: this is sample for logger. it should be remove on the future
    let err = new Error("test");
    let object = {
      title: "title",
      desc: "description"
    }
    this.log.log(object);
    this.log.log(err);
    this.log.log("hello cats service")
    this.log.error("you have error","trace error content")
    this.log.warn("warn cats service")
    this.log.debug("debug cats service")
    this.log.verbose("verbose cats service")
  
  }

  @Post()
  @Bind(Body(), CurrentUser(), Policies())
  @Validate(CreateCatDto)
  async create(createCatDto, user, policies) {
    this.log.log('policies-----', policies);
    this.log.log('curent user-----', user);
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }
}
