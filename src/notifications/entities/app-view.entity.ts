import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class AppView{
    @IsString()
    @IsNotEmpty()
    apId: string;

    @IsNotEmpty()
    @IsBoolean()
    isDismissed: boolean;
    @IsOptional()
    viewDate: string;
    @IsOptional()
    dismissedDate: string;
} 

