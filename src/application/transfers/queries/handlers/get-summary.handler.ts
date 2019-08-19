import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSummaryQuery } from '../get-summary.query';
import { GetDocketsQuery } from '../../../courts/queries';
import { DocketDto } from '../../../../domain';

@QueryHandler(GetSummaryQuery)
export class GetSummaryHandler implements IQueryHandler<GetSummaryQuery, any> {
  execute(query: GetSummaryQuery): Promise<any> {
    return undefined;
  }
}
