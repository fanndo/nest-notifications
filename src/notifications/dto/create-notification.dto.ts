import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";
import { AppView } from "../entities/app-view.entity";
import { NotificationData } from "../entities/notification-data.entity";

export class CreateNotificationDto {
    @IsBoolean()
    @ApiProperty()
    readonly isDirected:boolean;
    @IsBoolean()
    @ApiProperty()
    readonly evicted:boolean;
    @IsString()
    @IsOptional()
    readonly receivedDate:string;
    @IsString()
    readonly type:string;
    @IsUrl()
    @IsOptional()
    readonly source:string;
    readonly id:string;
    // @IsNotEmpty()
    // @IsMongoId()
    // @ApiProperty()
    // readonly apsViewList:string;
    // @IsNotEmpty()
    // @IsMongoId()
    // @ApiProperty()
    // readonly data:string;
    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty()
    readonly apsViewList: AppView;

    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty()
    readonly data: NotificationData;



    

}
