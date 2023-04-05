import { Request, Response, RestController } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { PostTransformer, TodoTransformer, UserTransformer } from '@libs/common';
import { Controller, Get, HttpCode, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../../../../libs/users/src/guards/jwtGuard';
import { AddPostDto, AddTodoDto, GetUsersDto, UpdatePostDto, UpdateTodoDto, UpdateUserProfileDto } from '../dtos';
import { AuthApisService } from '../services';
import { UserApiService } from '../services/user';

@Controller("users")
@UseGuards(JwtGuard)
export class UserController extends RestController {
  constructor(
    private readonly authService: AuthApisService,
    private readonly userService: UserApiService
  ) {
    super();
  }

  @Get("health")
  async test(@Res() res: Response) {
    return res.success({ message: "auth apis service is working fine" });
  }

  @Get()
  @Validate(GetUsersDto)
  async getUsers(
    @Dto() dto: GetUsersDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.getAllUsers(dto);
    return res.withMeta(
      await this.paginate(data, new UserTransformer(), {
        req,
      })
    );
  }

  @Put(":id")
  @Validate(UpdateUserProfileDto)
  async updateUser(
    @Dto() dto: UpdateUserProfileDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.updateUserProfile(dto, req.user);
    return res.success(
      await this.transform(data, new UserTransformer(), {
        req,
      })
    );
  }

  @Put("posts/:id")
  @Validate(UpdatePostDto)
  async updatePost(
    @Dto() dto: UpdatePostDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.updatePost(dto);
    return res.success(
      await this.transform(data, new PostTransformer(), {
        req,
      })
    );
  }

  @Put("todos/:id")
  @Validate(UpdateTodoDto)
  async updateTodo(
    @Dto() dto: UpdateTodoDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.updateTodo(dto);
    return res.success(
      await this.transform(data, new TodoTransformer(), {
        req,
      })
    );
  }
  @Post("posts")
  @Validate(AddPostDto)
  @HttpCode(201)
  async addPost(
    @Dto() dto: AddPostDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.addPost(dto);
    return res.success(
      await this.transform(data, new PostTransformer(), {
        req,
      })
    );
  }

  @Post("todos")
  @Validate(AddTodoDto)
  @HttpCode(201)
  async addTodo(
    @Dto() dto: AddTodoDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.addTodo(dto);
    return res.success(
      await this.transform(data, new TodoTransformer(), {
        req,
      })
    );
  }
}
