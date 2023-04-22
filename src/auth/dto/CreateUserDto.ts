import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
 
  @IsString({message: "Should be in String"})
  @IsEmail({}, {message: "Wrong Email !"})
  public readonly email: string;

  @IsString({message: "Should be in String"})
  public readonly username?: string;

  @Length(4, 16, {
    message: "Min 4 characters"
  })
  public readonly password: string;

}