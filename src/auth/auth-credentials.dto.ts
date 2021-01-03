import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthCredentialsDto {


  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;


  @IsEmail()
  @IsString()
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  { message: 'please put in a valid email address'})
  mail: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  password: string;
}