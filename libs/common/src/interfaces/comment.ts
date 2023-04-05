import { IUser } from '@libs/common/interfaces';

export interface IComment {
  id?: number;
  ulid?: number;
  description?: string;
  status?: number;
  createdBy?: number;
  createdByUser?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  page?: number;
  perPage?: number;
  paginate?: boolean;
  q?: string;
}

export interface IPostComment {
  id?: number;
  ulid?: number;
  postId?: string;
  commentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
