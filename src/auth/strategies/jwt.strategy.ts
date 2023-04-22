import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Repository } from 'typeorm'
import { User } from 'src/typeorm/entities/User'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			algorithms:["RS256"],
            secretOrKey: 'daagagegErebvafsgawfafagwafawhht',
		})
	}

    async validate({ id }: Pick<User, 'id'>) {
        return this.userRepository.findBy({id})
    }
}
