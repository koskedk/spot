import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { DocketRepository } from './docket.repository';
import { docketSchema } from './schemas/docket.schema';
import { Docket } from '../../domain/courts/docket';
import { getTestDockets } from '../../../test/test.data';
import { IDocketRepository } from '../../domain/courts/docket-repository.interface';

describe('Docket Repository  Tests', () => {
  let module: TestingModule;
  let repository: DocketRepository;
  const dbHelper = new TestDbHelper();
  const testDockets = getTestDockets();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: Docket.name, schema: docketSchema }]),
      ],
      providers: [DocketRepository],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('dockets', testDockets);
    repository = module.get<DocketRepository>(DocketRepository);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load Dockets', async () => {
    const dockets = await repository.getAll();
    expect(dockets.length).toBeGreaterThan(0);
    const { extracts } = dockets[0];
    expect(extracts.length).toBeGreaterThan(0);
    dockets.forEach(d => {
      Logger.debug(`${d.display}`);
      d.extracts.map(e => Logger.debug(` >> ${e.display} `));
    });
  });
});
