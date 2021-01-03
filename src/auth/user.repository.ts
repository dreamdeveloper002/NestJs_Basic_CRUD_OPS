import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, mail } = authCredentialsDto;

      const user = new User();
      user.username = username;
      user.password = password;
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

}