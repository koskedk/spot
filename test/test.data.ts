import { Docket } from '../src/domain/courts/docket';
import { Extract } from '../src/domain/courts/extract';

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
