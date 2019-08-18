import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import {
  getTestFacilities,
  getTestMasterFacilities,
} from '../../../../../test/test.data';
import { Docket } from '../../../../domain/courts/docket';
import * as uuid from 'uuid';
import { Facility } from '../../../../domain';
import { LogManifestCommand } from '../log-manifest.command';
import { LogManifestHandler } from './log-manifest.handler';
import { TransfersInfrastructureModule } from '../../../../infrastructure/transfers';

describe('Log Manifest Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  const { dockets, masterFacilities, facilities } = getTestFacilities();
  const dbHelper = new TestDbHelper();
  let liveData: Facility;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        TransfersInfrastructureModule,
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('dockets', dockets);
    await dbHelper.seedDb('masterfacilities', masterFacilities);
    await dbHelper.seedDb('facilities', facilities);

    const handler = module.get<LogManifestHandler>(LogManifestHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(handler, LogManifestCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should log Manifest', async () => {
    // const command = new LogManifestCommand(3343, 'Demo');
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });
});
