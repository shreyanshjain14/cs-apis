import { IUser } from '@libs/common/interfaces';

export interface IPost {
  id?: number;
  ulid?: number;
  description?: string;
  status?: number;
  createdBy?: number;
  createdByUser?: IUser;
  q?: string;
  page?: number;
  perPage?: number;
  paginate?: boolean;
}
