import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { MasterFacilityDeletedEvent } from '../master-facility-deleted.event';

@EventsHandler(MasterFacilityDeletedEvent)
export class DocketDeletedEventHandler implements IEventHandler<MasterFacilityDeletedEvent> {
  handle(event: MasterFacilityDeletedEvent): any {
    Logger.debug(`=== MasterFacilityDeleted ===:${event._id}`);
  }
}
