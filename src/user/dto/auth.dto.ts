import {IsEmail, IsString} from 'class-validator'

export class AuthRegisterDto {
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    username?: string
    
}

export class AuthLoginDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
    
}