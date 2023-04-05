import { AppConfig } from '@libs/boat';
import { Exists, IsEqualToProp, IsUnique, IsValidEmail, IsValueFromConfig } from '@libs/boat/validator';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class RequestOtpDto {
  @IsNotEmpty()
  @IsValueFromConfig({ key: "settings.verificationType" })
  verificationType: string;

  @ValidateIf(
    (obj) => obj && obj.verificationType == AppConfig.get("settings.verificationType.mobile")
  )
  @IsMobilePhone("en-IN", {}, { message: "Invalid phone number" })
  @IsNotEmpty()
  contactMobileNumber: string;

  @ValidateIf(
    (obj) => obj && obj.verificationType == AppConfig.get("settings.verificationType.email")
  )
  @IsValidEmail()
  @IsNotEmpty()
  email?: string;

  @IsIn(["register", "login"])
  purpose?: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsMobilePhone("en-IN", {}, { message: "Invalid phone number" })
  @IsUnique({ table: "users", column: "contactMobileNumber" })
  contactMobileNumber: string;

  @IsNotEmpty()
  @IsValidEmail()
  @IsUnique({ table: "users", column: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(8, 20)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEqualToProp("password")
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsIn([true], { message: "TnC agreed must be true" })
  tncAgreed;
}
export class LoginDto {
  @IsNotEmpty()
  @Exists({ table: "users", column: "email" })
  @ValidateIf((obj) => obj && obj.loginType == AppConfig.get("settings.loginType.email"))
  email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((obj) => obj && obj.loginType == AppConfig.get("settings.loginType.email"))
  password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Exists({ table: "users", column: "email" })
  email: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @Length(8, 20)
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsEqualToProp("newPassword")
  @IsString()
  confirmPassword: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  otp: string; //to be sent on mail

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Exists({ table: "users", column: "email" })
  email: string;

  @Length(8, 20)
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsEqualToProp("newPassword")
  @IsString()
  confirmPassword: string;
}

export class AdminLoginDto {
  @IsNotEmpty()
  @Exists({ table: "users", column: "email" })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @IsOptional()
  @IsNotEmpty()
  @IsValidEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: "OTP is required" })
  mobileOTP?: string;

  @IsOptional()
  @IsNotEmpty({ message: "OTP is required" })
  emailOTP?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsMobilePhone("en-IN", {}, { message: "Invalid phone number" })
  contactMobileNumber?: string;
}

export class UpdateUserProfileDto {
  @IsOptional()
  @Exists({ table: "users", column: "id" })
  id: number;

  @IsOptional()
  @IsString()
  profilePictureSlug?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  cityId: number;
}

export class GetUsersDto {
  @IsOptional()
  status: number;
}

export class AddPostDto {
  @IsString()
  description?: string;
}

export class AddTodoDto {
  @IsString()
  todoDescription?: string;
}

export class UpdateTodoDto {
  @IsString()
  description?: string;

  @Exists({ table: "todos", column: "id" })
  id?: number;
}

export class UpdatePostDto {
  @IsString()
  todoDescription?: string;

  @Exists({ table: "posts", column: "id" })
  id?: number;
}
