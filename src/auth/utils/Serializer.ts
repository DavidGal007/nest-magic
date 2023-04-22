import { PassportSerializer } from "@nestjs/passport";
import {Inject, Injectable} from '@nestjs/common'
import { AuthService } from "../auth.service";
import { User } from "src/typeorm/entities/User";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super();
    }

    serializeUser(user: User, done: Function) {
        console.log("Serializer User");
        done(null, user)
        
    }

    async deserializeUser(payload: any, done: Function) {
       const user = await this.authService.findUser(payload.id);
       console.log('Deserializer User');
       console.log(user);
       
       return user ? done(null, user) : done(null, null)
    }
}