import { AggregateRoot } from '@nestjs/cqrs';
import { Manifest } from './manifest';
import { Summary } from './summary';
import { MasterFacility } from '../registries/master-facility';

export class Facility extends AggregateRoot {
  manifests?: Manifest[] = [];
  summaries?: Summary[] = [];
  masterFacility?: MasterFacility;

  constructor(
    public _id: string,
    public code: number,
    public name: string,
  ) {
    super();
  }
}
