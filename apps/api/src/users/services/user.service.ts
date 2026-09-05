import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { IPaginatedResponse, IUser } from '@workspace/shared';
import { User } from '../schema/user.schema';
import { UserQueryDto } from '../dtos/user-query.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async searchUsers(
    queryDto: UserQueryDto,
  ): Promise<IPaginatedResponse<IUser>> {
    const { page = 1, limit = 10 } = queryDto;

    const filterQuery = this.buildSearchFilter(queryDto);
    const skip = this.calculateSkip(page, limit);

    const [data, total] = await Promise.all([
      this.userModel
        .find(filterQuery)
        .skip(skip)
        .limit(limit)
        .lean<IUser[]>()
        .exec(),
      this.userModel.countDocuments(filterQuery).exec(),
    ]);

    return { data, total, page, limit };
  }

  private buildSearchFilter(queryDto: UserQueryDto): QueryFilter<User> {
    const { search, industry } = queryDto;
    const query: QueryFilter<User> = {};

    if (search) {
      query.$or = [
        { first_name: { $regex: search, $options: 'i' } },
        { last_name: { $regex: search, $options: 'i' } },
        { job_title: { $regex: search, $options: 'i' } },
      ];
    }

    if (industry) {
      query.industry = industry;
    }

    return query;
  }

  private calculateSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }
}
