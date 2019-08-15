import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MasterFacilitiesController } from './controllers/dockets.controller';
import { SaveMasterFacilityHandler } from './commands/handlers/save-docket.handler';
import { DeleteMasterFacilityHandler } from './commands/handlers/delete-docket.handler';
import { DocketCreatedEventHandler } from './events/handlers/docket-created.handler';
import { DocketDeletedEventHandler } from './events/handlers/docket-deleted.handler';
import { DocketUpdatedEventHandler } from './events/handlers/docket-updated.handler';
import { CourtsInfrastructureModule } from '../../infrastructure/courts/courts-infrastructure.module';
import { RegistriesInfrastructureModule } from '../../infrastructure/registries/registries-infrastructure.module';
import { TransfersInfrastructureModule } from '../../infrastructure/transfers/transfers-infrastructure.module';
import { GetMasterFacilitiesHandler } from './queries/handlers/get-master-facilities.handler';
import { GetDocketsHandler } from '../courts/queries/handlers/get-dockets.handler';

@Module({
  imports: [
    CqrsModule,
    RegistriesInfrastructureModule,
    TransfersInfrastructureModule,
    CourtsInfrastructureModule,
  ],
  controllers: [MasterFacilitiesController],
  providers: [
    SaveMasterFacilityHandler, DeleteMasterFacilityHandler,
    GetMasterFacilitiesHandler, GetDocketsHandler,
    DocketCreatedEventHandler, DocketDeletedEventHandler, DocketUpdatedEventHandler],
})
export class RegistriesModule {

}
