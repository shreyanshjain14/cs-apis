import { ITodo } from '@libs/common/interfaces';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { TodoModel } from '@libs/users/models';
import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

import { TodoRepositoryContract } from './contract';

@Injectable()
export class TodoRepository extends DatabaseRepository<ITodo> implements TodoRepositoryContract {
  @InjectModel(TodoModel)
  model: TodoModel;

  async searchOne(filters?: ITodo): Promise<ITodo> {
    const query = this.query();

    if (filters.id) query.where("id", filters.id);
    const result = await query.limit(1).first();
    return result;
  }

  async search(inputs: ITodo): Promise<Pagination<ITodo>> {
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
      ? query.paginate<ITodo>(inputs.page, inputs.perPage)
      : query.allPages<ITodo>();
  }
}
