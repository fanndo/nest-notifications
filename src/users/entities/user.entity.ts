import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
})
export class User extends Document {
    @Prop({ index:true })
    readonly accountNumber:string;
    @Prop()
    readonly isEnabled: boolean;
    @Prop()
    readonly email:string;
    @Prop()
    readonly name:string;
}

export const UserSchema  = SchemaFactory.createForClass(User);