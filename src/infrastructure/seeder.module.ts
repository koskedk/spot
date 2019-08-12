import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedReader } from './common/seed-reader';
import { LocationSeeder } from './locations/location.seeder';
import { PracticeSeeder } from './practices/practice.seeder';
import { AgencyRepository } from './practices/agency.repository';
import { LocationRepository } from './locations/location.repository';
import { agencySchema } from '../core/application/practices/schemas/agency-schema';
import { countySchema } from '../core/application/locations/schemas/county-schema';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
    MongooseModule.forFeature([{ name: 'County', schema: countySchema }]),
  ],
  providers: [
    SeedReader, PracticeSeeder, AgencyRepository, LocationSeeder, LocationRepository,
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
