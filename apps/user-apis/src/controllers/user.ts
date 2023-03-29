import { Request, Response, RestController } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { UserTransformer } from '@libs/common';
import { Controller, Get, HttpCode, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../../../../libs/users/src/guards/jwtGuard';
import { AddUserDto, GetUsersDto, UpdateUserProfileDto } from '../dtos';
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
  @Post()
  @Validate(AddUserDto)
  @HttpCode(201)
  async addPost(
    @Dto() dto: AddUserDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.addPost(dto);
    return res.success(
      await this.transform(data, new UserTransformer(), {
        req,
      })
    );
  }

  @Post()
  @Validate(AddUserDto)
  @HttpCode(201)
  async addTodo(
    @Dto() dto: AddUserDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.userService.addPost(dto);
    return res.success(
      await this.transform(data, new UserTransformer(), {
        req,
      })
    );
  }
}
