import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './typeorm/entities/User'
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/Profile'
import { Post } from './typeorm/entities/Post'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '',
			database: 'nest_demo',
			synchronize: true,
			entities: [User, Profile, Post]
		}),
		UsersModule,
		
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
