import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { getTestFacilities } from '../../../test/test.data';
import { TransfersInfrastructureModule } from './transfers-infrastructure.module';
import { IFacilityRepository } from '../../domain/transfers/facility-repository.interface';

describe('Facility Repository  Tests', () => {
  let module: TestingModule;
  let repository: IFacilityRepository;
  const dbHelper = new TestDbHelper();
  const testFacilities = getTestFacilities();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TransfersInfrastructureModule,
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('facilities', testFacilities);
    repository = module.get<IFacilityRepository>('IFacilityRepository');
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load Facilities', async () => {
    const facilities = await repository.getAll();
    expect(facilities.length).toBeGreaterThan(0);
    facilities.forEach(d => Logger.debug(`${d.name}`),
    );
  });
});
