import { IComment } from '@libs/common/interfaces';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { CommentModel } from '@libs/users/models';
import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

import { CommentRepositoryContract } from './contract';

@Injectable()
export class CommentRepository
  extends DatabaseRepository<IComment>
  implements CommentRepositoryContract
{
  @InjectModel(CommentModel)
  model: CommentModel;

  async searchOne(filters?: IComment): Promise<IComment> {
    const query = this.query();

    if (filters.id) query.where("id", filters.id);
    const result = await query.limit(1).first();
    return result;
  }

  async search(inputs: IComment): Promise<Pagination<IComment>> {
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
      ? query.paginate<IComment>(inputs.page, inputs.perPage)
      : query.allPages<IComment>();
  }
}
