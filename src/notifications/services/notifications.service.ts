import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose'

import { FilterQuery, Model, Types } from 'mongoose'

import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { Notification } from '../entities/notification.entity';
import { FilterNotificationDto } from '../dto/filter-notification.dto';

@Injectable()
export class NotificationsService {

  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    private eventEmitter: EventEmitter2
  ){}

  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = new this.notificationModel(createNotificationDto);

    const notification = await newNotification.save();

    this.eventEmitter.emit('notification.created', newNotification);
    
    return notification;
  }

  async findAll(params?:FilterNotificationDto) {
    if(params){
      const filter: FilterQuery<Notification>={}
      const { limit, offset } = params;
      // if(min && max ){
      //   // const docs = await User.find({ email: { $regex: 'gmail' } });
      // if (minPrice && maxPrice) {
      //   filters.price = { $gte: minPrice, $lte: maxPrice };
      // }
      //   filter.name = { $regex: 'gmail' }
      // }
      return await this.notificationModel.find(filter).select('-apsViewList').skip(offset).limit(limit).exec(); 
    }
    return await this.notificationModel.find().select('-apsViewList').exec();
  }

  async findByUserId(id:string){
    const queryEvicted = { evicted: false };
    const queryAppViewListExist = {
      apsViewList: {
        $elemMatch: {
          apId:id,
          isDismissed: false,
        },
      },
    };
    const queryAppViewNotExistOrDirectEmpty = {
      apsViewList: {
        $exists: true,
        $type: 'array',
        $eq: [],
      },
      isDirected: false,
    };
    const queryAppViewNotExistOrDirectNotMatch = {
      apsViewList: {
        $not: { $elemMatch: { apId:id } },
      },
      isDirected: false,
    };
    const queryAppViewNotExistOrDirect = {
      $or: [queryAppViewNotExistOrDirectEmpty, queryAppViewNotExistOrDirectNotMatch],
    };
    const queryMainCondition = {
      $or: [queryAppViewListExist, queryAppViewNotExistOrDirect],
    };
    const query = { $and: [queryEvicted, queryMainCondition] };

    return this.notificationModel.find(query).select('-apsViewList').lean().exec()

  }

  async findOne(id: string) {
    //TODO: se agrega new Types cuando se ingresa valores como 111, para validar
    // se debe agregar un pipeline personalizado
    const notification = await this.notificationModel.findById(new Types.ObjectId(id)).select('-apsViewList').exec();
    if (!notification){
      throw new NotFoundException(`Notification not found`)
    }
    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationModel
      .findByIdAndUpdate(new Types.ObjectId(id),{ $set:updateNotificationDto }, { new: true })
      .exec();
    if (!notification){
      throw new NotFoundException(`Notification not found`)
    }
    return notification;
  }

  async remove(id: string ) {
    return await this.notificationModel.findByIdAndDelete(new Types.ObjectId(id));
  }
}
