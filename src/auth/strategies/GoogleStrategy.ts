import { PassportStrategy } from "@nestjs/passport";
import {Profile, Strategy} from 'passport-google-oauth20'
import {Inject} from '@nestjs/common'
import { AuthService } from "../auth.service";
export class GoogleStrategy extends PassportStrategy(Strategy) {
   constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService
   ) {
    super({
        clientID: '749826846280-n27q1p6108uov779r369orejstd4vusk.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:5000/api/auth/google/redirect',
        scope: ['profile', 'email'],
        
    })
   }

   async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken)
    console.log(refreshToken);
    console.log(profile);
    const user = await this.authService.validateUserGoogle({
        email: profile.emails[0].value,
        displayName: profile.displayName,
        authStrategy: accessToken,
        avatarPath: profile.photos[0].value,
        isVerified: Boolean(profile.emails[0].verified),
        username: profile.name.givenName,
        password: ''
    })
    console.log('Validate');
    console.log(user);
    return user || null
    
    
   }
}