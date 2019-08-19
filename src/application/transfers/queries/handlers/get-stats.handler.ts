import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDocketsQuery } from '../../../courts/queries';
import { GetStatsQuery } from '../get-stats.query';

@QueryHandler(GetStatsQuery)
export class GetStatsHandler implements IQueryHandler<GetDocketsQuery, any> {
  execute(query: GetDocketsQuery): Promise<any> {
    return undefined;
  }
}
