import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs'
import { User } from 'src/typeorm/entities/User';
import { UserDetails } from 'src/utils/types';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
      const user = await this.validateUser(userDto)
      return {
        user: this.returnUserFields(user),
        access_token: await this.generateToken(user.id)
      }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email},
    });
    return user;
  }

  async registration(userDto: CreateUserDto) {
      const candidate = await this.getUserByEmail(userDto.email)
      if(candidate) {
          throw new HttpException('Email has been exist!', HttpStatus.BAD_REQUEST)
      }
      const hashPassword = await hash(userDto.password, 5);
      const newUser = await this.userRepository.create({
          ...userDto,
          password: hashPassword
      })
      //const payload: any = { id: user.id };
       const user = await this.userRepository.save(newUser)
      return {
        user: this.returnUserFields(user),
        access_token: await this.generateToken(user.id)
      }
  }

  async generateToken(userId: number) {
    const payload = { id: userId };
    
      return this.jwtService.sign(payload)
      
  }

  returnUserFields(user: User) {
    return {
        id: user.id,
        email: user.email
    }
  }

  private async validateUser(userDto: CreateUserDto) {
      const user = await this.getUserByEmail(userDto.email)
      const passwordEquals = await compare(userDto.password, user.password);
      if(user && passwordEquals) {
          return user;
      }
      throw new UnauthorizedException({
          message: "Wrong password or Email!"
      })
  }

    async validateUserGoogle(details: UserDetails) {
        console.log(details);
        console.log('AuthService');
        
        const user = await this.userRepository.findOneBy({
            email: details.email
        })
        console.log(user);
        
        if(user) return user;
         console.log('User not found');
         
        const newUser = this.userRepository.create(details)
        return this.userRepository.save(newUser)
    }

    async findUser(id: number) {
        const user = await this.userRepository.findOneBy({id});
        return user
    }

}

