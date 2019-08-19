import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransfersInfrastructureModule } from '../../infrastructure/transfers';
import { LogManifestCommand } from './commands/log-manifest.command';
import { UpdateStatsHandler } from './commands/handlers/update-stats.handler';
import { FacilityManifestSaga } from './sagas/facility-manifest.saga';
import { ManifestController } from './controllers/manifest.controller';
import { AssignMasterFacilityHandler } from './commands/handlers/assign-master-facility.handler';
import { InitializeSummariesHandler } from './commands/handlers/initialize-summaries.handler';
import { LogManifestHandler } from './commands/handlers/log-manifest.handler';
import { RegistriesInfrastructureModule } from '../../infrastructure/registries';
import { CourtsInfrastructureModule } from '../../infrastructure/courts';
import { GetStatsHandler } from './queries/handlers/get-stats.handler';
import { GetSummaryHandler } from './queries/handlers/get-summary.handler';

const CommandHandlers = [
  LogManifestHandler,
  UpdateStatsHandler,
  AssignMasterFacilityHandler,
  InitializeSummariesHandler,
];
// const EventHandlers = [];
const QueryHandlers = [GetStatsHandler, GetSummaryHandler];
const Sagas = [FacilityManifestSaga];
@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'GLOBE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://192.168.100.3:5672/spot`],
          queue: 'stats_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    TransfersInfrastructureModule,
    RegistriesInfrastructureModule,
    CourtsInfrastructureModule,
  ],
  controllers: [ManifestController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class TransfersModule {}
