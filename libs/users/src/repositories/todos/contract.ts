import { ITodo } from '@libs/common/interfaces';
import { Pagination, RepositoryContract } from '@libs/database';

export interface TodoRepositoryContract extends RepositoryContract<ITodo> {
  searchOne(params?: ITodo): Promise<ITodo>;
  search(params?: ITodo): Promise<Pagination<ITodo>>;
}
