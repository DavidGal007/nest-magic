// import { NestMiddleware, Injectable, HttpStatus } from "@nestjs/common";
// import passport from "passport";
// import { User } from "src/typeorm/entities/User";

// @Injectable()
// export class AuthenticationMiddleware implements NestMiddleware {
//     constructor(private userService: User) { }
//     async resolve(strategy: string): Promise<any> {
//         return async (req, res, next) => {
//             return passport.authenticate(strategy, async (...args: any[]) => {
//                 const [, payload, err] = args;
//                 if (err) {
//                     return res.status(HttpStatus.BAD_REQUEST).send('Unable to authenticate the user.');
//                 }
//                 const user = await this.userService.({
//                     where:
//                         { email: payload.email }
//                 });
//                 req.user = user;
//                 return next();
//             })(req, res, next);
//         };
//     }
// }