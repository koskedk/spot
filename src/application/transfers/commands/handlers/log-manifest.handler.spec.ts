import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import {
  getTestFacilities,
  getTestMasterFacilities,
  getTestStatsData,
} from '../../../../../test/test.data';
import { Docket } from '../../../../domain/courts/docket';
import * as uuid from 'uuid';
import { Facility, IFacilityRepository } from '../../../../domain';
import { LogManifestCommand } from '../log-manifest.command';
import { LogManifestHandler } from './log-manifest.handler';
import { TransfersInfrastructureModule } from '../../../../infrastructure/transfers';

describe('Log Manifest Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  const { dockets, masterfacilities } = getTestStatsData();
  const { facilities } = getTestFacilities();
  const dbHelper = new TestDbHelper();
  const liveData = facilities[0];
  let facilityRepository: IFacilityRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        TransfersInfrastructureModule,
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('dockets', dockets);
    await dbHelper.seedDb('masterfacilities', masterfacilities);
    liveData.code = masterfacilities[0].code;
    await dbHelper.seedDb('facilities', [liveData]);

    const handler = module.get<LogManifestHandler>(LogManifestHandler);
    facilityRepository = module.get<IFacilityRepository>('IFacilityRepository');
    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(handler, LogManifestCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should log Manifest-New', async () => {
    const newFacility = facilities[1];
    newFacility.code = masterfacilities[1].code;
    const command = new LogManifestCommand(
      uuid.v1(),
      newFacility.code,
      newFacility.name,
      dockets[0].name,
      new Date(),
      new Date(),
      100,
      '',
    );
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();

    const facility = await facilityRepository.findByCode(newFacility.code);
    expect(facility).not.toBeNull();
    Logger.log(facility);
  });
});
