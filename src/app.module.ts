import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederModule } from './infrastructure/seeder/seeder.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CourtsModule } from './application/courts/courts.module';

const cloudUrl = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiStats?retryWrites=true&w=majority`;
const localUrl = 'mongodb://localhost/dwapiStats';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(cloudUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),  CourtsModule, SeederModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
