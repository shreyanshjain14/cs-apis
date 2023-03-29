import { IUser, IUserSearchModel } from '@libs/common/interfaces';
import { IPost } from '@libs/common/interfaces/post';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { PostModel } from '@libs/users/models';
import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

import { UserModel } from '../../models/users';
import { PostRepositoryContract } from './contract';

@Injectable()
export class PostRepository extends DatabaseRepository<IPost> implements PostRepositoryContract {
  @InjectModel(PostModel)
  model: PostModel;

  async searchOne(filters?: IPost): Promise<IPost> {
    const query = this.query();

    if (filters.id) query.where("id", filters.id);
    const result = await query.limit(1).first();
    return result;
  }

  async search(inputs: IPost): Promise<Pagination<IPost>> {
    const query = this.query();

    if (inputs.q) {
      query.where((b) => {
        b.where("description", "ilike", `%${inputs.q}%`);
      });
    }

    if (inputs.status) {
      query.where("status", inputs.status);
    }

    return get(inputs, "paginate", true)
      ? query.paginate<IPost>(inputs.page, inputs.perPage)
      : query.allPages<IPost>();
  }
}
