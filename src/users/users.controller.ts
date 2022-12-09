import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateUserPostParams, CreateUserProfileParams } from 'src/utils/types';
import { CreateUserDto } from './dto/CreateUser.dto';
import { CreatePostDto } from './dto/CreateUserPost.dto';
import { UserProfileDto } from './dto/CreateUserProfile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
   return this.usersService.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDto) {
      await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }

  //one - to - one
  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: UserProfileDto
  ) {
    return this.usersService.createUserProfile(id, createUserProfileDto);
  }

  // one - to - many
  @Post(':id/posts')
  createUserPost(@Param('id', ParseIntPipe) id: number,
  @Body() createUserPostDto: CreatePostDto,
  ) {
    return this.usersService.createUserPost(id, createUserPostDto)
  }

}
