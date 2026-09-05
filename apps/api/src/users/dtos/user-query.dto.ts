import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IUserQuery } from '@workspace/shared';

export class UserQueryDto implements IUserQuery {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'جستجو در نام و عنوان شغلی' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'فیلتر صنعت' })
  @IsOptional()
  @IsString()
  industry?: string;
}
