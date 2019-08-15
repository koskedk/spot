import { BaseRepository } from '../common/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFacilityRepository } from '../../domain/transfers/facility-repository.interface';
import { Facility } from '../../domain/transfers/facility';

export class FacilityRepository extends BaseRepository<Facility> implements IFacilityRepository {

  constructor(@InjectModel(Facility.name)model: Model<Facility>) {
    super(model);
  }
}
