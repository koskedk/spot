import { Docket } from '../../core/domain/depots/docket';

export const getTestDockets = (count = 2) => {
  const cars: Docket[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(new Docket(`id${i}`, `county${i}`));
  }
  return cars;
};

