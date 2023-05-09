import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './typeorm/entities/User'
import { Profile } from './typeorm/entities/Profile'
import { Post } from './typeorm/entities/Post'
import { CommentEntity } from './comment/comment.entity'
import { VideoModule } from './video/video.module'
import { Video } from './typeorm/entities/Video'
import { CommentModule } from './comment/comment.module'
import { Subscription } from './typeorm/entities/Subscription'
import { MediaModule } from './media/media.module'
import { AuthModule } from './auth/auth.module'
import { PassportModule } from '@nestjs/passport'
import {ServeStaticModule} from '@nestjs/serve-static'
import {path} from 'app-root-path'
import { BankAccount } from './typeorm/entities/BankAccount'
import { BankCard } from './typeorm/entities/BankCard'
import { Product } from './typeorm/entities/Product'
import { UserModule } from './user/user.module';
import { ShortVideo } from './typeorm/entities/ShortVideo'
import { ShortsModule } from './shorts/shorts.module';
import { Likes } from './typeorm/entities/Likes'
import { Unlikes } from './typeorm/entities/Unlikes'
import { Base } from './typeorm/Base'

@Module({
	imports: [
		
		ConfigModule.forRoot({
			envFilePath: '.development.env'
		}),
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: '45.152.46.1',
			port: 3306,
			username: 'u585021182_Davidgal',
			password: 'Admin123%',
			database: 'u585021182_nest_youtube',
			synchronize: true, 
			entities: [Base, User, Profile, Post, Video, CommentEntity, Subscription, BankAccount, BankCard, Product, ShortVideo, Likes, Unlikes]
		}),
		PassportModule.register({session: true}),
		VideoModule,
		CommentModule,
		MediaModule,
		AuthModule,
		UserModule,
		ShortsModule,
		
	],
	controllers: [AppController],
	providers: [AppService ]
})
export class AppModule {}
