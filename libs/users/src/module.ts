import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserLibConstants } from './constant';
import { PostRepository, TodoRepository } from './repositories';
import { UserRepository } from './repositories/users/database';
import { UserLibService } from './services/users';
import { JwtStrategy } from './stratagies/jwtStrategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get("auth"),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    UserLibService,
    {
      provide: UserLibConstants.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: UserLibConstants.POST_REPOSITORY,
      useClass: PostRepository,
    },
    {
      provide: UserLibConstants.TODO_REPOSITORY,
      useClass: TodoRepository,
    },
  ],
  exports: [UserLibService],
})
export class UserLibModule {}
