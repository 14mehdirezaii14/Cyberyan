import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/user.service';
import { UserQueryDto } from '../dtos/user-query.dto';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getUsers(@Query() query: UserQueryDto) {
    return this.usersService.searchUsers(query);
  }
}
