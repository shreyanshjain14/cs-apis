import { IUser } from '@libs/common/interfaces';

export interface ITodo {
  id?: number;
  ulid?: number;
  todoDescription?: string;
  status?: number;
  createdBy?: number;
  createdByUser?: IUser;
  page?: number;
  perPage?: number;
  paginate?: boolean;
  q?: string;
}
