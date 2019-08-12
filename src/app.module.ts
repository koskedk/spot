import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederModule } from './infrastructure/seeder.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot('mongodb://192.168.100.3/dwapiSpot', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }), SeederModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
