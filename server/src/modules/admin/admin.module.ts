import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RepoModule } from '../repo/repo.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@common/guards/roles.guard';
import { XpSystemsModule } from '../xp-systems/xp-systems.module';

@Module({
    imports: [RepoModule, XpSystemsModule],
    controllers: [AdminController],
    providers: [{ provide: APP_GUARD, useClass: RolesGuard }, AdminService],
    exports: [AdminService]
})
export class AdminModule {}
