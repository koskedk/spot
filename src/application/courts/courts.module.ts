import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetDocketsHandler } from './queries/handlers/get-dockets.handler';
import { DocketsController } from './controllers/dockets.controller';
import { SaveDocketHandler } from './commands/handlers/save-docket.handler';
import { DeleteDocketHandler } from './commands/handlers/delete-docket.handler';
import { DocketCreatedEventHandler } from './events/handlers/docket-created.handler';
import { DocketDeletedEventHandler } from './events/handlers/docket-deleted.handler';
import { DocketUpdatedEventHandler } from './events/handlers/docket-updated.handler';
import { CourtsInfrastructureModule } from '../../infrastructure/courts/courts-infrastructure.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'GLOBE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://192.168.100.3:5672`],
          queue: 'cats_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    CourtsInfrastructureModule,
  ],
  controllers: [DocketsController],
  providers: [
    SaveDocketHandler,
    DeleteDocketHandler,
    GetDocketsHandler,
    DocketCreatedEventHandler,
    DocketDeletedEventHandler,
    DocketUpdatedEventHandler,
  ],
})
export class CourtsModule {}
