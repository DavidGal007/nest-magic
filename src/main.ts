import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  })
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secretdadafawgefafa',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
        signed: true
      }
    }),
  );
  app.use(function(req, res, next) {
    res.locals.session = req.session
    next()
  })
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000, () => {
    console.log("Server is started!");
    
  });
}
bootstrap();
