import { AggregateRoot } from '@nestjs/cqrs';

export class MasterFacility extends AggregateRoot {

  constructor(
    public _id: string,
    public code: number,
    public name: string,
    public county?: any,
    public mechanism?: any,
  ) {
    super();
  }
}
