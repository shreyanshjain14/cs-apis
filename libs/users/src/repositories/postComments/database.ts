import { IComment, IPostComment } from '@libs/common/interfaces';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { CommentModel } from '@libs/users/models';
import { PostCommentModel } from '@libs/users/models/postComments';
import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

import { PostCommentRepositoryContract } from './contract';

@Injectable()
export class PostCommentRepository
  extends DatabaseRepository<IPostComment>
  implements PostCommentRepositoryContract
{
  @InjectModel(PostCommentModel)
  model: PostCommentModel;
}
