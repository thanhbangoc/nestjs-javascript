import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CatsModule } from './cat/cats.module';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { policyMiddleware } from './middlewares/policy.middleware';
import ormConfig from './ormconfig';
import { authenticatedMiddleware } from './middlewares/authenticated.middleware';

@Module({
  controllers: [AppController],
  imports: [
    CatsModule,
    LoggerModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  providers: [AppService],
})

export class AppModule {
  configure(consumer) {
    consumer.apply(authenticatedMiddleware, policyMiddleware).forRoutes('*');
  }
}
