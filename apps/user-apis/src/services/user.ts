import { IPost, IUser } from '@libs/common';
import { ITodo } from '@libs/common/interfaces';
import { Pagination } from '@libs/database';
import { UserLibService } from '@libs/users';
import { Injectable } from '@nestjs/common';

import { UpdateUserProfileDto } from '../dtos';
import { UpdatePostDto, UpdateTodoDto } from '../dtos/user';

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

  async addPost(inputs: IPost): Promise<IPost> {
    return await this.service.postRepo.create(inputs);
  }

  async deleteUser(inputs: IUser): Promise<boolean> {
    return await this.service.todoRepo.deleteWhere({ id: inputs.id });
  }

  async addTodo(inputs: ITodo): Promise<ITodo> {
    return await this.service.todoRepo.create(inputs);
  }

  async updatePost(inputs: UpdatePostDto): Promise<IPost> {
    return (await this.service.repo.updateAndReturn({ id: inputs.id }, inputs)) as IPost;
  }
  async updateTodo(inputs: UpdateTodoDto): Promise<ITodo> {
    return (await this.service.repo.updateAndReturn({ id: inputs.id }, inputs)) as ITodo;
  }
}
