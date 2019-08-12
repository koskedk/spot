import { Agency } from '../../core/domain/practices/agency';
import { County } from '../../core/domain/locations/county';

export const getTestCounties = (count = 2) => {
  const cars: County[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(new County(i, `county${i}`));
  }
  return cars;
};

export const getTestAgencies = (count = 2) => {
  const cars: Agency[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(new Agency(`agency${i}`, `id${i}`));
  }
  return cars;
};
