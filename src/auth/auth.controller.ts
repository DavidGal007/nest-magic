import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './strategies/Guards';
import { CurrentUser } from './decorators/user.decorator';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dto/CreateUserDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request: any) {
    const {id} = request.user;
    return await this.userService.byId(id);
  }

  // @Get('/me')
  // @UseGuards(SessionAuthGuard, JWTAuthGuard)
  // me(@CurrentUser() user: User): User {
  //   return user;
  // }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return {msg: 'Google Authenticated!'}
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Res() response: Response) {
    if(response.status(200) ) {
      response.redirect('http://localhost:3000/')
    } else {
      return {msg: 'error'}
    }
    
  }

  @Get()
  user(@Req() request: Request)  {
    console.log(request.user);
    if(request.user) {
      return {message: "Authenticated!"}
    } else {
      return {message: 'Not Authenticated!'}
    }
    
  }

  @Get('status')
  //@UseGuards(CheckLoggedInUserGuard)
  status(@CurrentUser() user: User) {
    return user
  }
    
}
