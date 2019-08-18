import { IRepository } from '../../application/common/repository.interface';
import { MasterFacility } from './master-facility';

export interface IMasterFacilityRepository extends IRepository<MasterFacility> {
  findByCode(code: number): Promise<MasterFacility>;
}
