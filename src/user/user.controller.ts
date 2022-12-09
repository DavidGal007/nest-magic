import {
	Controller,
	Get,
	Param,
	UsePipes,
	ValidationPipe,
	Put,
	HttpCode,
	Body,
	Patch,
  UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'
import { Auth } from 'src/auth/decorators/auth.decorators'


@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

  
	@Get('profile')
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Get('by-id/:id')
	@Auth()
	async getUser(@Param('id') id: string) {
		return this.userService.byId(+id)
	}

	@HttpCode(200)
	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(+id, dto)
	}

	@HttpCode(200)
	@Patch('subscribe/:channelId')
	async subscribeToChannel(
		@CurrentUser('id') id: number,
		@Param('channelId') channelId: string
	) {
		return this.userService.subscribe(id, +channelId)
	}

	@Get()
	async getUsers() {
		return this.userService.getAll()
	}
}
