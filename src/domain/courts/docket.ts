import { AggregateRoot } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import { Extract } from './extract';

export class Docket extends AggregateRoot {
  _id: string;
  extracts: Extract[] = [];

  constructor(
    public name: string,
    public display: string,
  ) {
    super();
    this._id = uuid();
  }

  toString() {
    return `${this.display}`;
  }

  addExtract(extract: Extract) {
    const found = this.extracts.find(m => m._id === extract._id);
    if (found) {
      throw new Error(`Already Extract exists`);
    }
    this.extracts.push(extract);
  }

  changeDetails(name: string, display: string) {
    this.name = name;
    this.display = display;
  }
}
