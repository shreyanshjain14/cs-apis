import { IPostComment } from '@libs/common/interfaces';
import { Pagination, RepositoryContract } from '@libs/database';

export interface PostCommentRepositoryContract extends RepositoryContract<IPostComment> {}
