import { IsString, Min, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}