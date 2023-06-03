import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../entities/user.entity";
import { Model } from "mongoose";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
      ){}
    
      async create(createUserDto: any) {
        const newUser = new this.userModel(createUserDto);
        const user = await newUser.save();

        return user;
      }


}


