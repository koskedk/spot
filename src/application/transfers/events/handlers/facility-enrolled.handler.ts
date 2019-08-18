import { FacilityEnrolledEvent } from '../facility-enrolled.event';
import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  IDocketRepository,
  IFacilityRepository,
  IMasterFacilityRepository,
} from '../../../../domain';

@EventsHandler(FacilityEnrolledEvent)
export class FacilityEnrolledHandler
  implements IEventHandler<FacilityEnrolledEvent> {
  constructor(
    @Inject('IMasterFacilityRepository')
    private readonly masterFacilityRepository: IMasterFacilityRepository,
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
    private readonly publisher: EventPublisher,
  ) {}
  async handle(event: FacilityEnrolledEvent) {
    const facility = await this.facilityRepository.get(event._id);
    if (facility) {
      if (facility.masterFacility) {
        return;
      } else {
        const masterFacility = await this.masterFacilityRepository.findByCode(
          facility.code,
        );
        if (masterFacility) {
          facility.assignMasterFacility(masterFacility);

          const updatedFacility = await this.facilityRepository.update(
            facility,
          );
          this.publisher.mergeObjectContext(facility).commit();
        }
      }
    }
  }
}
