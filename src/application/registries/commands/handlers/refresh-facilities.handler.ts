import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RefreshFacilitiesCommand } from '../refresh-facilities.command';

@CommandHandler(RefreshFacilitiesCommand)
export class RefreshFacilitiesHandler implements ICommandHandler<RefreshFacilitiesHandler> {
  constructor(
    @Inject('GLOBE_SERVICE') private readonly client: ClientProxy,
    private readonly eventBus: EventBus) {
  }

  async execute(command: RefreshFacilitiesHandler): Promise<any[]> {
    const pattern = { cmd: 'facilities.index' };
    Logger.log('connecting');
    try {
      await this.client.connect();
    } catch (e) {
      Logger.error(e);
      throw Error(e);
    }
    return await this.client.send<any[]>(pattern, []).toPromise();
  }
}
