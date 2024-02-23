import { user_role } from "@prisma/client";
import { Type } from "class-transformer";
import { 
    IsEmail, 
    IsNumber, 
    IsOptional, 
    IsPhoneNumber, 
    IsString, 
    IsStrongPassword, 
    MaxLength, 
    MinLength,
    IsEnum,
    IsObject,
    ValidateNested,
    IsDecimal
} from "class-validator";

class LocationDTO {
    @IsNumber()
    // @IsDecimal()
    lat: number;
  
    @IsNumber()
    lang: number;
}

export class LoginDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;
}

export class RegisterDTO extends LoginDTO {
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    username: string;

    @IsString()
    @IsPhoneNumber("EG")
    phone_number: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsString()
    @IsEnum(user_role)
    @IsOptional()
    role: user_role;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDTO)
    location: LocationDTO;
}