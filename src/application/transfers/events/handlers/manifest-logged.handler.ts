import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ManifestLoggedEvent } from '../manifest-logged.event';
import { Inject } from '@nestjs/common';
import {
  IDocketRepository,
  IFacilityRepository,
  IMasterFacilityRepository,
  Summary,
} from '../../../../domain';

@EventsHandler(ManifestLoggedEvent)
export class ManifestLoggedHandler
  implements IEventHandler<ManifestLoggedEvent> {
  constructor(
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
    @Inject('IDocketRepository')
    private readonly docketRepository: IDocketRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async handle(event: ManifestLoggedEvent) {
    const facility = await this.facilityRepository.get(event.facilityId);
    if (facility) {
      const manifest = facility.manifests.find(m => m.mId === event.manifestId);
      if (manifest) {
        const docket = await this.docketRepository.findByName(manifest.docket);
        if (docket && docket.extracts && docket.extracts.length > 0) {
          const extracts = docket.extracts.sort((a, b) => a.rank - b.rank);
          extracts.forEach(e => {
            if (!facility.summaryHasExtract(e._id)) {
              const summary = new Summary(
                { id: docket._id, name: docket.name, display: docket.display },
                e,
              );
              if (e.isPatient) {
                summary.expected = manifest.patientCount;
                summary.recieved = 0;
                summary.updated = new Date();
              }
              facility.addSummary(summary);
            } else {
              if (e.isPatient) {
                facility.resetSummary(e._id, manifest.patientCount, new Date());
              } else {
                facility.resetSummary(e._id, null, new Date());
              }
            }
          });
          const updatedFacility = await this.facilityRepository.update(
            facility,
          );
          this.publisher.mergeObjectContext(facility).commit();
        }
      }
    }
  }
}
