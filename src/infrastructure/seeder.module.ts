import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedReader } from './common/seed-reader';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
    MongooseModule.forFeature([{ name: 'County', schema: countySchema }]),
  ],
  providers: [
    SeedReader,
  ],
})
export class SeederModule {

  constructor(
    private readonly locationSeeder: LocationSeeder,
    private readonly practiceSeeder: PracticeSeeder) {
  }

  async seedData() {
    await this.locationSeeder.seed();
    await this.practiceSeeder.seed();
  }
}
