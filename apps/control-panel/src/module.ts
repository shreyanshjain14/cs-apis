import { BoatModule } from '@libs/boat';
import { ObjectionModule } from '@libs/database';
import { UserLibModule } from '@libs/users';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AdminSeeder } from './commands/createAdmin';
import { ControlPanelController } from './controller';

@Module({
  imports: [BoatModule, UserLibModule],
  controllers: [ControlPanelController],
  providers: [AdminSeeder],
})
export class AppModule {}
