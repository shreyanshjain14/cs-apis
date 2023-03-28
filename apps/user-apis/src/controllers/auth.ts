import { Request, Response, RestController } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { UserTransformer } from '@libs/common';
import { Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtGuard } from '../../../../libs/users/src/guards/jwtGuard';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from '../dtos';
import { AuthApisService } from '../services';
import { UserApiService } from '../services/user';

@Controller("auth")
export class UserAuthController extends RestController {
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

  @Validate(LoginDto)
  @Post("/login")
  async login(
    @Dto() inputs: LoginDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const model = await this.authService.loginUser(inputs);
    return res.success(
      await this.transform(model, new UserTransformer(), {
        req,
      })
    );
  }

  @Validate(RegisterDto)
  @Post("/register")
  async register(
    @Dto() inputs: RegisterDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const model = await this.authService.register(inputs);
    return res.success(
      await this.transform(model, new UserTransformer(), {
        req,
      })
    );
  }

  @Validate(ForgotPasswordDto)
  @Post("forgot-password")
  async forgotPassword(@Dto() dto: ForgotPasswordDto, @Res() res: Response): Promise<Response> {
    const response = await this.authService.forgotPassword(dto);
    return res.success(response);
  }

  @Validate(ResetPasswordDto)
  @Put("reset-password")
  async resetPassword(@Dto() dto: ResetPasswordDto, @Res() res: Response): Promise<Response> {
    const response = await this.authService.resetPassword(dto);
    return res.success(response);
  }

  @UseGuards(JwtGuard)
  @Get("/my-profile")
  async getUserProfile(@Req() req: Request, @Res() res: Response) {
    const data = await this.userService.getUserProfile({ id: req.user.id });
    return res.success(
      await this.transform(data, new UserTransformer(), {
        req,
      })
    );
  }
}
