import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, mail } = authCredentialsDto;
      
      
      const user = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt()
      user.password = await this.hashPassword(password, user.salt);
      user.mail = mail;

      try {
        await user.save(); 
      } catch (error) {
        
        if(error.code === '23505' ) {
            throw new ConflictException('Duplicate Username or Mail, Please try again')
        } else {
          throw new InternalServerErrorException()
        }
        
      }  

  }

  async validateUserPassword(authCredentialsDto : AuthCredentialsDto) : Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
  
    if( user && await user.validatePassword(password)) {
       return user.username
    } else {
      return null;
    }

  }

  private async hashPassword(password: string, salt: string): Promise<string>{

    return bcrypt.hash(password, salt);
    
  }

}