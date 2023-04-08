import { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';

import { IAuthData, IAuthRole, IAuthUser } from '../../types/authorization.types';

export type UserEventsDocument = UserEvents & Document;

class AuthData implements IAuthData {
  roles: IAuthRole[];
  user: IAuthUser;
}

class EventsData {
  oldValue: IAuthData;
  newValue: IAuthData;
}

@Schema({ timestamps: true, collection: 'user-events' })
export class UserEvents {
  @ApiProperty({
    required: false,
    type    : String,
    default : new ObjectId(),
  })
  @IsOptional()
  _id: ObjectId;

  @ApiProperty({
    enum: [ 'BE' ]
  })
  @Prop()
  channel: string;

  @ApiProperty({
    description: 'User action',
    example: 'login'
 })
  @Prop()
  topic: string;

  @ApiProperty({
    enum: [ 'MDO' ]
 })
  @Prop()
  source: string;

  @ApiProperty({
    description: 'User who created event',
    type: AuthData
     })
  @Prop()
  user: AuthData;

  @ApiProperty({
    description: 'Contains old and new changed values',
    type: EventsData
   })
  @Prop()
  data: EventsData;

  @ApiProperty({
    type    : String,
    default : new ObjectId(),
    required: false,
  })
  @IsOptional()
  @Transform((value: any) => {
    if (value && typeof (value) === 'string')
      return new ObjectId(value);

    return value;
  })
  @Prop()
  collectionId: ObjectId;

  @ApiProperty({
    type   : Date,
    default: new Date(),
  })
  @Prop()
  createdAt: Date;
}

export const UserEventsSchema = SchemaFactory.createForClass(UserEvents);
UserEventsSchema.plugin(mongoosePaginate);
