import { Module } from '@nestjs/common';
import { SeedReader } from './seed-reader';
import { DocketSeeder } from './docket.seeder';
import { CourtsInfrastructureModule } from '../courts/courts-infrastructure.module';

@Module({
  imports: [CourtsInfrastructureModule],
  providers: [
    SeedReader, DocketSeeder,
  ],
})
export class SeederModule {

  constructor(
    private readonly docketSeeder: DocketSeeder) {
  }

  async seedData() {
    await this.docketSeeder.seed();
  }
}
