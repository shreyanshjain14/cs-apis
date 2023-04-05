import { Transformer } from '@libs/boat';
import { ITodo } from '@libs/common/interfaces';

export class TodoTransformer extends Transformer {
  async transform(model: ITodo): Promise<ITodo> {
    return {
      id: model.id,
      todoDescription: model.todoDescription,
      status: model.status,
      createdAt: model.createdAt,
    };
  }
}
