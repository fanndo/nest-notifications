import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
// import { AppView } from './app-view.entity';
import { NotificationData } from './notification-data.entity';

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
export class Notification extends Document {
    //indexacion
    // @Prop({ index:true })
    @Prop()
    isDirected: boolean;
    @Prop()
    evicted: boolean;
    @Prop()
    receivedDate: string;
    @Prop()
    type: string;
    @Prop()
    source: string;
    @Prop()
    id: string;
    // @Prop({ type: Types.ObjectId, ref: AppView.name })
    // apsViewList: AppView | Types.ObjectId;
    // @Prop({ type: Types.ObjectId, ref: NotificationData.name })
    // data:NotificationData | Types.ObjectId;
    @Prop(
            [{
            apId: String,
            isDismissed: Boolean,
            viewDate: {
                type: String,
                required: false,
            },
            dismissedDate: {
                type: String,
                required: false,
            },
            }]
    )
    apsViewList:Types.Array<Record<string, any>>;

    @Prop(
        raw({
            title: String,
            body: String,
            type: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
        })
    )
    data:Record<string, any>;
    
}


export const NotificationSchema  = SchemaFactory.createForClass(Notification);
//indexacion compuesta
// NotificationSchema.index({ name:1, title:-1 })