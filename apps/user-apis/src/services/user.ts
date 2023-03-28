import { IUser } from '@libs/common';
import { Pagination } from '@libs/database';
import { UserLibService } from '@libs/users';
import { Injectable } from '@nestjs/common';

import { UpdateUserProfileDto } from '../dtos';

@Injectable()
export class UserApiService {
  constructor(private readonly service: UserLibService) {}

  async updateUserProfile(inputs: UpdateUserProfileDto, authUser: IUser): Promise<IUser> {
    return (await this.service.repo.updateAndReturn({ id: authUser.id }, inputs)) as IUser;
  }

  async getUserProfile(inputs: IUser): Promise<IUser> {
    return await this.service.repo.searchOne({ id: inputs.id });
  }

  async getAllUsers(inputs: IUser): Promise<Pagination<IUser>> {
    return await this.service.repo.search(inputs);
  }

  async addPost(inputs: IUser): Promise<IUser> {
    return await this.service.repo.create(inputs);
  }

  async deleteUser(inputs: IUser): Promise<boolean> {
    return await this.service.repo.deleteWhere({ id: inputs.id });
  }
}
