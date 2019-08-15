import { Docket } from '../src/domain/courts/docket';
import { Extract } from '../src/domain/courts/extract';
import { MasterFacility } from '../src/domain/registries/master-facility';
import * as uuid from 'uuid';
import { Facility } from '../src/domain/transfers/facility';

export const getTestDockets = (count = 2, dcount = 2) => {
  const data: Docket[] = [];
  for (let i = 0; i < count; i++) {
    const docket = new Docket(`DC${i}`, `Docket-${i}`);
    for (let j = 0; j < dcount; j++) {
      docket.addExtract(new Extract(`Ex${j}`, `Extract-${j}`));
    }
    data.push(docket);
  }
  return data;
};

export const getTestMasterFacilities = (count = 2) => {
  const data: MasterFacility[] = [];
  for (let i = 0; i < count; i++) {
    data.push(new MasterFacility(uuid.v1(), i * 13, `Fname${i}`));
  }
  return data;
};

export const getTestFacilities = (count = 2) => {
  const data: Facility[] = [];
  for (let i = 0; i < count; i++) {
    data.push(new Facility(uuid.v1(), i * 12, `fname${i}`));
  }
  return data;
};
