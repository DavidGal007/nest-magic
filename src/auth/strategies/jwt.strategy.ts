import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			algorithms:["RS256"],
            secretOrKey: 'secret_key',
		})
	}

    async validate({ id }: Pick<UserEntity, 'id'>) {
        return this.userRepository.findBy({id})
    }
}
