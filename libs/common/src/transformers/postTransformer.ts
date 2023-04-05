import { Transformer } from '@libs/boat';
import { IPost } from '@libs/common/interfaces';

export class PostTransformer extends Transformer {
  async transform(model: IPost): Promise<IPost> {
    return {
      id: model.id,
      description: model.description,
      status: model.status,
      createdAt: model.createdAt,
    };
  }
}
