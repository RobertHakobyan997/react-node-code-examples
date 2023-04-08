import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MssoUser } from 'ngpd-merceros-authentication-be-components';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User implements MssoUser {
  @Prop({ unique: true })
  globalprofileid: number;

  @Prop({ unique: true })
  employeeId: string;

  @Prop({
    unique: true,
    set   : v => v.toLowerCase(),
  })
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  country: string;

  @Prop()
  language: string;

  @Prop()
  status: string;

  [key: string]: any;

  identityProvider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function userIdGetter() {
  return this._id;
});

UserSchema.virtual('email')
  .get(function userEmailGetter() {
    return this.username;
  })
  .set(function userEmailSetter(email: string) {
    this.username = email;
  });
