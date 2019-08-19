import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LogManifestCommand } from '../log-manifest.command';
import { InitializeSummariesCommand } from '../initialize-summaries-command';
import { Inject } from '@nestjs/common';
import {
  Docket,
  Facility,
  IDocketRepository,
  IFacilityRepository,
  Summary,
} from '../../../../domain';
import { plainToClass } from 'class-transformer';

@CommandHandler(InitializeSummariesCommand)
export class InitializeSummariesHandler
  implements ICommandHandler<InitializeSummariesCommand> {
  constructor(
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
    @Inject('IDocketRepository')
    private readonly docketRepository: IDocketRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: InitializeSummariesCommand): Promise<any> {
    let facility = await this.facilityRepository.get(command.facilityId);
    if (facility) {
      facility = plainToClass(Facility, facility);
      const manifest = facility.manifests.find(
        m => m.mId === command.manifestId,
      );
      if (manifest) {
        let docket = await this.docketRepository.findByName(manifest.docket);
        if (docket && docket.extracts && docket.extracts.length > 0) {
          docket = plainToClass(Docket, docket);
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
