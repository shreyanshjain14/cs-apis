import { IUserSearchModel } from '@libs/common/interfaces';
import { IPost } from '@libs/common/interfaces/post';
import { Pagination, RepositoryContract } from '@libs/database';

export interface PostRepositoryContract extends RepositoryContract<IPost> {
  searchOne(params?: IPost): Promise<IPost>;
  search(params?: IPost): Promise<Pagination<IPost>>;
}
