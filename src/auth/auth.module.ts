import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config'
import { getJwtConfig } from 'src/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';
import { User } from 'src/typeorm/entities/User';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, SessionSerializer, {
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  }],
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'secretdemo',
      signOptions: {
        expiresIn: '7d',
        algorithm: 'HS384'
      },
      verifyOptions: {
        algorithms: ['HS384']
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  exports: [
    
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
