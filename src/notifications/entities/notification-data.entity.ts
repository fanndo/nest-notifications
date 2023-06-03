import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class NotificationData {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    body: string;
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    type:string ;
    @IsOptional()
    @IsUrl()
    url: string ;
}
