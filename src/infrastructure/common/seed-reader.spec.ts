import { Injectable, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SeedReader } from './seed-reader';

describe('Seed Reader Tests', () => {
  let module: TestingModule;
  let seedReader: SeedReader;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [SeedReader],
    }).compile();
    seedReader = module.get<SeedReader>(SeedReader);
  });

  it('should get Seed files', async () => {
    const files = await seedReader.getFiles();
    expect(files.length).toBeGreaterThan(0);
    files.forEach(f => Logger.debug(`${f}`));
  });

  it('should read Seed', async () => {
    const teams = await seedReader.read( 'team');
    expect(teams.length).toBeGreaterThan(0);
    Logger.debug(teams);
  });
});
