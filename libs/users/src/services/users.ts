import { Inject, Injectable } from '@nestjs/common';

import { UserLibConstants } from '../constant';
import { PostRepositoryContract, TodoRepositoryContract } from '../repositories';
import { UserRepositoryContract } from '../repositories/users/contract';

@Injectable()
export class UserLibService {
  constructor(
    @Inject(UserLibConstants.USER_REPOSITORY)
    public readonly repo: UserRepositoryContract,
    @Inject(UserLibConstants.POST_REPOSITORY)
    public readonly postRepo: PostRepositoryContract,
    @Inject(UserLibConstants.TODO_REPOSITORY)
    public readonly todoRepo: TodoRepositoryContract
  ) {}
}
