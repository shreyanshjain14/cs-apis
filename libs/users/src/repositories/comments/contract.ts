import { IComment } from '@libs/common/interfaces';
import { Pagination, RepositoryContract } from '@libs/database';

export interface CommentRepositoryContract extends RepositoryContract<IComment> {
  searchOne(params?: IComment): Promise<IComment>;
  search(params?: IComment): Promise<Pagination<IComment>>;
}
