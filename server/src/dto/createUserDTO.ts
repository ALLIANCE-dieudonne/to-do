import { 
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    Matches, 
    MaxLength, 
    MinLength 
  } from "class-validator";
  
  export class CreateUserDTO {
      @IsString()
      @MinLength(2)
      @MaxLength(50)
      @IsNotEmpty()
      name: string;
  
      @IsEmail()
      @IsNotEmpty()
      email: string;
  
      @IsNotEmpty()
      @IsString()
      @MinLength(6) // Changed from 4 to match your regex minimum
      @MaxLength(16)
      @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
          message: 'Password must have at least 6 characters, one symbol, one number, and one uppercase letter.',
      })
      password: string; // Removed readonly as decorators typically work better without it
  }