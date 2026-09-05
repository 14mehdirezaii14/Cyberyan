import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '@workspace/shared';

@Schema({ timestamps: true })
export class User extends Document implements Omit<IUser, '_id'> {
  @Prop({ index: true })
  first_name: string;

  @Prop({ index: true })
  full_name: string;

  @Prop({ index: true })
  last_name: string;

  @Prop({ index: true })
  industry: string;

  @Prop()
  job_title: string;

  @Prop()
  linkedin_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({
  first_name: 'text',
  last_name: 'text',
  industry: 'text',
  job_title: 'text',
});
