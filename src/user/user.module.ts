import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, JwtModule, JwtService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [
    UserService,
    AuthService,
    JwtModule
  ]
})
export class UserModule {}
