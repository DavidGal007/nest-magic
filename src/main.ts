import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  //app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    session({
      secret: 'my-secretdadafawgefafa%#@!@!(*&^%**-)(&daf',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
        signed: true,
        httpOnly: true,
        secure: true
      }
    }),
  );
  app.use(function(req, res, next) {
    res.locals.session = req.session
    next()
  })
  
  await app.listen(8000);
}
bootstrap();
