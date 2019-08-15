import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMasterFacilitiesQuery } from '../queries/get-master-facilities.query';
import { MasterFacilityDto } from '../../../domain/registries/dtos/master-facility.dto';
import { SaveMasterFacilityCommand } from '../commands/save-master-facility.command';
import { DeleteMasterFacilityCommand } from '../commands/delete-master-facility.command';
import { EventPattern } from '@nestjs/microservices';

@Controller('masterfacilities')
export class MasterFacilitiesController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get()
  async getMasterFacilities(): Promise<any> {
    return this.queryBus.execute(
      new GetMasterFacilitiesQuery(),
    );
  }

  @Post()
  async createOrUpdateMasterFacility(@Body() docket: MasterFacilityDto) {
    return this.commandBus.execute(
      new SaveMasterFacilityCommand(docket._id, docket.code, docket.name, docket.county, docket.mechanism),
    );
  }

  @Delete(':_id')
  async deleteMasterFacility(@Param('id') id) {
    return this.commandBus.execute(
      new DeleteMasterFacilityCommand(id),
    );
  }

  @EventPattern('AgencyCreatedEvent')
  async handleAgencyCreated(data: any) {
    Logger.log('Recieved New');
    Logger.log(data);
  }

  @EventPattern('AgencyUpdatedEvent')
  async handleAgencyUpdated(data: any) {
    Logger.log('Recieved Updates');
    Logger.log(data);
  }
}
